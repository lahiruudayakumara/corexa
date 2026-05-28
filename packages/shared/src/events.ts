import type { AgentRole, ModelDescriptor } from "./contracts.js";

export type CorexaEvent =
  | { type: "agent.task.created"; taskId: string; role: AgentRole }
  | { type: "agent.task.completed"; taskId: string; role: AgentRole }
  | { type: "workspace.index.started"; workspaceId: string }
  | { type: "workspace.index.completed"; workspaceId: string; chunkCount: number }
  | { type: "model.loaded"; model: ModelDescriptor }
  | { type: "runtime.health.changed"; status: string };

export interface EventEnvelope<TEvent extends CorexaEvent = CorexaEvent> {
  id: string;
  timestamp: string;
  source: string;
  payload: TEvent;
}
