/**
 * TypeScript types for the AI-CMO frontend.
 */

export interface CMOInput {
  primary_challenge: "lead_generation" | "brand_awareness" | "retention" | "digital_eff" | "roi";
  effective_channels: string[];
  marketing_plan_status: string;
  metrics_review_frequency: string;
  marketing_budget_percent: string;
  customer_segmentation: string;
  marketing_tools: string[];
  brand_confidence: number; // 1-5
  strategy_alignment: string;
  notes?: string;
}

export interface ActionPlan {
  week: string[];
  month: string[];
  quarter: string[];
}

export interface CMOAnalysis {
  summary: string;
  primary_issue: string;
  risks: string[];
  recommendations: string[];
  action_plan: ActionPlan;
  risk_level: "green" | "yellow" | "red";
  created_at?: string;
}

export interface CMOAnalysisResponse {
  id: number;
  analysis: CMOAnalysis;
  input_payload: CMOInput;
  created_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  has_more: boolean;
}

export interface ChatRequest {
  question: string;
  user_id?: number;
}

export interface ChatResponse {
  answer: string;
  sources?: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  timestamp: Date;
}

