"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

const subscribeNoop = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "focus-ring relative flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-colors hover:border-accent-blue hover:text-foreground",
        className,
      )}
    >
      {mounted && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="transition-transform duration-300"
        >
          {isDark ? (
            <path
              d="M21 12.6A9 9 0 1 1 11.4 3a7 7 0 0 0 9.6 9.6Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          ) : (
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </g>
          )}
        </svg>
      )}
    </button>
  );
}
