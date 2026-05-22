import { useEffect, useState } from "react";

export function useDarkMode() {
  const [theme, setTheme] = useState(() => localStorage.getItem("pdh_theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("pdh_theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark"))
  };
}
