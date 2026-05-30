import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("corexa", {
  runtime: {
    health: () => ipcRenderer.invoke("runtime:health"),
  },
  workspace: {
    pickFolder: () => ipcRenderer.invoke("workspace:pick-folder"),
    summary: () => ipcRenderer.invoke("workspace:summary"),
    details: () => ipcRenderer.invoke("workspace:details"),
  },
});
