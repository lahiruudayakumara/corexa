import { existsSync } from "node:fs";
import { join } from "node:path";
import { BrowserWindow, app, nativeImage } from "electron";
import { registerIpcHandlers } from "./ipc.js";
import { createMainWindow } from "./windows.js";

const COREXA_APP_ID = "com.corexa.desktop";
const COREXA_APP_NAME = "Corexa";

app.setName(COREXA_APP_NAME);
app.setAboutPanelOptions({
  applicationName: COREXA_APP_NAME,
});

if (process.platform === "win32") {
  app.setAppUserModelId(COREXA_APP_ID);
}

app.whenReady().then(() => {
  const appIconCandidates = [
    join(__dirname, "../../resources/icons/corexa.icns"),
    join(__dirname, "../../resources/icons/corexa-app-icon.png"),
    join(__dirname, "../../resources/icons/corexa.iconset/icon_512x512@2x.png"),
    join(__dirname, "../../resources/icons/corexa.iconset/icon_512x512.png"),
    join(__dirname, "../../resources/brand/corexa-mark.png"),
  ];
  const appIconPath = appIconCandidates.find((candidate) => existsSync(candidate));

  if (process.platform === "darwin" && appIconPath) {
    app.dock.setIcon(nativeImage.createFromPath(appIconPath));
  }

  registerIpcHandlers();
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
