import type { CSSProperties, ReactNode } from "react";
import type { WorkspaceDetails, WorkspaceEntry, WorkspaceSummary } from "@corexa/shared";
import { LIVE_PROJECT_ID } from "./constants.js";
import type {
  ProjectKind,
  ProjectRecord,
  ResolvedTheme,
  ThreadMessage,
  ThreadRecord,
} from "./types.js";

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function formatRelativeTime(timestamp: string): string {
  const delta = Date.now() - new Date(timestamp).getTime();

  if (delta < 60_000) {
    return "Now";
  }

  if (delta < 3_600_000) {
    return `${Math.floor(delta / 60_000)}m`;
  }

  if (delta < 86_400_000) {
    return `${Math.floor(delta / 3_600_000)}h`;
  }

  return `${Math.floor(delta / 86_400_000)}d`;
}

export function formatMessageTime(timestamp: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function extractWorkspaceLabel(pathname: string, fallback: string): string {
  const segments = pathname.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? fallback.toLowerCase().replace(/\s+/g, "-");
}

export function formatProjectName(pathname: string): string {
  return extractWorkspaceLabel(pathname, "project")
    .split(/[-_]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function getProjectKindLabel(kind: ProjectKind): string {
  if (kind === "scratch") {
    return "Scratch";
  }

  if (kind === "existing-folder") {
    return "Folder";
  }

  return "Local";
}

export function humanizeEntryList(entries: WorkspaceEntry[]): string {
  const names = entries.slice(0, 4).map((entry) => entry.path);

  if (names.length === 0) {
    return "the current workspace";
  }

  if (names.length === 1) {
    return names[0] ?? "the current workspace";
  }

  const lastName = names[names.length - 1] ?? "the current workspace";
  return `${names.slice(0, -1).join(", ")}, and ${lastName}`;
}

export function buildWelcomeMessage(
  workspace: WorkspaceSummary | null,
  details: WorkspaceDetails | null,
): ThreadMessage {
  const workspaceName = workspace?.name ?? "Corexa";
  const branch = details?.branch ?? "main";
  const entries = humanizeEntryList(details?.topEntries ?? []);
  const changedFiles = details?.changedFiles.length ?? 0;

  return {
    body:
      `I've loaded ${workspaceName} on ${branch} and grounded the thread in ${entries}.\n\n` +
      `${changedFiles > 0 ? `There are ${changedFiles} changed file${changedFiles === 1 ? "" : "s"} in the working tree, so I'll keep that context in mind while planning the next move.` : "The working tree is clean, so we can isolate the next change without extra cleanup."}`,
    createdAt: new Date().toISOString(),
    id: createId("message"),
    label: "Corexa",
    role: "assistant",
    title: "Workspace ready",
  };
}

export function buildAssistantMessage(
  prompt: string,
  workspace: WorkspaceSummary | null,
  details: WorkspaceDetails | null,
): ThreadMessage {
  const normalized = prompt.toLowerCase();
  const branch = details?.branch ?? "main";
  const focusEntry = details?.topEntries[0]?.path ?? workspace?.name ?? "the workspace";
  const changedFiles = details?.changedFiles ?? [];
  let body =
    `I'll start in \`${focusEntry}\`, align the request to the current repository shape, and then summarize the smallest safe next step on \`${branch}\`.\n\n` +
    `${changedFiles.length > 0 ? `I'll also account for the existing working tree changes before touching code.` : "Because the working tree is clean, the next change can stay tightly scoped."}`;

  if (normalized.includes("review")) {
    body =
      `I'll review the current working tree first and stay focused on correctness, regressions, and missing validation.\n\n` +
      `${changedFiles.length > 0 ? `The first file I'll inspect is \`${changedFiles[0]}\`, then I'll trace any adjacent modules that could be affected.` : "There are no local file changes yet, so I'll start from the target module or the area implied by your request."}`;
  } else if (
    normalized.includes("build") ||
    normalized.includes("implement") ||
    normalized.includes("create") ||
    normalized.includes("add")
  ) {
    body =
      `I'll map the request onto \`${focusEntry}\`, inspect the surrounding files, and then stage the smallest implementation pass that satisfies the task.\n\n` +
      `${changedFiles.length > 0 ? `I'll keep the ${changedFiles.length} existing changed file${changedFiles.length === 1 ? "" : "s"} separate from the new work where possible.` : "With a clean tree, the change can stay self-contained from the start."}`;
  } else if (normalized.includes("explain") || normalized.includes("architecture")) {
    body =
      `I'll explain the workspace from the top down, starting with ${humanizeEntryList(details?.topEntries ?? [])}, then I'll connect that structure back to \`${branch}\` and the current task.`;
  }

  return {
    body,
    createdAt: new Date().toISOString(),
    id: createId("message"),
    label: "Corexa",
    role: "assistant",
    title: "Task outline",
  };
}

export function createThreadRecord(
  projectId: string,
  workspace: WorkspaceSummary | null,
  details: WorkspaceDetails | null,
): ThreadRecord {
  const createdAt = new Date().toISOString();

  return {
    activity: [
      {
        createdAt,
        description: "Opened a new chat",
        id: createId("activity"),
      },
    ],
    branch: details?.branch ?? "main",
    id: createId("thread"),
    messages: [buildWelcomeMessage(workspace, details)],
    pinned: false,
    projectId,
    title: "New chat",
    updatedAt: createdAt,
  };
}

export function projectToWorkspaceSummary(project: ProjectRecord): WorkspaceSummary {
  return {
    id: project.id,
    languages: project.languages,
    name: project.name,
    repositoryStatus: project.repositoryStatus,
    rootPath: project.rootPath,
  };
}

export function projectToWorkspaceDetails(project: ProjectRecord): WorkspaceDetails {
  return {
    branch: project.branch,
    changedFiles: project.changedFiles,
    topEntries: project.topEntries,
  };
}

export function createWorkspaceProjectRecord(
  workspace: WorkspaceSummary | null,
  details: WorkspaceDetails | null,
): ProjectRecord {
  return {
    branch: details?.branch ?? "main",
    changedFiles: details?.changedFiles ?? [],
    id: LIVE_PROJECT_ID,
    kind: "workspace",
    languages: workspace?.languages ?? ["TypeScript", "Go", "Rust"],
    name: workspace?.name ?? "Corexa",
    repositoryStatus: workspace?.repositoryStatus ?? "warm",
    rootPath: workspace?.rootPath ?? "Local workspace",
    topEntries:
      details?.topEntries ?? [
        { kind: "directory", name: "apps", path: "apps" },
        { kind: "directory", name: "packages", path: "packages" },
        { kind: "directory", name: "runtime", path: "runtime" },
      ],
  };
}

export function createScratchProjectRecord(index: number, baseLanguages: string[]): ProjectRecord {
  const projectNumber = index + 1;

  return {
    branch: "main",
    changedFiles: [],
    id: createId("project"),
    kind: "scratch",
    languages: baseLanguages.length > 0 ? baseLanguages : ["TypeScript"],
    name: projectNumber === 1 ? "Untitled project" : `Untitled project ${projectNumber}`,
    repositoryStatus: "cold",
    rootPath: `Scratch workspace ${projectNumber}`,
    topEntries: [
      { kind: "directory", name: "src", path: "src" },
      { kind: "directory", name: "docs", path: "docs" },
      { kind: "file", name: "README.md", path: "README.md" },
    ],
  };
}

export function createExistingFolderProjectRecord(
  pathname: string,
  baseLanguages: string[],
): ProjectRecord {
  return {
    branch: "local",
    changedFiles: [],
    id: createId("project"),
    kind: "existing-folder",
    languages: baseLanguages.length > 0 ? baseLanguages : ["TypeScript"],
    name: formatProjectName(pathname),
    repositoryStatus: "cold",
    rootPath: pathname,
    topEntries: [
      { kind: "directory", name: "src", path: "src" },
      { kind: "directory", name: "docs", path: "docs" },
      { kind: "file", name: ".env.example", path: ".env.example" },
    ],
  };
}

export function getThemeStyles(resolvedTheme: ResolvedTheme): CSSProperties {
  return {
    "--corexa-app-bg": resolvedTheme === "dark" ? "#0f1216" : "#f6f4ef",
    "--corexa-code-bg": resolvedTheme === "dark" ? "rgba(255,255,255,0.08)" : "#f1efeb",
    "--corexa-border-subtle":
      resolvedTheme === "dark" ? "rgba(255,255,255,0.09)" : "rgba(17,24,39,0.08)",
    "--corexa-composer-bg": resolvedTheme === "dark" ? "#171a1f" : "#ffffff",
    "--corexa-main-bg": resolvedTheme === "dark" ? "#101317" : "#fcfbf8",
    "--corexa-modal-bg": resolvedTheme === "dark" ? "#12161b" : "#ffffff",
    "--corexa-muted-bg": resolvedTheme === "dark" ? "rgba(255,255,255,0.06)" : "#f4f2ed",
    "--corexa-muted-bg-strong": resolvedTheme === "dark" ? "rgba(255,255,255,0.08)" : "#efede8",
    "--corexa-overlay-bg": resolvedTheme === "dark" ? "rgba(4,6,8,0.72)" : "rgba(20,16,10,0.18)",
    "--corexa-sidebar-bg": resolvedTheme === "dark" ? "#171b20" : "#e7e5e0",
    "--corexa-text-muted": resolvedTheme === "dark" ? "#9d968d" : "#7d7973",
    "--corexa-text-primary": resolvedTheme === "dark" ? "#efe8de" : "#201f1d",
    "--corexa-text-soft": resolvedTheme === "dark" ? "#b8b0a7" : "#8a857e",
    "--corexa-user-bubble": resolvedTheme === "dark" ? "rgba(255,255,255,0.08)" : "#f2f1ed",
  } as CSSProperties;
}

export function renderInlineContent(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          className="rounded-[12px] bg-[var(--corexa-code-bg)] px-2 py-1 font-mono text-[0.94em] text-[var(--corexa-text-primary)]"
          key={`${part}-${index}`}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function renderBodyBlocks(text: string, keyPrefix: string): ReactNode {
  return text.split(/\n{2,}/).map((block, blockIndex) => {
    const normalizedBlock = block.trim();

    if (normalizedBlock.length === 0) {
      return null;
    }

    const bulletLines = normalizedBlock.split("\n");

    if (bulletLines.every((line) => /^\s*-\s+/.test(line))) {
      return (
        <ul className="list-disc space-y-3 pl-7" key={`${keyPrefix}-bullets-${blockIndex}`}>
          {bulletLines.map((line, lineIndex) => (
            <li
              className="text-[15px] leading-[1.8] text-[var(--corexa-text-primary)]"
              key={`${line}-${lineIndex}`}
            >
              {renderInlineContent(line.replace(/^\s*-\s+/, ""))}
            </li>
          ))}
        </ul>
      );
    }

    if (bulletLines.every((line) => /^\s*\d+\.\s+/.test(line))) {
      return (
        <ol className="list-decimal space-y-3 pl-7" key={`${keyPrefix}-ordered-${blockIndex}`}>
          {bulletLines.map((line, lineIndex) => (
            <li
              className="text-[15px] leading-[1.8] text-[var(--corexa-text-primary)]"
              key={`${line}-${lineIndex}`}
            >
              {renderInlineContent(line.replace(/^\s*\d+\.\s+/, ""))}
            </li>
          ))}
        </ol>
      );
    }

    return (
      <p
        className="text-[15px] leading-[1.85] text-[var(--corexa-text-primary)]"
        key={`${keyPrefix}-paragraph-${blockIndex}`}
      >
        {renderInlineContent(normalizedBlock.replace(/\n/g, " "))}
      </p>
    );
  });
}
