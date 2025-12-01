/**
 * TypeScript types matching backend schemas.
 */

export interface CTOInput {
  biggest_challenge: string[];
  team_composition: string;
  tech_stack_maturity: string;
  roadmap_management: string;
  has_security_policies: boolean;
  operational_risks: string;
  devops_maturity: string;
  business_alignment: number;
  innovation_investment: string;
  notes?: string;
}

export interface ActionPlanItem {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface ActionPlan {
  week: ActionPlanItem[];
  month: ActionPlanItem[];
  quarter: ActionPlanItem[];
}

export interface Risk {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  impact: string;
}

export interface Recommendation {
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  estimated_impact: string;
}

export interface CTOAnalysis {
  summary: string;
  primary_issue: string;
  risks: Risk[];
  recommendations: Recommendation[];
  action_plan: ActionPlan;
  risk_level: "low" | "medium" | "high";
  created_at?: string;
}

export interface CTOAnalysisResponse {
  id: number;
  user_id: number;
  analysis: CTOAnalysis;
  created_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation_history?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  role: string;
}

