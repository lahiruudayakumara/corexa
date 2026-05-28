import { useEffect, useState } from "react";
import type { RuntimeHealth, WorkspaceSummary } from "@corexa/shared";
import { ChatWorkspace } from "./components/ChatWorkspace.js";
import { useTheme } from "./hooks/useTheme.js";

declare global {
  interface Window {
    corexa: {
      runtime: {
        health: () => Promise<RuntimeHealth>;
      };
      workspace: {
        summary: () => Promise<WorkspaceSummary>;
      };
    };
  }
}

export function App(): JSX.Element {
  const [health, setHealth] = useState<RuntimeHealth | null>(null);
  const [workspace, setWorkspace] = useState<WorkspaceSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!window.corexa) {
      setError("Corexa API not available");
      return;
    }

    void Promise.all([window.corexa.runtime.health(), window.corexa.workspace.summary()])
      .then(([nextHealth, nextWorkspace]) => {
        setHealth(nextHealth);
        setWorkspace(nextWorkspace);
      })
      .catch((err) => {
        console.error("Failed to load data:", err);
        setError(String(err));
      });
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#15304f_0%,#08111f_48%,#04070e_100%)] text-white">
    </main>
  );
}
