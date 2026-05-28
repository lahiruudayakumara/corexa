import { BrowserWindow } from "electron";
import { join } from "node:path";

export function createMainWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1560,
    height: 960,
    minWidth: 1200,
    minHeight: 800,
    backgroundColor: "#08111f",
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
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
