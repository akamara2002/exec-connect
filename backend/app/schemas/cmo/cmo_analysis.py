"""
Pydantic schemas for CMO analysis output.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ActionPlanSchema(BaseModel):
    """Action plan with timeline breakdown."""
    week: list[str] = Field(default_factory=list, description="Actions for this week")
    month: list[str] = Field(default_factory=list, description="Actions for this month")
    quarter: list[str] = Field(default_factory=list, description="Actions for this quarter")


class CMOAnalysisSchema(BaseModel):
    """Schema for CMO analysis response."""
    
    summary: str = Field(..., description="Executive summary of the analysis")
    primary_issue: str = Field(..., description="Primary issue identified")
    risks: list[str] = Field(default_factory=list, description="List of identified risks")
    recommendations: list[str] = Field(default_factory=list, description="List of recommendations")
    action_plan: ActionPlanSchema = Field(..., description="Structured action plan")
    risk_level: str = Field(..., description="Overall risk level: green, yellow, or red")
    created_at: Optional[datetime] = Field(None, description="Analysis creation timestamp")
    
    class Config:
        json_schema_extra = {
            "example": {
                "summary": "Your marketing strategy shows strong fundamentals but needs optimization in digital channels.",
                "primary_issue": "Limited digital marketing effectiveness",
                "risks": ["Low ROI on digital campaigns", "Insufficient data tracking"],
                "recommendations": [
                    "Implement marketing automation",
                    "Set up proper analytics tracking",
                    "Focus on high-ROI channels"
                ],
                "action_plan": {
                    "week": ["Set up Google Analytics", "Review current campaigns"],
                    "month": ["Launch A/B testing program", "Optimize ad spend"],
                    "quarter": ["Implement marketing automation", "Develop content strategy"]
                },
                "risk_level": "yellow"
            }
        }


class CMOAnalysisResponse(BaseModel):
    """Full analysis response including metadata."""
    id: int
    analysis: CMOAnalysisSchema
    input_payload: dict
    created_at: datetime

