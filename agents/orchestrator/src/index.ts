import type { AgentRole, AgentTask } from "@corexa/shared";

export interface OrchestrationStep {
  role: AgentRole;
  handoffReason: string;
}

export interface OrchestrationPlan {
  task: AgentTask;
  steps: OrchestrationStep[];
}

export function buildDefaultPlan(task: AgentTask): OrchestrationPlan {
  return {
    task,
    steps: [
      { role: "architect", handoffReason: "define implementation approach" },
      { role: "planner", handoffReason: "break work into executable steps" },
      { role: "coder", handoffReason: "apply changes to the workspace" },
      { role: "reviewer", handoffReason: "check correctness and risks" },
      { role: "debugger", handoffReason: "resolve validation failures if any" },
    ],
  };
}
