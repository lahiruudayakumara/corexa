import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: "src/main/main.ts",
      },
      outDir: "dist/main",
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: "src/preload/index.ts",
      },
      outDir: "dist/preload",
    },
  },
  renderer: {
    root: "src/renderer",
    server: {
      host: "127.0.0.1",
      port: 5173,
      strictPort: true,
    },
    resolve: {
      alias: {
        "@renderer": resolve(__dirname, "src/renderer/src"),
      },
    },
    plugins: [react(), tailwindcss()],
  },
});
