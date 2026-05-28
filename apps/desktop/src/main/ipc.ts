import { ipcMain } from "electron";
import type { RuntimeHealth, WorkspaceSummary } from "@corexa/shared";

const runtimeHealth: RuntimeHealth = {
  status: "starting",
  provider: "corexa-runtime",
  version: "0.1.0",
  activeModel: "corexa-code-fast",
};

const workspaceSummary: WorkspaceSummary = {
  id: "workspace-local",
  name: "Corexa Workspace",
  rootPath: process.cwd(),
  languages: ["TypeScript", "Go", "Rust"],
  repositoryStatus: "cold",
};

export function registerIpcHandlers(): void {
  ipcMain.handle("runtime:health", async () => runtimeHealth);
  ipcMain.handle("workspace:summary", async () => workspaceSummary);
}
