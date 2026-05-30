import type { DesktopSettings, ModelPreset, SettingsSection } from "./types.js";

export const LIVE_PROJECT_ID = "project-current-workspace";
export const LEGACY_THREAD_STORAGE_KEY = "corexa.desktop.threads.v3";
export const SETTINGS_STORAGE_KEY = "corexa.desktop.settings.v1";
export const WORKSPACE_STORAGE_KEY = "corexa.desktop.workspace.v5";
export const BRAND_LOGO_SRC = "/brand/corexa-mark.png";

export const modelPresets: ModelPreset[] = ["Corexa Fast", "Corexa Medium", "Corexa Deep"];

export const defaultSettings: DesktopSettings = {
  autoRefreshWorkspace: false,
  compactSidebar: false,
  gitAuthorEmail: "corexa@example.dev",
  gitAuthorName: "Corexa Developer",
  gitAutoFetch: true,
  gitDefaultBranch: "main",
  gitSignCommits: false,
  launchToLastProject: true,
  themePreference: "system",
};

export const settingsNavigationItems: Array<{
  description: string;
  id: SettingsSection;
  title: string;
}> = [
  {
    description: "Workspace behavior and startup preferences.",
    id: "general",
    title: "General",
  },
  {
    description: "Theme, shell appearance, and density.",
    id: "appearance",
    title: "Appearance",
  },
  {
    description: "Repository defaults and commit behavior.",
    id: "git",
    title: "Git",
  },
];
