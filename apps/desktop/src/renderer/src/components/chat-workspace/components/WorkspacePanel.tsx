import type { RefObject } from "react";
import type { WorkspaceDetails } from "@corexa/shared";
import {
  IconAdd,
  IconBranch,
  IconChevronDown,
  IconCube,
  IconDots,
  IconFolder,
  IconMic,
  IconPlay,
  IconSend,
  IconSpark,
  IconTerminal,
} from "../icons.js";
import type { ModelPreset, PermissionMode, ThreadRecord, ThreadView } from "../types.js";
import { WorkspaceMainView } from "./WorkspaceMainView.js";

type WorkspacePanelProps = {
  activeThread: ThreadRecord | null;
  activeView: ThreadView;
  branch: string;
  composer: string;
  composerRef: RefObject<HTMLTextAreaElement>;
  error: string | null;
  isRefreshing: boolean;
  languages: string;
  modelPreset: ModelPreset;
  permissionMode: PermissionMode;
  scrollRef: RefObject<HTMLDivElement>;
  workspaceDetails: WorkspaceDetails | null;
  workspaceLabel: string;
  workspacePath: string;
  onCreateThread: () => void;
  onCycleModelPreset: () => void;
  onCyclePermissionMode: () => void;
  onInjectPrompt: (prompt: string, activityDescription: string) => void;
  onPrimaryAction: () => void;
  onRefresh: () => void;
  onScrollToBottom: (behavior: ScrollBehavior) => void;
  onSend: () => void;
  onSetActiveView: (view: ThreadView) => void;
  onSetComposer: (value: string) => void;
};

export function WorkspacePanel({
  activeThread,
  activeView,
  branch,
  composer,
  composerRef,
  error,
  isRefreshing,
  languages,
  modelPreset,
  permissionMode,
  scrollRef,
  workspaceDetails,
  workspaceLabel,
  workspacePath,
  onCreateThread,
  onCycleModelPreset,
  onCyclePermissionMode,
  onInjectPrompt,
  onPrimaryAction,
  onRefresh,
  onScrollToBottom,
  onSend,
  onSetActiveView,
  onSetComposer,
}: WorkspacePanelProps) {
  const canSend = composer.trim().length > 0;

  return (
    <div className="relative flex min-h-0 flex-col border-l border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-main-bg)]">
      <header className="drag-region flex items-center justify-between px-8 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="truncate text-xs font-semibold tracking-tight text-[var(--corexa-text-primary)]">
            {activeThread?.title ?? "New chat"}
          </h1>
          <span className="truncate text-xs text-[var(--corexa-text-soft)]">{workspaceLabel}</span>
          <button
            className="no-drag rounded-full p-2 text-[var(--corexa-text-muted)] transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
            onClick={onRefresh}
            type="button"
          >
            <IconDots className="h-4 w-4" />
          </button>
        </div>

        <div className="no-drag flex items-center gap-3 text-[var(--corexa-text-primary)]">
          <button
            className="rounded-full p-2 transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
            onClick={onPrimaryAction}
            type="button"
          >
            <IconPlay className="h-4 w-4" />
          </button>

          <button
            className="flex items-center gap-3 rounded-full border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-composer-bg)] px-4 py-2.5 text-xs font-medium text-[var(--corexa-text-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:bg-[var(--corexa-muted-bg)]"
            onClick={() => {
              onSetActiveView("context");
            }}
            type="button"
          >
            <IconCube className="h-4 w-4" />
            <span>Open</span>
            <IconChevronDown className="h-4 w-4 text-[var(--corexa-text-soft)]" />
          </button>

          <button
            className="flex items-center gap-3 rounded-full border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-composer-bg)] px-4 py-2.5 text-xs font-medium text-[var(--corexa-text-soft)] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:bg-[var(--corexa-muted-bg)]"
            onClick={() => {
              onSetActiveView("changes");
            }}
            type="button"
          >
            <IconBranch className="h-4 w-4" />
            <span>Commit</span>
            <IconChevronDown className="h-4 w-4 text-[var(--corexa-text-soft)]" />
          </button>

          <div className="h-8 w-px bg-[var(--corexa-border-subtle)]" />

          <button
            className="rounded-[12px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-composer-bg)] p-2.5 transition hover:bg-[var(--corexa-muted-bg)]"
            onClick={() => {
              onSetActiveView("activity");
            }}
            type="button"
          >
            <IconTerminal className="h-4 w-4" />
          </button>
          <button
            className="rounded-[12px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-composer-bg)] p-2.5 transition hover:bg-[var(--corexa-muted-bg)]"
            onClick={onCreateThread}
            type="button"
          >
            <IconAdd className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-10 pb-[220px] pt-1" ref={scrollRef}>
          <div className="mx-auto max-w-[1180px]">
            <WorkspaceMainView
              activeThread={activeThread}
              activeView={activeView}
              branch={branch}
              languages={languages}
              onInjectPrompt={onInjectPrompt}
              workspaceDetails={workspaceDetails}
              workspacePath={workspacePath}
            />
          </div>
        </div>

        <button
          className="absolute bottom-[192px] left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-composer-bg)] text-[var(--corexa-text-primary)] shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition hover:bg-[var(--corexa-muted-bg)]"
          onClick={() => {
            onScrollToBottom("smooth");
          }}
          type="button"
        >
          <IconChevronDown className="h-4 w-4" />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-[160px] h-28 bg-gradient-to-t from-[var(--corexa-main-bg)] to-transparent" />

        <div className="absolute inset-x-0 bottom-12 px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="rounded-[22px] border border-[color:var(--corexa-border-subtle)] bg-[var(--corexa-composer-bg)] px-6 pb-4 pt-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <textarea
                className="min-h-[92px] w-full resize-none bg-transparent text-xs leading-[1.7] text-[var(--corexa-text-primary)] outline-none placeholder:text-[var(--corexa-text-soft)]"
                onChange={(event) => {
                  onSetComposer(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    onSend();
                  }
                }}
                placeholder="Ask for follow-up changes"
                ref={composerRef}
                value={composer}
              />

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    className="rounded-full p-2 text-[var(--corexa-text-muted)] transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
                    onClick={() => {
                      onSetActiveView("context");
                    }}
                    type="button"
                  >
                    <IconAdd className="h-4 w-4" />
                  </button>

                  <button
                    className="flex items-center gap-2 text-xs text-[var(--corexa-text-primary)]"
                    onClick={onCycleModelPreset}
                    type="button"
                  >
                    <span>{modelPreset}</span>
                    <IconChevronDown className="h-4 w-4 text-[var(--corexa-text-soft)]" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-full p-2 text-[var(--corexa-text-muted)] transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
                    onClick={() => {
                      onSetActiveView("activity");
                    }}
                    type="button"
                  >
                    <IconSpark className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-full p-2 text-[var(--corexa-text-muted)] transition hover:bg-[var(--corexa-muted-bg)] hover:text-[var(--corexa-text-primary)]"
                    onClick={onCyclePermissionMode}
                    type="button"
                  >
                    <IconMic className="h-4 w-4" />
                  </button>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--corexa-text-primary)] text-[var(--corexa-main-bg)] transition hover:opacity-90 disabled:bg-[var(--corexa-muted-bg)] disabled:text-[var(--corexa-text-soft)]"
                    disabled={!canSend}
                    onClick={onSend}
                    type="button"
                  >
                    <IconSend className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-4 px-8">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between text-xs text-[var(--corexa-text-muted)]">
            <button
              className="flex items-center gap-2 transition hover:text-[var(--corexa-text-primary)]"
              onClick={() => {
                onSetActiveView("context");
              }}
              type="button"
            >
              <IconFolder className="h-4 w-4" />
              <span>Local</span>
              <IconChevronDown className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              {error ? (
                <span className="rounded-full bg-[var(--corexa-muted-bg)] px-3 py-1 text-xs font-medium text-[var(--corexa-text-muted)]">
                  {error}
                </span>
              ) : null}
              {isRefreshing ? (
                <span className="rounded-full bg-[var(--corexa-muted-bg)] px-3 py-1 text-xs font-medium text-[var(--corexa-text-muted)]">
                  Syncing
                </span>
              ) : null}
              <span className="flex items-center gap-2">
                <IconBranch className="h-4 w-4" />
                <span>{branch}</span>
              </span>
              <span className="rounded-full bg-[var(--corexa-muted-bg)] px-3 py-1 text-xs font-medium text-[var(--corexa-text-muted)]">
                {permissionMode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
