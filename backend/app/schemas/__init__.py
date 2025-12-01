"""Unified schemas for Exec-Connect system."""
# CFO schemas
from .cfo.cfo_input import CFOInput
from .cfo.cfo_analysis import CFOAnalysisOut, CFOAnalysisListItem, ActionPlan as CFOActionPlan
from .cfo.cfo_chat import CFOChatRequest, CFOChatResponse

# CMO schemas
from .cmo.cmo_input import CMOInputSchema
from .cmo.cmo_analysis import CMOAnalysisSchema, CMOAnalysisResponse, ActionPlanSchema as CMOActionPlanSchema

# COO schemas
from .coo.coo_input import COOInput
from .coo.coo_analysis import COOAnalysisOut, COOAnalysisPage
from .coo.chat import ChatMessageIn, ChatMessageOut, ChatResponse as COOChatResponse

# CTO schemas
from .cto.cto_input import CTOInputSchema
from .cto.cto_analysis import (
    CTOAnalysisSchema,
    CTOAnalysisResponse,
    Risk,
    Recommendation,
    ActionPlan as CTOActionPlan,
    ActionPlanItem
)

__all__ = [
    # CFO
    "CFOInput",
    "CFOAnalysisOut",
    "CFOAnalysisListItem",
    "CFOActionPlan",
    "CFOChatRequest",
    "CFOChatResponse",
    # CMO
    "CMOInputSchema",
    "CMOAnalysisSchema",
    "CMOAnalysisResponse",
    "CMOActionPlanSchema",
    # COO
    "COOInput",
    "COOAnalysisOut",
    "COOAnalysisPage",
    "ChatMessageIn",
    "ChatMessageOut",
    "COOChatResponse",
    # CTO
    "CTOInputSchema",
    "CTOAnalysisSchema",
    "CTOAnalysisResponse",
    "Risk",
    "Recommendation",
    "CTOActionPlan",
    "ActionPlanItem",
]

