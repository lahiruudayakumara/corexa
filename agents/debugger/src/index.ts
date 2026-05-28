export const debuggerAgent = {
  role: "debugger",
  responsibilities: [
    "reproduce failures with runtime and terminal traces",
    "correlate logs, events, and code context",
    "generate minimal fixes and revalidation steps",
  ],
} as const;
