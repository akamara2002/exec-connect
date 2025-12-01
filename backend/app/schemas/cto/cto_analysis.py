"""
Pydantic schemas for CTO analysis output.
"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class ActionPlanItem(BaseModel):
    """Action plan item for specific time period."""
    title: str
    description: str
    priority: str  # high, medium, low


class ActionPlan(BaseModel):
    """Action plan organized by timeframe."""
    week: List[ActionPlanItem] = []
    month: List[ActionPlanItem] = []
    quarter: List[ActionPlanItem] = []


class Risk(BaseModel):
    """Risk item."""
    title: str
    description: str
    severity: str  # high, medium, low
    impact: str


class Recommendation(BaseModel):
    """Recommendation item."""
    title: str
    description: str
    category: str  # infrastructure, security, process, team, etc.
    priority: str  # high, medium, low
    estimated_impact: str


class CTOAnalysisSchema(BaseModel):
    """Schema for CTO analysis output."""
    summary: str = Field(..., description="Executive summary of the analysis")
    primary_issue: str = Field(..., description="Primary technology challenge identified")
    risks: List[Risk] = Field(default_factory=list)
    recommendations: List[Recommendation] = Field(default_factory=list)
    action_plan: ActionPlan = Field(default_factory=ActionPlan)
    risk_level: str = Field(..., description="Overall risk level: low, medium, high")
    created_at: Optional[datetime] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "summary": "Your technology infrastructure shows moderate maturity...",
                "primary_issue": "Scaling infrastructure and users",
                "risk_level": "medium",
                "risks": [
                    {
                        "title": "Technical Debt",
                        "description": "Accumulating technical debt may slow down future development",
                        "severity": "medium",
                        "impact": "Development velocity"
                    }
                ],
                "recommendations": [
                    {
                        "title": "Implement CI/CD Pipeline",
                        "description": "Automate deployment processes to improve reliability",
                        "category": "process",
                        "priority": "high",
                        "estimated_impact": "High - Reduces deployment errors by 60%"
                    }
                ],
                "action_plan": {
                    "week": [
                        {
                            "title": "Security Audit",
                            "description": "Conduct comprehensive security assessment",
                            "priority": "high"
                        }
                    ],
                    "month": [],
                    "quarter": []
                }
            }
        }


class CTOAnalysisResponse(BaseModel):
    """Response schema for CTO analysis."""
    id: int
    user_id: int
    analysis: CTOAnalysisSchema
    created_at: datetime

