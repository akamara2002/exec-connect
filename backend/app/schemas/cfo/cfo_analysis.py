"""Pydantic schemas for CFO analysis output."""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ActionPlan(BaseModel):
    """Action plan structure."""
    week: list[str]
    month: list[str]
    quarter: list[str]


class CFOAnalysisOut(BaseModel):
    """Output schema for CFO analysis."""
    
    id: int
    summary: str
    primary_issue: str
    risks: list[str]
    recommendations: list[str]
    action_plan: ActionPlan
    risk_level: str  # "green", "yellow", "red"
    created_at: datetime
    
    class Config:
        from_attributes = True


class CFOAnalysisListItem(BaseModel):
    """Simplified analysis for list views."""
    
    id: int
    summary: str
    primary_issue: str
    risk_level: str
    created_at: datetime
    
    class Config:
        from_attributes = True

