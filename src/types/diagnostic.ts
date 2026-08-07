export type MarketArea = "autonomous" | "associated" | "agency" | "developer" | "builder" | "other";
export type MainGoal = "portfolio" | "clients" | "digital" | "sales" | "revenue" | "all";
export type Priority = "high" | "medium" | "low";

export interface DiagnosticData {
  name: string;
  whatsapp: string;
  email: string;
  marketArea: MarketArea | "";
  instagram: string;
  location: string;
  mainGoal: MainGoal | "";
  priority: Priority | "";
}

export interface DiagnosticSubmissionPayload {
  name: string;
  whatsapp: string;
  email: string;
  marketArea: MarketArea;
  instagram: string;
  location: string;
  mainGoal: MainGoal;
  priority: Priority;
  source: "escala-imob-diagnostico";
}
