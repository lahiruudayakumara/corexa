import { useEffect, useState } from "react";

type Theme = "system" | "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      root.removeAttribute("data-theme");
      root.style.colorScheme = "light dark";
    } else {
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
    }
  }, [theme]);

  return { theme, setTheme };
}
