import type { RuntimeHealth, WorkspaceDetails, WorkspaceSummary } from "@corexa/shared";
import { useCallback, useEffect, useState } from "react";
import { ChatWorkspace } from "./components/ChatWorkspace.js";

declare global {
  interface Window {
    corexa: {
      runtime: {
        health: () => Promise<RuntimeHealth>;
      };
      workspace: {
        details: () => Promise<WorkspaceDetails>;
        pickFolder: () => Promise<string | null>;
        summary: () => Promise<WorkspaceSummary>;
      };
    };
  }
}

const previewHealth: RuntimeHealth = {
  status: "ready",
  provider: "corexa-runtime",
  version: "0.1.0",
  activeModel: "corexa-local",
};

const previewWorkspace: WorkspaceSummary = {
  id: "workspace-preview",
  languages: ["TypeScript", "Go", "Rust"],
  name: "Corexa",
  repositoryStatus: "warm",
  rootPath: "Local workspace",
};

const previewDetails: WorkspaceDetails = {
  branch: "main",
  changedFiles: [],
  topEntries: [
    { kind: "directory", name: "apps", path: "apps" },
    { kind: "directory", name: "packages", path: "packages" },
    { kind: "directory", name: "runtime", path: "runtime" },
    { kind: "directory", name: "docs", path: "docs" },
  ],
};

export function App(): JSX.Element {
  const [health, setHealth] = useState<RuntimeHealth | null>(null);
  const [details, setDetails] = useState<WorkspaceDetails | null>(null);
  const [workspace, setWorkspace] = useState<WorkspaceSummary | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDesktopState = useCallback(async (): Promise<void> => {
    if (!window.corexa) {
      setHealth(previewHealth);
      setWorkspace(previewWorkspace);
      setDetails(previewDetails);
      setError("Preview mode");
      return;
    }

    setIsRefreshing(true);

    try {
      const [nextHealth, nextWorkspace, nextDetails] = await Promise.all([
        window.corexa.runtime.health(),
        window.corexa.workspace.summary(),
        window.corexa.workspace.details(),
      ]);

      setHealth(nextHealth);
      setWorkspace(nextWorkspace);
      setDetails(nextDetails);
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to load Corexa workspace state:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDesktopState();
  }, [loadDesktopState]);

  return (
    <main className="h-screen overflow-hidden bg-transparent text-slate-900">
      <div className="h-full">
        <ChatWorkspace
          details={details}
          error={error}
          isRefreshing={isRefreshing}
          onRefresh={() => {
            void loadDesktopState();
          }}
          runtime={health}
          workspace={workspace}
        />
      </div>
    </main>
  );
}
