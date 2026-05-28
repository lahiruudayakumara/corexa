export interface CorexaWorkspaceConfig {
  name: string;
  model: string;
  indexing: {
    include: string[];
    exclude: string[];
  };
  sandbox: {
    shellAllowList: string[];
    requireApprovalForWriteOutsideWorkspace: boolean;
  };
}

export const defaultWorkspaceConfig: CorexaWorkspaceConfig = {
  name: "corexa-workspace",
  model: "corexa-code-fast",
  indexing: {
    include: ["**/*.{ts,tsx,js,jsx,go,rs,py,md,json,yaml,yml}"],
    exclude: ["node_modules/**", ".git/**", "dist/**", "build/**"],
  },
  sandbox: {
    shellAllowList: ["git", "pnpm", "go", "cargo", "rg"],
    requireApprovalForWriteOutsideWorkspace: true,
  },
};
