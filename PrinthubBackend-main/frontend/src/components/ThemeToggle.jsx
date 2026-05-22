import { Moon, SunMedium } from "lucide-react";
import { useAppState } from "../hooks/useAppState";

function ThemeToggle() {
  const { theme, toggleTheme } = useAppState();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 transition hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;
