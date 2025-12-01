"""Schemas for AI-CFO chat interactions."""
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional


class CFOChatRequest(BaseModel):
    """Chat request payload."""

    message: str = Field(..., min_length=1, description="User message to AI-CFO")
    session_id: Optional[str] = Field(
        None,
        description="Optional client provided session/thread identifier",
    )
    user_id: Optional[int] = Field(
        None,
        description="Optional user identifier if authenticated",
    )


class CFOChatResponse(BaseModel):
    """Chat response payload."""

    session_id: str
    user_message: str
    ai_response: str
    created_at: datetime

    class Config:
        from_attributes = True

