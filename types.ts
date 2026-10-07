
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  agentId: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface AgentDefinition {
  id: string;
  name: string;
  expertise: string;
  instructions?: string; 
  allowedFiles?: string[];
}

// Legacy types kept for compatibility with unused components
export interface PerspectiveData {
  role: string;
  coreIssue: string;
  deepInsight: string;
  opportunity: string;
  risk: string;
  recommendation: string;
}

export interface AnalysisToolDefinition {
  id: string;
  title: string;
  description: string;
  operatorInstruction: string;
}

export interface AdvancedAnalysisResult {
  id: string;
  title: string;
  content: string;
}
