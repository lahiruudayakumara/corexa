import type {
  RuntimeHealth,
  WorkspaceDetails,
  WorkspaceEntry,
  WorkspaceSummary,
} from "@corexa/shared";

export type ChatWorkspaceProps = {
  details: WorkspaceDetails | null;
  error: string | null;
  isRefreshing: boolean;
  onRefresh: () => void;
  runtime: RuntimeHealth | null;
  workspace: WorkspaceSummary | null;
};

export type SidebarMode = "threads" | "automations" | "skills";
export type ThreadView = "thread" | "context" | "activity" | "changes";
export type ThreadSort = "recent" | "title";
export type PermissionMode = "Auto" | "Ask first" | "Read-only";
export type MessageRole = "assistant" | "user" | "system";
export type ModelPreset = "Corexa Fast" | "Corexa Medium" | "Corexa Deep";
export type ProjectKind = "workspace" | "scratch" | "existing-folder";
export type SettingsSection = "general" | "appearance" | "git";
export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export type ThreadMessage = {
  body: string;
  createdAt: string;
  id: string;
  label: string;
  role: MessageRole;
  title: string;
};

export type ActivityItem = {
  createdAt: string;
  description: string;
  id: string;
};

export type ThreadRecord = {
  activity: ActivityItem[];
  branch: string;
  id: string;
  messages: ThreadMessage[];
  pinned?: boolean;
  projectId: string;
  title: string;
  updatedAt: string;
};

export type ProjectRecord = {
  branch: string;
  changedFiles: string[];
  id: string;
  kind: ProjectKind;
  languages: string[];
  name: string;
  repositoryStatus: WorkspaceSummary["repositoryStatus"];
  rootPath: string;
  topEntries: WorkspaceEntry[];
};

export type DesktopSettings = {
  autoRefreshWorkspace: boolean;
  compactSidebar: boolean;
  gitAuthorEmail: string;
  gitAuthorName: string;
  gitAutoFetch: boolean;
  gitDefaultBranch: string;
  gitSignCommits: boolean;
  launchToLastProject: boolean;
  themePreference: ThemePreference;
};

export type PromptSurfaceItem = {
  description: string;
  prompt: string;
  title: string;
};

export type IconProps = {
  className?: string;
};
