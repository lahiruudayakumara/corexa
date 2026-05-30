import { BRAND_LOGO_SRC } from "../constants.js";
import {
  IconAdd,
  IconClock,
  IconCompose,
  IconCube,
  IconDots,
  IconFilter,
  IconFolder,
  IconPin,
  IconSearch,
  IconSettings,
} from "../icons.js";
import { formatRelativeTime, getProjectKindLabel } from "../helpers.js";
import type { ProjectRecord, PromptSurfaceItem, SidebarMode, ThreadRecord } from "../types.js";

type WorkspaceSidebarProps = {
  activeProject: ProjectRecord | null;
  activeThread: ThreadRecord | null;
  automationItems: PromptSurfaceItem[];
  isProjectMenuOpen: boolean;
  pinnedThreads: ThreadRecord[];
  projects: ProjectRecord[];
  sidebarMode: SidebarMode;
  skillItems: PromptSurfaceItem[];
  threadQuery: string;
  unpinnedThreads: ThreadRecord[];
  workspaceLabel: string;
  onActivateProject: (projectId: string) => void;
  onCreateExistingFolderProject: () => void | Promise<void>;
  onCreateScratchProject: () => void;
  onCreateThread: () => void;
  onInjectPrompt: (prompt: string, activityDescription: string) => void;
  onOpenSettings: () => void;
  onRefresh: () => void;
  onSelectThread: (threadId: string) => void;
  onSetProjectMenuOpen: (isOpen: boolean) => void;
  onSetSidebarMode: (mode: SidebarMode) => void;
  onSetThreadQuery: (value: string) => void;
  onToggleThreadPin: (threadId: string) => void;
  onToggleThreadSort: () => void;
};

function SidebarPromptList({
  items,
  label,
  onInjectPrompt,
}: {
  items: PromptSurfaceItem[];
  label: "automation" | "skill";
  onInjectPrompt: (prompt: string, activityDescription: string) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <button
          className="w-full rounded-[16px] bg-[var(--corexa-muted-bg-strong)] px-3 py-3 text-left transition hover:bg-[var(--corexa-muted-bg)]"
          key={item.title}
          onClick={() => {
            onInjectPrompt(item.prompt, `Opened ${label}: ${item.title}`);
          }}
          type="button"
        >
          <p className="text-[14px] font-medium text-[var(--corexa-text-primary)]">{item.title}</p>
          <p className="mt-1 text-[14px] leading-6 text-[var(--corexa-text-muted)]">
            {item.description}
          </p>
        </button>
      ))}
    </div>
  );
}

export function WorkspaceSidebar({
  activeProject,
  activeThread,
  automationItems,
  isProjectMenuOpen,
  pinnedThreads,
  projects,
  sidebarMode,
  skillItems,
  threadQuery,
  unpinnedThreads,
  workspaceLabel,
  onActivateProject,
  onCreateExistingFolderProject,
  onCreateScratchProject,
  onCreateThread,
  onInjectPrompt,
  onOpenSettings,
  onRefresh,
  onSelectThread,
  onSetProjectMenuOpen,
  onSetSidebarMode,
  onSetThreadQuery,
  onToggleThreadPin,
  onToggleThreadSort,
}: WorkspaceSidebarProps) {
  const matchingThreadCount = pinnedThreads.length + unpinnedThreads.length;
  const sidebarTitle =
    sidebarMode === "threads" ? "Chats" : sidebarMode === "automations" ? "Automations" : "Skills";

  const renderSidebarContent = () => {
    if (sidebarMode === "automations") {
      return <SidebarPromptList items={automationItems} label="automation" onInjectPrompt={onInjectPrompt} />;
    }

    if (sidebarMode === "skills") {
      return <SidebarPromptList items={skillItems} label="skill" onInjectPrompt={onInjectPrompt} />;
    }

    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2 text-[var(--corexa-text-muted)]">
            <p className="text-[13px]">Projects</p>

            <div className="relative">
              <button
                aria-label="Add project"
                className="rounded-full p-2 transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
                onClick={() => {
                  onSetProjectMenuOpen(!isProjectMenuOpen);
                }}
                type="button"
              >
                <IconAdd className="h-4 w-4" />
              </button>

              {isProjectMenuOpen ? (
                <div className="absolute right-0 top-10 z-10 w-[230px] rounded-[16px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-modal-bg)] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                  <button
                    className="w-full rounded-[12px] px-3 py-2.5 text-left transition hover:bg-[var(--corexa-muted-bg)]"
                    onClick={onCreateScratchProject}
                    type="button"
                  >
                    <p className="text-[13px] font-medium text-[var(--corexa-text-primary)]">
                      Start from scratch
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-[var(--corexa-text-muted)]">
                      Create a blank local project shell.
                    </p>
                  </button>
                  <button
                    className="mt-1 w-full rounded-[12px] px-3 py-2.5 text-left transition hover:bg-[var(--corexa-muted-bg)]"
                    onClick={() => {
                      void onCreateExistingFolderProject();
                    }}
                    type="button"
                  >
                    <p className="text-[13px] font-medium text-[var(--corexa-text-primary)]">
                      Use an existing folder
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-[var(--corexa-text-muted)]">
                      Connect an existing local workspace.
                    </p>
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-1">
            {projects.map((project) => (
              <button
                className={`w-full rounded-[14px] px-3 py-2.5 text-left transition ${
                  activeProject?.id === project.id
                    ? "bg-[var(--corexa-muted-bg)] text-[var(--corexa-text-primary)]"
                    : "text-[var(--corexa-text-primary)] hover:bg-[var(--corexa-muted-bg)]"
                }`}
                key={project.id}
                onClick={() => {
                  onActivateProject(project.id);
                }}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[13px] leading-5">{project.name}</p>
                  <span className="shrink-0 rounded-full bg-[var(--corexa-main-bg)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--corexa-text-muted)]">
                    {getProjectKindLabel(project.kind)}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[12px] text-[var(--corexa-text-muted)]">
                  {project.rootPath}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 text-[13px] text-[var(--corexa-text-primary)]">
          <IconFolder className="h-4 w-4" />
          <span>{workspaceLabel}</span>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 rounded-[14px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-3 py-2.5 text-[var(--corexa-text-muted)]">
            <IconSearch className="h-3.5 w-3.5" />
            <input
              className="w-full bg-transparent text-[13px] text-[var(--corexa-text-primary)] outline-none placeholder:text-[var(--corexa-text-soft)]"
              onChange={(event) => {
                onSetThreadQuery(event.target.value);
              }}
              placeholder="Search chats"
              type="text"
              value={threadQuery}
            />
          </label>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-muted-bg)] px-3 py-2.5 text-[13px] text-[var(--corexa-text-primary)] transition hover:bg-[var(--corexa-muted-bg-strong)]"
            onClick={onCreateThread}
            type="button"
          >
            <IconAdd className="h-3.5 w-3.5" />
            <span>New chat</span>
          </button>
        </div>

        <div className="space-y-4">
          {pinnedThreads.length > 0 ? (
            <div className="space-y-1">
              <p className="px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--corexa-text-soft)]">
                Pinned
              </p>
              {pinnedThreads.map((thread) => (
                <div
                  className={`flex items-center gap-2 rounded-[14px] px-2 py-1 transition ${
                    activeThread?.id === thread.id ? "bg-[var(--corexa-muted-bg)]" : "hover:bg-[var(--corexa-muted-bg)]"
                  }`}
                  key={thread.id}
                >
                  <button
                    className="min-w-0 flex-1 text-left text-[var(--corexa-text-primary)]"
                    onClick={() => {
                      onSelectThread(thread.id);
                    }}
                    type="button"
                  >
                    <p className="truncate text-[13px] leading-5 text-[var(--corexa-text-primary)]">
                      {thread.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[var(--corexa-text-muted)]">
                      {formatRelativeTime(thread.updatedAt)}
                    </p>
                  </button>

                  <button
                    aria-label={`Unpin ${thread.title}`}
                    className="rounded-full p-1.5 text-[var(--corexa-text-muted)] transition hover:bg-[var(--corexa-main-bg)] hover:text-[var(--corexa-text-primary)]"
                    onClick={() => {
                      onToggleThreadPin(thread.id);
                    }}
                    type="button"
                  >
                    <IconPin className="h-3.5 w-3.5" filled />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="space-y-1">
            <p className="px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--corexa-text-soft)]">
              {pinnedThreads.length > 0 ? "Recent" : "Chats"}
            </p>

            {unpinnedThreads.map((thread) => (
              <div
                className={`flex items-center gap-2 rounded-[14px] px-2 py-1 transition ${
                  activeThread?.id === thread.id ? "bg-[var(--corexa-muted-bg)]" : "hover:bg-[var(--corexa-muted-bg)]"
                }`}
                key={thread.id}
              >
                <button
                  className="min-w-0 flex-1 text-left text-[var(--corexa-text-primary)]"
                  onClick={() => {
                    onSelectThread(thread.id);
                  }}
                  type="button"
                >
                  <p className="truncate text-[13px] leading-5 text-[var(--corexa-text-primary)]">
                    {thread.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[var(--corexa-text-muted)]">
                    {formatRelativeTime(thread.updatedAt)}
                  </p>
                </button>

                <button
                  aria-label={`Pin ${thread.title}`}
                  className="rounded-full p-1.5 text-[var(--corexa-text-soft)] transition hover:bg-[var(--corexa-main-bg)] hover:text-[var(--corexa-text-primary)]"
                  onClick={() => {
                    onToggleThreadPin(thread.id);
                  }}
                  type="button"
                >
                  <IconPin className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {matchingThreadCount === 0 ? (
              <div className="px-2 py-4 text-[12px] leading-5 text-[var(--corexa-text-soft)]">
                No chats match that search yet.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside className="flex min-h-0 flex-col bg-[var(--corexa-sidebar-bg)] px-5 py-5 text-[var(--corexa-text-primary)]">
      <div className="drag-region mb-8 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[15px] border border-[color:var(--corexa-border-subtle)] bg-white/90 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
            <img alt="Corexa logo" className="h-9 w-9 object-contain" src={BRAND_LOGO_SRC} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-[var(--corexa-text-primary)]">Corexa</p>
            <p className="truncate text-[11px] text-[var(--corexa-text-muted)]">
              AI Native Development Platform
            </p>
          </div>
        </div>

        <button
          className="no-drag rounded-full p-2 text-[var(--corexa-text-muted)] transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
          onClick={onRefresh}
          type="button"
        >
          <IconDots className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        <button
          className="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-[15px] text-[var(--corexa-text-primary)] transition hover:bg-[var(--corexa-muted-bg)]"
          onClick={onCreateThread}
          type="button"
        >
          <IconCompose className="h-4 w-4" />
          <span>New chat</span>
        </button>
        <button
          className="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-[15px] text-[var(--corexa-text-primary)] transition hover:bg-[var(--corexa-muted-bg)]"
          onClick={() => {
            onSetSidebarMode("automations");
          }}
          type="button"
        >
          <IconClock className="h-4 w-4" />
          <span>Automations</span>
        </button>
        <button
          className="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-[15px] text-[var(--corexa-text-primary)] transition hover:bg-[var(--corexa-muted-bg)]"
          onClick={() => {
            onSetSidebarMode("skills");
          }}
          type="button"
        >
          <IconCube className="h-4 w-4" />
          <span>Skills</span>
        </button>
      </div>

      <div className="mt-12 flex min-h-0 flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between px-2 text-[var(--corexa-text-muted)]">
          <p className="text-[15px]">{sidebarTitle}</p>

          <div className="flex items-center gap-2">
            <button
              className="rounded-full p-2 transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
              onClick={onCreateThread}
              type="button"
            >
              <IconAdd className="h-4 w-4" />
            </button>
            <button
              className="rounded-full p-2 transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
              onClick={onToggleThreadSort}
              type="button"
            >
              <IconFilter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">{renderSidebarContent()}</div>
      </div>

      <button
        className="mt-5 flex items-center gap-3 rounded-[14px] px-2.5 py-2 text-[15px] text-[var(--corexa-text-primary)] transition hover:bg-[var(--corexa-muted-bg)]"
        onClick={onOpenSettings}
        type="button"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--corexa-border-subtle)]">
          <IconSettings className="h-4 w-4" />
        </span>
        <span>Settings</span>
      </button>
    </aside>
  );
}
