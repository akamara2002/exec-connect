from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class ActionPlan(BaseModel):
    week: list[str]
    month: list[str]
    quarter: list[str]


class COOAnalysisOut(BaseModel):
    id: int
    summary: str
    primary_issue: str
    priority_area: str
    risks: list[str]
    recommendations: list[str]
    action_plan: ActionPlan
    risk_level: Literal["green", "yellow", "red"]
    created_at: datetime


class COOAnalysisPage(BaseModel):
    items: list[COOAnalysisOut]
    total: int

