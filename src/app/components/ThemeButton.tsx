"use client";

import { Moon, Sun } from "lucide-react";
import React from "react";

export default function ThemeButton() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = React.useCallback(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
      setTheme("light");
    }
  }, [theme]);

  React.useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  return (
    <div
      className="p-2 bg-zinc-200 rounded dark:bg-zinc-800 cursor-pointer"
      onClick={() => toggleTheme()}
    >
      {theme === "dark" ? (
        <Sun width={16} height={16} className="text-zinc-700 dark:text-zinc-300" />
      ) : (
        <Moon width={16} height={16} className="text-zinc-700 dark:text-zinc-300" />
      )}
    </div>
  );
}
