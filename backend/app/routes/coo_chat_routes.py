import logging
import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.agents.coo_agent import run_chat_agent
from app.db.database import get_db
from app.db.models import COOChatMessage, COOAnalysis
from app.schemas.coo.chat import ChatMessageIn, ChatMessageOut, ChatResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/coo/chat", tags=["chat"])


def _serialize_message(model: COOChatMessage) -> ChatMessageOut:
    return ChatMessageOut(
        id=model.id,
        role=model.role,
        content=model.content,
        created_at=model.created_at,
        analysis_id=model.analysis_id,
    )


@router.post("/message", response_model=ChatResponse)
async def send_message(
    chat_input: ChatMessageIn,
    db: Session = Depends(get_db),
) -> ChatResponse:
    """Send a message to the AI-COO chat agent."""
    logger.info("chat_message_request", extra={"extra_data": {"has_analysis": chat_input.analysis_id is not None}})
    
    session_id = chat_input.session_id or str(uuid.uuid4())
    analysis_context: dict[str, Any] | None = None
    
    if chat_input.analysis_id:
        analysis = db.get(COOAnalysis, chat_input.analysis_id)
        if analysis:
            analysis_context = {
                "input": analysis.input_payload,
                "analysis": analysis.analysis_json,
                "priority_area": analysis.priority_area,
                "risk_level": analysis.risk_level,
            }
    
    chat_history: list[dict[str, str]] | None = None
    if session_id:
        stmt = select(COOChatMessage).where(
            COOChatMessage.session_id == session_id
        ).order_by(COOChatMessage.created_at.asc())
        history_messages = db.execute(stmt).scalars().all()
        chat_history = [
            {"role": msg.role, "content": msg.content}
            for msg in history_messages
        ]
    
    user_msg = COOChatMessage(
        user_id=None,
        analysis_id=chat_input.analysis_id,
        role="user",
        content=chat_input.message,
        session_id=session_id,
    )
    db.add(user_msg)
    db.commit()
    
    assistant_response = await run_chat_agent(
        user_message=chat_input.message,
        chat_history=chat_history,
        analysis_context=analysis_context,
    )
    
    assistant_msg = COOChatMessage(
        user_id=None,
        analysis_id=chat_input.analysis_id,
        role="assistant",
        content=assistant_response,
        session_id=session_id,
    )
    db.add(assistant_msg)
    db.commit()
    db.refresh(assistant_msg)
    
    logger.info("chat_message_response", extra={"extra_data": {"session_id": session_id}})
    
    return ChatResponse(
        message=_serialize_message(assistant_msg),
        session_id=session_id,
    )


@router.get("/history", response_model=list[ChatMessageOut])
def get_chat_history(
    session_id: str = Query(..., description="Chat session ID"),
    db: Session = Depends(get_db),
) -> list[ChatMessageOut]:
    """Get chat history for a session."""
    stmt = select(COOChatMessage).where(
        COOChatMessage.session_id == session_id
    ).order_by(COOChatMessage.created_at.asc())
    messages = db.execute(stmt).scalars().all()
    return [_serialize_message(msg) for msg in messages]

