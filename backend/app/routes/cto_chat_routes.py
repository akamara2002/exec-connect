"""
Chat routes for tech strategy questions.
"""
from typing import Optional, List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from pydantic import BaseModel

from app.db.database import get_db
from app.db.models import CTOChatMessage, User
from app.rag.vectorstore import search_tech_docs
from app.config import settings
from openai import OpenAI
from openai import APIError, APIConnectionError, APITimeoutError, RateLimitError
import httpx

router = APIRouter(prefix="/api/cto/chat", tags=["chat"])


def get_openai_client() -> Optional[OpenAI]:
    """Get OpenAI client instance (lazy initialization)."""
    if not settings.OPENAI_API_KEY:
        return None
    try:
        # Create custom httpx client to avoid proxies compatibility issue
        http_client = httpx.Client(
            timeout=httpx.Timeout(60.0),
            limits=httpx.Limits(max_keepalive_connections=5, max_connections=10)
        )
        return OpenAI(
            api_key=settings.OPENAI_API_KEY,
            http_client=http_client
        )
    except Exception as e:
        print(f"Error initializing OpenAI client: {e}")
        return None


def get_or_create_user(db: Session, email: str, name: str = "Anonymous") -> User:
    """Get existing user or create new one."""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, name=name)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


class ChatMessage(BaseModel):
    """Chat message model."""
    role: str  # user, assistant
    content: str


class ChatRequest(BaseModel):
    """Chat request model."""
    message: str
    conversation_history: Optional[List[ChatMessage]] = []


class ChatResponse(BaseModel):
    """Chat response model."""
    message: str
    role: str = "assistant"
    message_id: Optional[int] = None


class ChatHistoryResponse(BaseModel):
    """Chat history response model."""
    id: int
    role: str
    content: str
    created_at: datetime


CHAT_SYSTEM_PROMPT = """You are an AI-CTO assistant for SMEs in Southeast Asia. You provide expert guidance on:

- Technology strategy and architecture
- DevOps and cloud infrastructure
- Security and compliance
- Team structure and processes
- Product roadmap and technical debt
- Cost optimization and scalability

Be concise, practical, and consider the constraints of small-to-medium enterprises. Provide actionable advice."""


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    user_email: str = "user@example.com",  # TODO: Get from auth
    user_name: str = "User",
    db: Session = Depends(get_db)
):
    """
    Chat with AI-CTO about technology strategy.
    Messages are saved to the database.
    """
    client = get_openai_client()
    if not client:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="OpenAI API is not configured"
        )
    
    try:
        # Get or create user
        user = get_or_create_user(db, user_email, user_name)
        
        # Save user message to database
        user_msg = CTOChatMessage(
            user_id=user.id,
            role="user",
            content=request.message
        )
        db.add(user_msg)
        db.commit()
        db.refresh(user_msg)
        
        # Get recent chat history from database (last 10 messages)
        recent_messages = db.query(CTOChatMessage).filter(
            CTOChatMessage.user_id == user.id
        ).order_by(desc(CTOChatMessage.created_at)).limit(10).all()
        
        # Search RAG for relevant context
        rag_context = []
        if settings.RAG_ENABLED:
            try:
                rag_context = search_tech_docs(db, request.message, top_k=3)
            except Exception as e:
                print(f"RAG search error (non-critical): {e}")
        
        # Build context from RAG
        context = ""
        if rag_context:
            context = "\n\nRelevant Technical Documents:\n"
            for doc in rag_context:
                context += f"- {doc.get('title', '')}: {doc.get('content', '')[:300]}...\n"
        
        # Build messages for OpenAI
        messages = [
            {"role": "system", "content": CHAT_SYSTEM_PROMPT}
        ]
        
        # Add conversation history from database (reverse to get chronological order)
        for msg in reversed(recent_messages[-5:]):  # Last 5 messages
            # Skip empty messages
            if msg.content and msg.content.strip():
                messages.append({
                    "role": msg.role if msg.role in ["user", "assistant", "system"] else "user",
                    "content": msg.content.strip()
                })
        
        # Add current message with context
        user_message = request.message.strip()
        if not user_message:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Message cannot be empty"
            )
        
        if context:
            user_message += context
        
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        # Ensure we have at least a system and user message
        if len(messages) < 2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid message format"
            )
        
        # Get response from OpenAI
        try:
            # Validate messages format
            if not messages or len(messages) == 0:
                raise ValueError("Messages list is empty")
            
            # Log request details for debugging
            print(f"Making OpenAI API request with model: {settings.LLM_MODEL}")
            print(f"Number of messages: {len(messages)}")
            
            # response = client.chat.completions.create(
            #     model=settings.LLM_MODEL,
            #     messages=messages,
            #     temperature=0.7,
            #     max_completion_tokens=500
            # )
            response = client.chat.completions.create(
                model=settings.LLM_MODEL,
                messages=messages,
                temperature=0.7
            )
            assistant_message = response.choices[0].message.content
            if not assistant_message:
                raise ValueError("Empty response from OpenAI")
                
        except RateLimitError as e:
            error_msg = str(e)
            print(f"OpenAI rate limit error: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"OpenAI rate limit exceeded. Please try again later. Error: {error_msg}"
            )
        except APIError as e:
            error_msg = str(e)
            error_status = getattr(e, 'status_code', None)
            error_body = getattr(e, 'body', None)
            error_response = getattr(e, 'response', None)
            
            # Try to extract detailed error message
            detailed_error = error_msg
            if error_response:
                try:
                    if hasattr(error_response, 'json'):
                        error_json = error_response.json()
                        if 'error' in error_json:
                            error_info = error_json['error']
                            detailed_error = error_info.get('message', error_msg)
                            error_type = error_info.get('type', '')
                            error_param = error_info.get('param', '')
                            print(f"OpenAI error type: {error_type}, param: {error_param}")
                except:
                    pass
            
            print(f"OpenAI API error (status {error_status}): {detailed_error}")
            if error_body:
                print(f"Error body: {error_body}")
            
            # Check for model errors
            if error_status == 400:
                if "model" in detailed_error.lower() or "does not exist" in detailed_error.lower() or "not found" in detailed_error.lower() or "invalid model" in detailed_error.lower():
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Invalid or unavailable model '{settings.LLM_MODEL}'. Error: {detailed_error}. Please check your LLM_MODEL environment variable."
                    )
                else:
                    # Other 400 errors (bad request format, etc.)
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Invalid request to OpenAI API: {detailed_error}"
                    )
            elif error_status == 401:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=f"OpenAI API authentication failed. Please check your OPENAI_API_KEY. Error: {detailed_error}"
                )
            elif error_status == 429:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"OpenAI rate limit exceeded. Please try again later. Error: {detailed_error}"
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"OpenAI API error (status {error_status}): {detailed_error}"
                )
        except APIConnectionError as e:
            error_msg = str(e)
            print(f"OpenAI connection error: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Unable to connect to OpenAI API. Please check your internet connection. Error: {error_msg}"
            )
        except APITimeoutError as e:
            error_msg = str(e)
            print(f"OpenAI timeout error: {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail=f"OpenAI API request timed out. Please try again. Error: {error_msg}"
            )
        except Exception as e:
            error_msg = str(e)
            error_type = type(e).__name__
            print(f"Unexpected OpenAI error ({error_type}): {error_msg}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"OpenAI API error: {error_msg}"
            )
        
        # Save assistant response to database
        assistant_msg = CTOChatMessage(
            user_id=user.id,
            role="assistant",
            content=assistant_message
        )
        db.add(assistant_msg)
        db.commit()
        db.refresh(assistant_msg)
        
        return ChatResponse(
            message=assistant_message,
            role="assistant",
            message_id=assistant_msg.id
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error in chat: {str(e)}"
        )


@router.get("/history", response_model=List[ChatHistoryResponse])
async def get_chat_history(
    user_email: Optional[str] = None,  # TODO: Get from auth
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """
    Get chat history for a user.
    """
    if not user_email:
        user_email = "user@example.com"
    
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        return []
    
    messages = db.query(CTOChatMessage).filter(
        CTOChatMessage.user_id == user.id
    ).order_by(desc(CTOChatMessage.created_at)).limit(limit).all()
    
    # Reverse to get chronological order
    messages.reverse()
    
    return [
        ChatHistoryResponse(
            id=msg.id,
            role=msg.role,
            content=msg.content,
            created_at=msg.created_at
        )
        for msg in messages
    ]

