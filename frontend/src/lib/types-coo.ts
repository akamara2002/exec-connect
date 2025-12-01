export type OperationalChallenge =
  | "scaling_operations"
  | "supply_chain_inefficiencies"
  | "quality_assurance"
  | "workforce_productivity"
  | "process_standardization"
  | "digital_transformation";

export type OpsManagementSystems =
  | "custom_built"
  | "off_the_shelf"
  | "partial_use"
  | "no_formal_systems";

export type KPITrackingMethod =
  | "realtime_dashboards"
  | "manual_spreadsheets"
  | "no_formal_tracking";

export type SOPCoverage = "fully_documented" | "documented_outdated" | "no_sops";

export type CostOverrunType =
  | "procurement_vendor"
  | "labor_workforce"
  | "logistics_transportation"
  | "equipment_maintenance"
  | "other";

export type VendorManagementMaturity =
  | "fully_managed"
  | "partially_managed"
  | "no_formal_management";

export type WorkforceDevelopment =
  | "continuous_training"
  | "ad_hoc_training"
  | "none";

export type BusinessModel =
  | "retail"
  | "manufacturing"
  | "services"
  | "agriculture"
  | "mixed";

export type LegacyKPITracking = "yes_consistently" | "sometimes" | "not_at_all";
export type RiskLevel = "green" | "yellow" | "red";

export interface COOInput {
  // New required fields
  biggest_operational_challenge: OperationalChallenge;
  ops_management_systems: OpsManagementSystems;
  kpi_tracking_method: KPITrackingMethod;
  has_documented_sops: SOPCoverage;
  cost_overruns: CostOverrunType[];
  cost_overruns_other?: string | null;
  vendor_management_maturity: VendorManagementMaturity;
  operational_efficiency_rating: number; // 1-5
  workforce_development: WorkforceDevelopment[];
  sustainability_compliance: boolean;
  // Legacy optional fields
  business_model?: BusinessModel | null;
  monthly_output_units?: number[];
  monthly_ops_costs?: number[];
  on_time_delivery_rate?: number | null;
  defect_or_return_rate?: number | null;
  avg_lead_time_days?: number | null;
  ops_systems_used?: string[];
  ops_team_size?: number;
  uses_kpi_tracking?: LegacyKPITracking | null;
  notes?: string | null;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  analysis_id?: number | null;
}

export interface ChatResponse {
  message: ChatMessage;
  session_id: string;
}

export interface ActionPlan {
  week: string[];
  month: string[];
  quarter: string[];
}

export interface COOAnalysisOut {
  id: number;
  summary: string;
  primary_issue: string;
  priority_area: string;
  risks: string[];
  recommendations: string[];
  action_plan: ActionPlan;
  risk_level: RiskLevel;
  created_at: string;
}

export interface PaginatedAnalyses {
  items: COOAnalysisOut[];
  total: number;
}

