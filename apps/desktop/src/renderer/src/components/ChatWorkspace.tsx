import { useEffect, useRef, useState } from "react";
import {
  LIVE_PROJECT_ID,
  LEGACY_THREAD_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  WORKSPACE_STORAGE_KEY,
  defaultSettings,
  modelPresets,
} from "./chat-workspace/constants.js";
import {
  buildAssistantMessage,
  createExistingFolderProjectRecord,
  createId,
  createScratchProjectRecord,
  createThreadRecord,
  createWorkspaceProjectRecord,
  extractWorkspaceLabel,
  getThemeStyles,
  humanizeEntryList,
  projectToWorkspaceDetails,
  projectToWorkspaceSummary,
} from "./chat-workspace/helpers.js";
import { WorkspacePanel } from "./chat-workspace/components/WorkspacePanel.js";
import { SettingsModal } from "./chat-workspace/components/SettingsModal.js";
import { WorkspaceSidebar } from "./chat-workspace/components/WorkspaceSidebar.js";
import { DesktopShellLayout } from "./chat-workspace/layouts/DesktopShellLayout.js";
import type {
  ChatWorkspaceProps,
  DesktopSettings,
  ModelPreset,
  PermissionMode,
  ProjectRecord,
  ResolvedTheme,
  SettingsSection,
  SidebarMode,
  ThreadRecord,
  ThreadView,
  ThreadSort,
} from "./chat-workspace/types.js";

export function ChatWorkspace({
  details,
  error,
  isRefreshing,
  onRefresh,
  runtime,
  workspace,
}: ChatWorkspaceProps) {
  const liveWorkspaceName = workspace?.name ?? "Corexa";
  const liveWorkspacePath = workspace?.rootPath ?? "Local workspace";
  const liveWorkspaceLabel = extractWorkspaceLabel(liveWorkspacePath, liveWorkspaceName);
  const liveLanguages = workspace?.languages.join(", ") ?? "TypeScript, Go, Rust";
  const liveBranch = details?.branch ?? "main";

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeSettingsSection, setActiveSettingsSection] = useState<SettingsSection>("general");
  const [activeView, setActiveView] = useState<ThreadView>("thread");
  const [composer, setComposer] = useState("");
  const [didHydrate, setDidHydrate] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [modelPreset, setModelPreset] = useState<ModelPreset>("Corexa Medium");
  const [permissionMode, setPermissionMode] = useState<PermissionMode>("Ask first");
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [settings, setSettings] = useState<DesktopSettings>(defaultSettings);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("threads");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");
  const [threadQuery, setThreadQuery] = useState("");
  const [threadSort, setThreadSort] = useState<ThreadSort>("recent");
  const [threads, setThreads] = useState<ThreadRecord[]>([]);

  const composerRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORKSPACE_STORAGE_KEY);
      const settingsRaw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

      if (settingsRaw) {
        setSettings({
          ...defaultSettings,
          ...(JSON.parse(settingsRaw) as Partial<DesktopSettings>),
        });
      }

      if (raw) {
        const saved = JSON.parse(raw) as {
          activeProjectId: string | null;
          activeThreadId: string | null;
          projects: ProjectRecord[];
          threads: ThreadRecord[];
        };

        const savedThreads = (saved.threads ?? []).map((thread) => ({
          ...thread,
          pinned: thread.pinned ?? false,
          projectId: thread.projectId ?? LIVE_PROJECT_ID,
        }));

        setProjects(saved.projects ?? []);
        setThreads(savedThreads);
        setActiveProjectId(saved.activeProjectId ?? null);
        setActiveThreadId(saved.activeThreadId ?? savedThreads[0]?.id ?? null);
      } else {
        const legacyRaw = window.localStorage.getItem(LEGACY_THREAD_STORAGE_KEY);

        if (legacyRaw) {
          const saved = JSON.parse(legacyRaw) as {
            activeThreadId: string | null;
            threads: Array<Omit<ThreadRecord, "projectId">>;
          };

          const legacyThreads = (saved.threads ?? []).map((thread) => ({
            ...thread,
            pinned: thread.pinned ?? false,
            projectId: LIVE_PROJECT_ID,
          }));

          setThreads(legacyThreads);
          setActiveThreadId(saved.activeThreadId ?? legacyThreads[0]?.id ?? null);
        }
      }
    } catch (storageError) {
      console.error("Failed to restore Corexa workspace state:", storageError);
    } finally {
      setDidHydrate(true);
    }
  }, []);

  useEffect(() => {
    if (!didHydrate) {
      return;
    }

    const liveProject = createWorkspaceProjectRecord(workspace, details);

    setProjects((currentProjects) => {
      const existingProject = currentProjects.find((project) => project.id === LIVE_PROJECT_ID);

      if (!existingProject) {
        return [liveProject, ...currentProjects];
      }

      return currentProjects.map((project) => (project.id === LIVE_PROJECT_ID ? liveProject : project));
    });

    setActiveProjectId((currentProjectId) => currentProjectId ?? LIVE_PROJECT_ID);
  }, [details, didHydrate, workspace]);

  useEffect(() => {
    if (!didHydrate) {
      return;
    }

    window.localStorage.setItem(
      WORKSPACE_STORAGE_KEY,
      JSON.stringify({
        activeProjectId,
        activeThreadId,
        projects,
        threads,
      }),
    );
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [activeProjectId, activeThreadId, didHydrate, projects, settings, threads]);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = (matches: boolean): void => {
      setSystemTheme(matches ? "dark" : "light");
    };

    applySystemTheme(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent): void => {
      applySystemTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0] ?? null;
  const activeWorkspaceSummary = activeProject ? projectToWorkspaceSummary(activeProject) : workspace;
  const activeWorkspaceDetails = activeProject ? projectToWorkspaceDetails(activeProject) : details;
  const workspaceName = activeWorkspaceSummary?.name ?? liveWorkspaceName;
  const workspacePath = activeWorkspaceSummary?.rootPath ?? liveWorkspacePath;
  const workspaceLabel = extractWorkspaceLabel(workspacePath, workspaceName);
  const languages = activeWorkspaceSummary?.languages.join(", ") ?? liveLanguages;
  const branch = activeWorkspaceDetails?.branch ?? liveBranch;
  const resolvedTheme: ResolvedTheme =
    settings.themePreference === "system" ? systemTheme : settings.themePreference;
  const themeStyles = getThemeStyles(resolvedTheme);

  useEffect(() => {
    document.documentElement.style.backgroundColor = resolvedTheme === "dark" ? "#0f1216" : "#f6f4ef";
    document.body.style.backgroundColor = resolvedTheme === "dark" ? "#0f1216" : "#f6f4ef";
  }, [resolvedTheme]);

  useEffect(() => {
    if (!settings.autoRefreshWorkspace || !window.corexa) {
      return;
    }

    const intervalId = window.setInterval(() => {
      onRefresh();
    }, 45_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [onRefresh, settings.autoRefreshWorkspace]);

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    if (!didHydrate || !activeProjectId) {
      return;
    }

    const projectThreads = threads.filter((thread) => thread.projectId === activeProjectId);

    if (projectThreads.length === 0) {
      const initialThread = createThreadRecord(activeProjectId, activeWorkspaceSummary, activeWorkspaceDetails);
      setThreads((currentThreads) => [initialThread, ...currentThreads]);
      setActiveThreadId(initialThread.id);
      return;
    }

    if (!projectThreads.some((thread) => thread.id === activeThreadId)) {
      const nextThread = [...projectThreads].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))[0];
      setActiveThreadId(nextThread?.id ?? null);
    }
  }, [activeProjectId, activeThreadId, activeWorkspaceDetails, activeWorkspaceSummary, didHydrate, threads]);

  useEffect(() => {
    if (activeView !== "thread") {
      return;
    }

    window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ behavior: "auto", top: scrollRef.current.scrollHeight });
    });
  }, [activeThreadId, activeView, threads.length]);

  const orderedThreads = [...threads].sort((left, right) => {
    if ((left.pinned ?? false) !== (right.pinned ?? false)) {
      return left.pinned ? -1 : 1;
    }

    if (threadSort === "title") {
      return left.title.localeCompare(right.title);
    }

    return right.updatedAt.localeCompare(left.updatedAt);
  });

  const projectThreads = orderedThreads.filter((thread) => thread.projectId === activeProjectId);
  const activeThread =
    projectThreads.find((thread) => thread.id === activeThreadId) ?? projectThreads[0] ?? null;
  const normalizedThreadQuery = threadQuery.trim().toLowerCase();
  const matchingThreads = projectThreads.filter((thread) => {
    if (!normalizedThreadQuery) {
      return true;
    }

    return thread.title.toLowerCase().includes(normalizedThreadQuery);
  });
  const pinnedThreads = matchingThreads.filter((thread) => thread.pinned);
  const unpinnedThreads = matchingThreads.filter((thread) => !thread.pinned);

  const automationItems = [
    {
      description:
        details?.changedFiles.length && details.changedFiles[0]
          ? `Start with ${details.changedFiles[0]}`
          : "Start from the current working tree",
      prompt:
        details?.changedFiles.length && details.changedFiles[0]
          ? `Review the local changes in ${details.changedFiles[0]} and identify the safest next step`
          : "Review the local working tree and identify the safest next step",
      title: "Review working tree",
    },
    {
      description: `Ground the answer in ${humanizeEntryList(details?.topEntries ?? [])}`,
      prompt: `Explain how ${workspaceName} is structured and what matters first`,
      title: "Summarize architecture",
    },
    {
      description: `Stay aligned with ${branch}`,
      prompt: `Plan the next local engineering task for ${workspaceName} on ${branch}`,
      title: "Plan next task",
    },
  ];

  const skillItems = [
    {
      description: "Inspect folders and point to the right implementation surface",
      prompt: `Inspect ${workspaceLabel} and suggest the most relevant place to start`,
      title: "Repository scan",
    },
    {
      description: `Explain the current workspace using ${languages}`,
      prompt: `Explain the architecture of ${workspaceName} in practical terms`,
      title: "Architecture explain",
    },
    {
      description: "Summarize risks, regressions, and missing validation",
      prompt: "Review the current UI flow and call out the biggest risks",
      title: "Change review",
    },
  ];

  function updateThread(threadId: string, updater: (thread: ThreadRecord) => ThreadRecord): void {
    setThreads((currentThreads) =>
      currentThreads.map((thread) => (thread.id === threadId ? updater(thread) : thread)),
    );
  }

  function focusComposer(): void {
    window.requestAnimationFrame(() => {
      composerRef.current?.focus();
    });
  }

  function toggleThreadPin(threadId: string): void {
    setThreads((currentThreads) =>
      currentThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              pinned: !thread.pinned,
            }
          : thread,
      ),
    );
  }

  function updateSettingsField<Key extends keyof DesktopSettings>(
    key: Key,
    value: DesktopSettings[Key],
  ): void {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  }

  function activateProject(projectId: string): void {
    setActiveProjectId(projectId);
    setActiveView("thread");
    setSidebarMode("threads");
    setThreadQuery("");
    setIsProjectMenuOpen(false);
  }

  function handleCreateScratchProject(): void {
    const scratchCount = projects.filter((project) => project.kind === "scratch").length;
    const nextProject = createScratchProjectRecord(scratchCount, workspace?.languages ?? []);

    setProjects((currentProjects) => [nextProject, ...currentProjects]);
    activateProject(nextProject.id);
    setComposer("");
  }

  function openSettings(section: SettingsSection = "general"): void {
    setActiveSettingsSection(section);
    setIsProjectMenuOpen(false);
    setIsSettingsOpen(true);
  }

  async function handleCreateExistingFolderProject(): Promise<void> {
    let nextPath: string | null = null;

    if (window.corexa?.workspace?.pickFolder) {
      nextPath = await window.corexa.workspace.pickFolder();
    } else {
      const folderCount = projects.filter((project) => project.kind === "existing-folder").length + 1;
      nextPath = `/Users/demo/existing-folder-${folderCount}`;
    }

    if (!nextPath) {
      setIsProjectMenuOpen(false);
      return;
    }

    const existingProject = projects.find((project) => project.rootPath === nextPath);

    if (existingProject) {
      activateProject(existingProject.id);
      return;
    }

    const nextProject = createExistingFolderProjectRecord(nextPath, workspace?.languages ?? []);
    setProjects((currentProjects) => [nextProject, ...currentProjects]);
    activateProject(nextProject.id);
    setComposer("");
  }

  function scrollConversationToBottom(behavior: ScrollBehavior): void {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTo({
      behavior,
      top: scrollRef.current.scrollHeight,
    });
  }

  function injectPrompt(nextPrompt: string, activityDescription: string): void {
    setComposer(nextPrompt);
    setActiveView("thread");
    setSidebarMode("threads");

    if (activeThreadId) {
      updateThread(activeThreadId, (thread) => ({
        ...thread,
        activity: [
          {
            createdAt: new Date().toISOString(),
            description: activityDescription,
            id: createId("activity"),
          },
          ...thread.activity,
        ],
      }));
    }

    focusComposer();
  }

  function handleCreateThread(): void {
    const nextThread = createThreadRecord(
      activeProjectId ?? LIVE_PROJECT_ID,
      activeWorkspaceSummary,
      activeWorkspaceDetails,
    );
    setThreads((currentThreads) => [nextThread, ...currentThreads]);
    setActiveThreadId(nextThread.id);
    setActiveView("thread");
    setSidebarMode("threads");
    setComposer("");
    focusComposer();
  }

  function handleSend(): void {
    const prompt = composer.trim();

    if (!prompt || !activeThread) {
      return;
    }

    const now = new Date().toISOString();
    const userMessage = {
      body: prompt,
      createdAt: now,
      id: createId("message"),
      label: "You",
      role: "user" as const,
      title: "Task request",
    };

    const assistantMessage = buildAssistantMessage(prompt, activeWorkspaceSummary, activeWorkspaceDetails);
    const nextTitle =
      activeThread.messages.length <= 1 ? prompt.replace(/\s+/g, " ").slice(0, 64) : activeThread.title;

    updateThread(activeThread.id, (thread) => ({
      ...thread,
      activity: [
        {
          createdAt: now,
          description: `Queued task: ${prompt.slice(0, 72)}`,
          id: createId("activity"),
        },
        ...thread.activity,
      ],
      messages: [...thread.messages, userMessage, assistantMessage],
      title: nextTitle || thread.title,
      updatedAt: now,
    }));

    setComposer("");
    setActiveView("thread");
    window.requestAnimationFrame(() => {
      scrollConversationToBottom("smooth");
    });
  }

  function cycleModelPreset(): void {
    const currentIndex = modelPresets.indexOf(modelPreset);
    const nextIndex = (currentIndex + 1) % modelPresets.length;
    setModelPreset(modelPresets[nextIndex] ?? "Corexa Medium");
  }

  function cyclePermissionMode(): void {
    setPermissionMode((currentMode) => {
      if (currentMode === "Auto") {
        return "Ask first";
      }

      if (currentMode === "Ask first") {
        return "Read-only";
      }

      return "Auto";
    });
  }

  function handlePrimaryAction(): void {
    if (composer.trim().length > 0) {
      handleSend();
      return;
    }

    setActiveView("thread");
    scrollConversationToBottom("smooth");
  }

  function handleSelectThread(threadId: string): void {
    setActiveThreadId(threadId);
    setActiveView("thread");
  }

  return (
    <section className="h-full overflow-hidden bg-[var(--corexa-app-bg)]" style={themeStyles}>
      <DesktopShellLayout
        isCompactSidebar={settings.compactSidebar}
        panel={
          <WorkspacePanel
            activeThread={activeThread}
            activeView={activeView}
            branch={branch}
            composer={composer}
            composerRef={composerRef}
            error={error}
            isRefreshing={isRefreshing}
            languages={languages}
            modelPreset={modelPreset}
            onCreateThread={handleCreateThread}
            onCycleModelPreset={cycleModelPreset}
            onCyclePermissionMode={cyclePermissionMode}
            onInjectPrompt={injectPrompt}
            onPrimaryAction={handlePrimaryAction}
            onRefresh={onRefresh}
            onScrollToBottom={scrollConversationToBottom}
            onSend={handleSend}
            onSetActiveView={setActiveView}
            onSetComposer={setComposer}
            permissionMode={permissionMode}
            scrollRef={scrollRef}
            workspaceDetails={activeWorkspaceDetails}
            workspaceLabel={workspaceLabel}
            workspacePath={workspacePath}
          />
        }
        sidebar={
          <WorkspaceSidebar
            activeProject={activeProject}
            activeThread={activeThread}
            automationItems={automationItems}
            isProjectMenuOpen={isProjectMenuOpen}
            onActivateProject={activateProject}
            onCreateExistingFolderProject={handleCreateExistingFolderProject}
            onCreateScratchProject={handleCreateScratchProject}
            onCreateThread={handleCreateThread}
            onInjectPrompt={injectPrompt}
            onOpenSettings={() => {
              openSettings("general");
            }}
            onRefresh={onRefresh}
            onSelectThread={handleSelectThread}
            onSetProjectMenuOpen={setIsProjectMenuOpen}
            onSetSidebarMode={(mode) => {
              setSidebarMode(mode);
              setActiveView(mode === "automations" ? "activity" : "thread");
            }}
            onSetThreadQuery={setThreadQuery}
            onToggleThreadPin={toggleThreadPin}
            onToggleThreadSort={() => {
              setThreadSort((currentSort) => (currentSort === "recent" ? "title" : "recent"));
            }}
            pinnedThreads={pinnedThreads}
            projects={projects}
            sidebarMode={sidebarMode}
            skillItems={skillItems}
            threadQuery={threadQuery}
            unpinnedThreads={unpinnedThreads}
            workspaceLabel={workspaceLabel || liveWorkspaceLabel}
          />
        }
      />

      <SettingsModal
        activeSection={activeSettingsSection}
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
        }}
        onSectionChange={setActiveSettingsSection}
        onUpdateSetting={updateSettingsField}
        resolvedTheme={resolvedTheme}
        runtime={runtime}
        settings={settings}
      />
    </section>
  );
}
