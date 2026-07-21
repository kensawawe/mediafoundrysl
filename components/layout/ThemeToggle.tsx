"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "focus-ring relative flex h-6 w-11 items-center border border-current/30 px-0.5 transition-colors",
        className,
      )}
    >
      <span
        className={clsx(
          "h-4 w-4 bg-current transition-transform duration-300 ease-out",
          isDark ? "translate-x-[19px]" : "translate-x-0",
        )}
      />
    </button>
  );
}
