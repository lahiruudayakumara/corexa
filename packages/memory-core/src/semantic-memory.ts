import type { MemoryHit } from "@corexa/shared";

export interface MemoryQuery {
  workspaceId: string;
  prompt: string;
  topK: number;
}

export interface SemanticMemory {
  remember(fact: string, metadata: Record<string, unknown>): Promise<void>;
  recall(query: MemoryQuery): Promise<MemoryHit[]>;
}
