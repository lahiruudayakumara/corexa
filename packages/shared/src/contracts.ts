export type AgentRole = "planner" | "coder" | "reviewer" | "debugger" | "architect";

export type RepositoryStatus = "cold" | "indexing" | "warm" | "stale";

export type RuntimeStatus = "starting" | "ready" | "busy" | "degraded";

export interface WorkspaceSummary {
  id: string;
  name: string;
  rootPath: string;
  languages: string[];
  repositoryStatus: RepositoryStatus;
}

export interface RuntimeHealth {
  status: RuntimeStatus;
  provider: string;
  version: string;
  activeModel: string;
}

export interface ModelDescriptor {
  id: string;
  provider: string;
  family: string;
  capabilities: string[];
  contextWindow: number;
  local: boolean;
}

export interface AgentTask {
  id: string;
  role: AgentRole;
  objective: string;
  workspaceRoot: string;
  constraints: string[];
}

export interface MemoryHit {
  id: string;
  score: number;
  sourcePath: string;
  preview: string;
  metadata: Record<string, string | number | boolean>;
}
