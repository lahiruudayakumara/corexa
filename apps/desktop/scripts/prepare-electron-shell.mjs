import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const COREXA_APP_ID = "com.corexa.desktop";
const COREXA_APP_NAME = "Corexa";
const ELECTRON_EXECUTABLE_NAME = "Electron";
const SHELL_VERSION = 7;

const SOURCE_DIST_DIR = realpathSync(join(rootDir, "node_modules/electron/dist"));
const SOURCE_APP_DIR = join(SOURCE_DIST_DIR, "Electron.app");
const TARGET_DIST_DIR = join(rootDir, ".electron-shell");
const TARGET_APP_DIR = join(TARGET_DIST_DIR, `${COREXA_APP_NAME}.app`);
const TARGET_EXECUTABLE_PATH = join(TARGET_APP_DIR, "Contents/MacOS", ELECTRON_EXECUTABLE_NAME);
const TARGET_INFO_PLIST_PATH = join(TARGET_APP_DIR, "Contents/Info.plist");
const TARGET_ICON_PATH = join(TARGET_APP_DIR, "Contents/Resources/electron.icns");
const SOURCE_ICON_PATH = join(rootDir, "resources/icons/corexa.icns");
const SHELL_META_PATH = join(TARGET_DIST_DIR, ".corexa-shell-meta.json");
const TARGET_CODE_RESOURCES_PATH = join(TARGET_APP_DIR, "Contents/_CodeSignature/CodeResources");

function runOrThrow(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8", stdio: "pipe" });

  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status ?? "unknown"}\n${result.stderr || result.stdout}`,
    );
  }
}

function upsertPlistValue(plistPath, key, type, value) {
  const setResult = spawnSync(
    "/usr/libexec/PlistBuddy",
    ["-c", `Set :${key} ${value}`, plistPath],
    { encoding: "utf8", stdio: "pipe" },
  );

  if (setResult.status === 0) {
    return;
  }

  runOrThrow("/usr/libexec/PlistBuddy", ["-c", `Add :${key} ${type} ${value}`, plistPath]);
}

function signAppBundle(appPath) {
  const codesignArgs = ["--force", "--deep", "--sign", "-", appPath];
  const result = spawnSync("codesign", codesignArgs, {
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    throw new Error(
      `codesign ${codesignArgs.join(" ")} failed with exit code ${result.status ?? "unknown"}\n${
        result.stderr || result.stdout
      }`,
    );
  }
}

function getMetaSnapshot() {
  return {
    iconMtimeMs: existsSync(SOURCE_ICON_PATH) ? statSync(SOURCE_ICON_PATH).mtimeMs : 0,
    shellVersion: SHELL_VERSION,
    sourceInfoMtimeMs: existsSync(join(SOURCE_APP_DIR, "Contents/Info.plist"))
      ? statSync(join(SOURCE_APP_DIR, "Contents/Info.plist")).mtimeMs
      : 0,
  };
}

function readCurrentMeta() {
  if (!existsSync(SHELL_META_PATH)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(SHELL_META_PATH, "utf8"));
  } catch {
    return null;
  }
}

export function prepareElectronShell() {
  if (process.platform !== "darwin") {
    return null;
  }

  if (!existsSync(SOURCE_APP_DIR)) {
    throw new Error(`Electron.app not found at ${SOURCE_APP_DIR}`);
  }

  const nextMeta = getMetaSnapshot();
  const currentMeta = readCurrentMeta();
  const shellUpToDate =
    existsSync(TARGET_EXECUTABLE_PATH) &&
    existsSync(TARGET_INFO_PLIST_PATH) &&
    existsSync(TARGET_ICON_PATH) &&
    existsSync(TARGET_CODE_RESOURCES_PATH) &&
    JSON.stringify(currentMeta) === JSON.stringify(nextMeta);

  if (!shellUpToDate) {
    rmSync(TARGET_DIST_DIR, { force: true, recursive: true });
    mkdirSync(TARGET_DIST_DIR, { recursive: true });
    runOrThrow("ditto", [SOURCE_APP_DIR, TARGET_APP_DIR]);

    upsertPlistValue(TARGET_INFO_PLIST_PATH, "CFBundleDisplayName", "string", COREXA_APP_NAME);
    upsertPlistValue(
      TARGET_INFO_PLIST_PATH,
      "CFBundleExecutable",
      "string",
      ELECTRON_EXECUTABLE_NAME,
    );
    upsertPlistValue(TARGET_INFO_PLIST_PATH, "CFBundleIdentifier", "string", COREXA_APP_ID);
    upsertPlistValue(TARGET_INFO_PLIST_PATH, "CFBundleName", "string", COREXA_APP_NAME);

    if (existsSync(SOURCE_ICON_PATH)) {
      copyFileSync(SOURCE_ICON_PATH, TARGET_ICON_PATH);
    }

    signAppBundle(TARGET_APP_DIR);

    writeFileSync(SHELL_META_PATH, `${JSON.stringify(nextMeta, null, 2)}\n`);
  }

  return TARGET_EXECUTABLE_PATH;
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const executablePath = prepareElectronShell();

  if (executablePath) {
    console.log(executablePath);
  }
}
