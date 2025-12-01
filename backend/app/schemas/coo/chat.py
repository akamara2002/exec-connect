from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class ChatMessageIn(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    analysis_id: int | None = None
    session_id: str | None = None


class ChatMessageOut(BaseModel):
    id: int
    role: Literal["user", "assistant"]
    content: str
    created_at: datetime
    analysis_id: int | None = None


class ChatResponse(BaseModel):
    message: ChatMessageOut
    session_id: str

