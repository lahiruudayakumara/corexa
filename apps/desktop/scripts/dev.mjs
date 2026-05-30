import { dirname, join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { prepareElectronShell } from "./prepare-electron-shell.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const electronViteCliPath = join(rootDir, "node_modules/electron-vite/dist/cli.mjs");

const env = { ...process.env };
const macExecutablePath = prepareElectronShell();

if (macExecutablePath) {
  env.ELECTRON_EXEC_PATH = macExecutablePath;
}

const child = spawn(process.execPath, [electronViteCliPath, "dev"], {
  cwd: rootDir,
  env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
