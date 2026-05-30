import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

function fail(message) {
  console.error("");
  console.error("[Corexa desktop] Electron runtime is not installed correctly.");
  console.error(message);
  console.error("");
  console.error("Repair steps:");
  console.error("1. pnpm --filter @corexa/desktop run repair:electron");
  console.error(
    "2. If that fails, ensure install scripts are enabled: pnpm config set ignore-scripts false",
  );
  console.error("3. Reinstall workspace dependencies: pnpm install");
  console.error("");
  process.exit(1);
}

let electronPackageDir;

try {
  electronPackageDir = path.dirname(require.resolve("electron/package.json"));
} catch {
  fail("The electron package could not be resolved from apps/desktop/node_modules.");
}

const pathFile = path.join(electronPackageDir, "path.txt");

if (!existsSync(pathFile)) {
  fail(
    "Electron package metadata exists, but the downloaded binary marker file path.txt is missing.",
  );
}

const executableRelativePath = readFileSync(pathFile, "utf8").trim();

if (!executableRelativePath) {
  fail("Electron path.txt is empty, so the runtime executable cannot be located.");
}

const executablePath = path.join(electronPackageDir, "dist", executableRelativePath);

if (!existsSync(executablePath)) {
  fail(`Electron expected a runtime executable at ${executablePath}, but it was not found.`);
}
