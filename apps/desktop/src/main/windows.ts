import { BrowserWindow } from "electron";
import { existsSync } from "node:fs";
import { join } from "node:path";

export function createMainWindow(): BrowserWindow {
  const isMac = process.platform === "darwin";
  const iconCandidates = [
    process.platform === "win32"
      ? join(__dirname, "../../resources/icons/corexa.ico")
      : join(__dirname, "../../resources/icons/corexa-app-icon.png"),
    join(__dirname, "../../resources/icons/corexa-app-icon.png"),
    join(__dirname, "../../resources/brand/corexa-mark.png"),
  ];
  const windowIconPath = iconCandidates.find((candidate) => existsSync(candidate));

  const window = new BrowserWindow({
    width: 1560,
    height: 960,
    minWidth: 1200,
    minHeight: 800,
    backgroundColor: "#f6f4ef",
    frame: isMac,
    icon: windowIconPath,
    title: "Corexa",
    titleBarStyle: "hidden",
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: true,
    },
  });

  const rendererUrl = process.env.ELECTRON_RENDERER_URL;

  if (rendererUrl) {
    void window.loadURL(rendererUrl);
  } else {
    void window.loadFile(join(__dirname, "../renderer/index.html"));
  }

  return window;
}
