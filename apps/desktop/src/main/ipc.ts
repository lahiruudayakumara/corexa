import { execFile } from "node:child_process";
import { access, readdir } from "node:fs/promises";
import { basename, join } from "node:path";
import { promisify } from "node:util";
import { dialog, ipcMain } from "electron";
import type { RuntimeHealth, WorkspaceDetails, WorkspaceEntry, WorkspaceSummary } from "@corexa/shared";

const execFileAsync = promisify(execFile);
const workspaceRoot = process.cwd();

const runtimeHealth: RuntimeHealth = {
  status: "ready",
  provider: "corexa-runtime",
  version: "0.1.0",
  activeModel: "corexa-local",
};

function formatWorkspaceName(pathname: string): string {
  return basename(pathname)
    .split(/[-_]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

async function pathExists(pathname: string): Promise<boolean> {
  try {
    await access(pathname);
    return true;
  } catch {
    return false;
  }
}

async function runGit(args: string[]): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", args, { cwd: workspaceRoot });
    return stdout.trim();
  } catch {
    return "";
  }
}

async function detectLanguages(): Promise<string[]> {
  const knownChecks = await Promise.all([
    pathExists(join(workspaceRoot, "pnpm-workspace.yaml")),
    pathExists(join(workspaceRoot, "package.json")),
    pathExists(join(workspaceRoot, "runtime")),
    pathExists(join(workspaceRoot, "apps")),
    pathExists(join(workspaceRoot, "native")),
  ]);

  const languages = new Set<string>();

  if (knownChecks[0] || knownChecks[1] || knownChecks[3]) {
    languages.add("TypeScript");
  }

  if (knownChecks[2]) {
    languages.add("Go");
  }

  if (knownChecks[4]) {
    languages.add("Rust");
  }

  if (languages.size === 0) {
    const trackedFiles = await runGit(["ls-files"]);

    if (trackedFiles.includes(".ts") || trackedFiles.includes(".tsx")) {
      languages.add("TypeScript");
    }

    if (trackedFiles.includes(".go")) {
      languages.add("Go");
    }

    if (trackedFiles.includes(".rs")) {
      languages.add("Rust");
    }
  }

  return [...languages];
}

async function loadWorkspaceEntries(): Promise<WorkspaceEntry[]> {
  const entries = await readdir(workspaceRoot, { withFileTypes: true });

  return entries
    .filter((entry) => entry.name !== ".git" && entry.name !== "node_modules")
    .sort((left, right) => {
      if (left.isDirectory() !== right.isDirectory()) {
        return left.isDirectory() ? -1 : 1;
      }

      return left.name.localeCompare(right.name);
    })
    .slice(0, 14)
    .map((entry) => ({
      name: entry.name,
      path: entry.name,
      kind: entry.isDirectory() ? "directory" : "file",
    }));
}

async function loadWorkspaceDetails(): Promise<WorkspaceDetails> {
  const [branch, statusOutput, topEntries] = await Promise.all([
    runGit(["rev-parse", "--abbrev-ref", "HEAD"]),
    runGit(["status", "--short"]),
    loadWorkspaceEntries(),
  ]);

  const changedFiles = statusOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[A-Z?]{1,2}\s+/, ""))
    .map((line) => line.replace(/^.\s/, ""))
    .map((line) => line.replace(/->\s*/, ""))
    .map((line) => line.trim());

  return {
    branch: branch || "local",
    changedFiles,
    topEntries,
  };
}

async function loadWorkspaceSummary(): Promise<WorkspaceSummary> {
  const [languages, details] = await Promise.all([detectLanguages(), loadWorkspaceDetails()]);

  return {
    id: `workspace-${basename(workspaceRoot)}`,
    name: formatWorkspaceName(workspaceRoot),
    rootPath: workspaceRoot,
    languages,
    repositoryStatus: details.changedFiles.length > 0 ? "warm" : "cold",
  };
}

export function registerIpcHandlers(): void {
  ipcMain.handle("runtime:health", async () => runtimeHealth);
  ipcMain.handle("workspace:pick-folder", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
      title: "Choose a project folder",
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return result.filePaths[0] ?? null;
  });
  ipcMain.handle("workspace:summary", async () => loadWorkspaceSummary());
  ipcMain.handle("workspace:details", async () => loadWorkspaceDetails());
}
