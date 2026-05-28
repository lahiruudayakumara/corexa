export const plannerAgent = {
  role: "planner",
  responsibilities: [
    "convert goals into deterministic execution plans",
    "select tools, files, and validation checkpoints",
    "coordinate context retrieval from repo intelligence and memory",
  ],
} as const;
