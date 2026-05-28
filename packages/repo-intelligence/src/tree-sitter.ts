export interface SyntaxNodeRecord {
  type: string;
  startLine: number;
  endLine: number;
  text: string;
}

export interface ParseResult {
  language: string;
  symbols: SyntaxNodeRecord[];
}

export function describeTreeSitterStrategy(): string[] {
  return [
    "Use incremental parsing to avoid full workspace reparses.",
    "Extract symbols, imports, exports, classes, functions, and comments.",
    "Emit canonical chunk boundaries aligned to syntax nodes instead of raw line windows.",
  ];
}
