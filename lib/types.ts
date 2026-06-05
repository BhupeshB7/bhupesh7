export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ProgressState {
  projectIdea: boolean;
  targetUsers: boolean;
  coreFeatures: boolean;
  platformRequirements: boolean;
  budget: boolean;
  timeline: boolean;
}

export interface ProjectBriefData {
  projectName: string;
  overview: string;
  targetUsers: string;
  coreFeatures: string[];
  techStack: string[];
  complexity: "Low" | "Medium" | "High";
  futureEnhancements: string[];
}

export interface LeadData {
  fullName: string;
  email: string;
  company: string;
  budgetRange: string;
  timeline: string;
}

export type ConsultantPhase =
  | "landing"
  | "discovery"
  | "brief-ready"
  | "lead-capture"
  | "success";

export interface ConsultantSession {
  chatId: string;
  messages: Message[];
  phase: ConsultantPhase;
  progress: ProgressState;
  projectBrief: ProjectBriefData | null;
  messageCount: number;
  timestamp: number;
}
