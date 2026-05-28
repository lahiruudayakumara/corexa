import type { MemoryHit } from "@corexa/shared";

export interface VectorStoreRecord {
  id: string;
  collection: string;
  embedding: number[];
  payload: Record<string, unknown>;
}

export interface VectorStore {
  upsert(records: VectorStoreRecord[]): Promise<void>;
  search(queryEmbedding: number[], limit: number): Promise<MemoryHit[]>;
}
