import type { WorkspaceDetails } from "@corexa/shared";
import { formatMessageTime, renderBodyBlocks, renderInlineContent } from "../helpers.js";
import type { ThreadRecord, ThreadView } from "../types.js";

type WorkspaceMainViewProps = {
  activeThread: ThreadRecord | null;
  activeView: ThreadView;
  branch: string;
  languages: string;
  workspaceDetails: WorkspaceDetails | null;
  workspacePath: string;
  onInjectPrompt: (prompt: string, activityDescription: string) => void;
};

export function WorkspaceMainView({
  activeThread,
  activeView,
  branch,
  languages,
  workspaceDetails,
  workspacePath,
  onInjectPrompt,
}: WorkspaceMainViewProps) {
  if (activeView === "context") {
    return (
      <div className="max-w-[980px] space-y-8">
        <p className="text-xs font-medium tracking-tight text-[var(--corexa-text-primary)]">
          Local workspace context
        </p>
        <div className="space-y-5">
          <p className="text-xs leading-[1.85] text-[var(--corexa-text-primary)]">
            {workspacePath}
          </p>
          <p className="text-xs leading-[1.85] text-[var(--corexa-text-primary)]">
            Languages: {languages}
          </p>
          <p className="text-xs leading-[1.85] text-[var(--corexa-text-primary)]">
            Branch: {branch}
          </p>
        </div>

        <div className="space-y-3">
          {(workspaceDetails?.topEntries ?? []).map((entry) => (
            <button
              className="flex w-full items-center justify-between rounded-[20px] bg-[var(--corexa-muted-bg)] px-4 py-3 text-left transition hover:bg-[var(--corexa-muted-bg-strong)]"
              key={entry.path}
              onClick={() => {
                onInjectPrompt(
                  `Inspect ${entry.path} and explain what matters there`,
                  `Selected ${entry.path} from context`,
                );
              }}
              type="button"
            >
              <span className="text-xs text-[var(--corexa-text-primary)]">{entry.path}</span>
              <span className="text-xs text-[var(--corexa-text-soft)]">{entry.kind}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activeView === "activity") {
    return (
      <div className="max-w-[980px] space-y-8">
        <p className="text-xs font-medium tracking-tight text-[var(--corexa-text-primary)]">
          Session activity
        </p>
        <div className="space-y-5">
          {(activeThread?.activity ?? []).map((item) => (
            <div className="space-y-1" key={item.id}>
              <p className="text-xs leading-[1.8] text-[var(--corexa-text-primary)]">
                {item.description}
              </p>
              <p className="text-xs text-[var(--corexa-text-soft)]">
                {formatMessageTime(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeView === "changes") {
    return (
      <div className="max-w-[980px] space-y-8">
        <p className="text-xs font-medium tracking-tight text-[var(--corexa-text-primary)]">
          Working tree
        </p>

        {workspaceDetails?.changedFiles.length ? (
          <div className="space-y-3">
            {workspaceDetails.changedFiles.map((path) => (
              <button
                className="flex w-full items-center justify-between rounded-[20px] bg-[var(--corexa-muted-bg)] px-4 py-3 text-left transition hover:bg-[var(--corexa-muted-bg-strong)]"
                key={path}
                onClick={() => {
                  onInjectPrompt(`Review the current changes in ${path}`, `Selected changed file ${path}`);
                }}
                type="button"
              >
                <span className="text-xs text-[var(--corexa-text-primary)]">{path}</span>
                <span className="text-xs text-[var(--corexa-text-soft)]">changed</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs leading-[1.85] text-[var(--corexa-text-primary)]">
            There are no local file changes right now. Start a task from the composer and I’ll keep
            the follow-up grounded in the current branch.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {activeThread?.messages.map((message) =>
        message.role === "user" ? (
          <div className="flex justify-end" key={message.id}>
            <div className="max-w-[700px] rounded-[18px] bg-[var(--corexa-user-bubble)] px-5 py-3 text-xs leading-[1.65] text-[var(--corexa-text-primary)]">
              {renderInlineContent(message.body)}
            </div>
          </div>
        ) : (
          <div className="max-w-[1020px] space-y-6" key={message.id}>
            {renderBodyBlocks(message.body, message.id)}
          </div>
        ),
      )}
    </div>
  );
}
