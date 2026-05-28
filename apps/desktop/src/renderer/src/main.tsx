import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";
import "./styles.css";

// Initialize theme on app startup
(function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme") as "system" | "dark" | "light" | null;
  const theme = stored || "system";

  if (theme === "system") {
    root.removeAttribute("data-theme");
    root.style.colorScheme = "light dark";
  } else {
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  }
})();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
