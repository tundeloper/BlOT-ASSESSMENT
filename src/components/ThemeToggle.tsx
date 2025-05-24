'use client';

import { useTheme } from "@/context/ThemeContext";


export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}
