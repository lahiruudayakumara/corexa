export interface ChunkRecord {
  id: string;
  path: string;
  startLine: number;
  endLine: number;
  content: string;
  symbolPath: string[];
}

export function buildChunkId(path: string, startLine: number, endLine: number): string {
  return `${path}:${startLine}-${endLine}`;
}
