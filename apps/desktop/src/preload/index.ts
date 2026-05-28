import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("corexa", {
  runtime: {
    health: () => ipcRenderer.invoke("runtime:health"),
  },
  workspace: {
    summary: () => ipcRenderer.invoke("workspace:summary"),
  },
});
