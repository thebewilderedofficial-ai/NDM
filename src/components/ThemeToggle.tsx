import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl border transition-all duration-200 ${
        isDark
          ? "bg-zinc-900/90 border-zinc-800 text-amber-300 hover:text-amber-200 hover:bg-zinc-800 hover:border-zinc-700 shadow-sm"
          : "bg-gradient-to-r from-indigo-50 to-sky-50 border-indigo-200/80 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 shadow-[0_2px_8px_rgba(99,102,241,0.12)]"
      } ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="ml-2 text-xs font-semibold font-display">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
