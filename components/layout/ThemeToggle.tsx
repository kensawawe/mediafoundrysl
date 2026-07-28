"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import clsx from "clsx";

const iconShared = {
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

function SunGlyph({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={clsx(
        "h-3 w-3 shrink-0 transition-opacity duration-300",
        active ? "opacity-90" : "opacity-30",
      )}
    >
      <circle cx="6" cy="6" r="2.1" {...iconShared} />
      <path
        d="M6 0.6v1.3M6 10.1v1.3M11.4 6h-1.3M1.9 6H0.6M9.7 2.3l-0.9 0.9M3.2 8.8l-0.9 0.9M9.7 9.7l-0.9-0.9M3.2 3.2l-0.9-0.9"
        {...iconShared}
      />
    </svg>
  );
}

function MoonGlyph({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={clsx(
        "h-3 w-3 shrink-0 transition-opacity duration-300",
        active ? "opacity-90" : "opacity-30",
      )}
    >
      <path d="M9.7 8.2A4.5 4.5 0 1 1 5.3 1.6 3.5 3.5 0 0 0 9.7 8.2Z" {...iconShared} />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx("focus-ring inline-flex shrink-0 items-center gap-1.5", className)}
    >
      <SunGlyph active={!isDark} />

      {/* switch plate */}
      <span className="relative block h-6 w-9 border border-current/35 bg-current/[0.05]">
        {/* mounting rivets */}
        <span aria-hidden className="absolute left-[2px] top-[2px] h-[2px] w-[2px] bg-brass/70" />
        <span aria-hidden className="absolute bottom-[2px] right-[2px] h-[2px] w-[2px] bg-brass/70" />

        {/* rocker paddle */}
        <motion.span
          aria-hidden
          className={clsx(
            "absolute top-[4px] h-4 w-4 border",
            isDark
              ? "border-accent-fill bg-accent-fill shadow-[0_0_6px_1px_rgba(36,81,214,0.55)]"
              : "border-current/50 bg-current",
          )}
          initial={false}
          animate={{ left: isDark ? 17 : 2, rotate: isDark ? [0, 12, 0] : [0, -12, 0] }}
          transition={{
            left: { type: "spring", stiffness: 480, damping: 22 },
            rotate: { duration: 0.32, ease: "easeOut" },
          }}
        />
      </span>

      <MoonGlyph active={isDark} />
    </button>
  );
}
