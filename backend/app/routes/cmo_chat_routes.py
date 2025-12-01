"""
Chat routes for ad-hoc marketing questions.
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from openai import OpenAI

from app.db.database import get_db
from app.db.models import User, CMOChatMessage
from app.config import settings
from app.rag.vectorstore import search_marketing_docs

router = APIRouter(prefix="/api/cmo/chat", tags=["chat"])

# Initialize OpenAI client
client = OpenAI(api_key=settings.OPENAI_API_KEY)

# Chat system prompt
CHAT_SYSTEM_PROMPT = """You are "AI-CMO", an expert marketing consultant for SMEs in Southeast Asia.

You help business owners with:
- Marketing strategy questions
- Campaign optimization advice
- Channel selection guidance
- Budget allocation recommendations
- Performance measurement tips
- Digital marketing best practices

Be practical, actionable, and consider SME resource constraints. Provide specific, measurable advice."""


class ChatRequest(BaseModel):
    """Chat request schema."""
    question: str
    user_id: Optional[int] = None


class ChatResponse(BaseModel):
    """Chat response schema."""
    answer: str
    sources: Optional[list[str]] = None


class ChatMessageResponse(BaseModel):
    """Chat message response schema."""
    id: int
    role: str
    content: str
    sources: Optional[list[str]] = None
    created_at: str


@router.post("")
async def chat_with_cmo(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    """
    Chat with AI-CMO for ad-hoc marketing questions.
    
    Args:
        request: Chat request with question
        db: Database session
    
    Returns:
        AI-CMO response
    """
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    # Optionally retrieve relevant documents via RAG
    rag_context = ""
    sources = []
    
    if settings.RAG_ENABLED:
        docs = search_marketing_docs(db, request.question, top_k=settings.RAG_TOP_K)
        if docs:
            rag_context = "\n\nRelevant Marketing Knowledge:\n"
            for doc in docs:
                rag_context += f"- {doc.title}: {doc.content[:300]}...\n"
                sources.append(doc.title)
    
    # Build user prompt
    user_prompt = f"""User Question: {request.question}

{rag_context}

Please provide a helpful, actionable answer to the user's marketing question."""
    
    try:
        # Call OpenAI API
        response = client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[
                {"role": "system", "content": CHAT_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7
        )
        
        answer = response.choices[0].message.content
        
        if not answer:
            raise HTTPException(
                status_code=500,
                detail="Empty response from AI model"
            )
        
        # Save messages to database
        try:
            # Save user message
            user_message = CMOChatMessage(
                user_id=request.user_id,
                role="user",
                content=request.question,
                sources=None
            )
            db.add(user_message)
            db.flush()
            
            # Save assistant response
            assistant_message = CMOChatMessage(
                user_id=request.user_id,
                role="assistant",
                content=answer,
                sources=sources if sources else None
            )
            db.add(assistant_message)
            db.commit()
        except Exception as db_error:
            db.rollback()
            print(f"Warning: Failed to save chat messages to database: {db_error}")
        
        return ChatResponse(
            answer=answer,
            sources=sources if sources else None
        )
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        error_detail = str(e)
        print(f"Chat error: {error_detail}")
        print(traceback.format_exc())
        db.rollback()  # Rollback any partial database changes
        raise HTTPException(
            status_code=500,
            detail=f"Error generating response: {error_detail}"
        )


@router.get("/messages")
async def get_chat_messages(
    user_id: Optional[int] = Query(None),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get chat message history.
    
    Args:
        user_id: Optional user ID filter
        limit: Maximum number of messages to return
        db: Database session
    
    Returns:
        List of chat messages
    """
    query = db.query(CMOChatMessage)
    
    if user_id:
        query = query.filter(CMOChatMessage.user_id == user_id)
    
    messages = query.order_by(CMOChatMessage.created_at.asc()).limit(limit).all()
    
    return [
        ChatMessageResponse(
            id=msg.id,
            role=msg.role,
            content=msg.content,
            sources=msg.sources,
            created_at=msg.created_at.isoformat()
        )
        for msg in messages
    ]

