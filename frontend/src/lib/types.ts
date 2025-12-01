/** TypeScript types matching backend schemas. */
// Re-export non-conflicting types from agent-specific modules
export type { CMOInput, CMOAnalysisResponse, CMOAnalysis, ChatRequest as CMOChatRequest, ChatResponse as CMOChatResponse, PaginatedResponse } from "./types-cmo";
export type { 
  COOInput, 
  COOAnalysisOut, 
  ChatMessage as COOChatMessage, 
  ChatResponse as COOChatResponse,
  OperationalChallenge,
  OpsManagementSystems,
  KPITrackingMethod,
  SOPCoverage,
  CostOverrunType,
  VendorManagementMaturity,
  WorkforceDevelopment,
  BusinessModel,
  LegacyKPITracking,
  RiskLevel
} from "./types-coo";
export type { CTOInput, CTOAnalysis, CTOAnalysisResponse, ChatMessage as CTOChatMessage, ChatRequest as CTOChatRequest, ActionPlan as CTOActionPlan, ActionPlanItem, Risk, Recommendation } from "./types-cto";
// Note: ChatMessage exists in multiple modules, so import directly:
// - CMO: ChatMessage from "./types-cmo"
// - COO: ChatMessage from "./types-coo"  
// - CTO: ChatMessage from "./types-cto"

export interface CFOInput {
  biggest_challenge: string;
  monthly_revenue: number[];
  monthly_expenses: number[];
  cash_on_hand: number;
  debt: number;
  upcoming_payments?: number | null;
  funding_structure: string;
  funding_structure_other?: string | null;
  financial_statements: string;
  systems_used: string[];
  unit_economics_visibility: string;
  industry: string;
  primary_markets: string[];
  fx_exposure: string;
  top_revenue_streams: string[];
  avg_collection_period_days: number;
  overdue_invoices_percent: number;
  inventory_posture: string;
  credit_facilities: string[];
  risk_appetite: string;
  preferred_output_focus: string[];
  kpi_review_frequency: string;
  fundraising_plan: string;
  financial_control_confidence: number;
  cost_optimization_initiatives: string[];
  cost_optimization_other?: string | null;
  notes?: string | null;
}

export interface ActionPlan {
  week: string[];
  month: string[];
  quarter: string[];
}

export interface CFOAnalysisOut {
  id: number;
  summary: string;
  primary_issue: string;
  risks: string[];
  recommendations: string[];
  action_plan: ActionPlan;
  risk_level: "green" | "yellow" | "red";
  created_at: string;
}

export interface CFOAnalysisListItem {
  id: number;
  summary: string;
  primary_issue: string;
  risk_level: "green" | "yellow" | "red";
  created_at: string;
}

export interface CFOChatRequest {
  message: string;
  session_id?: string;
  user_id?: number;
}

export interface CFOChatResponse {
  session_id: string;
  user_message: string;
  ai_response: string;
  created_at: string;
}

