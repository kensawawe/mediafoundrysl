"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const iconShared = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-white/90">
      <circle cx="12" cy="12" r="4.4" fill="currentColor" stroke="none" />
      <path
        d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8M18.6 18.6l-1.8-1.8M7.2 7.2 5.4 5.4"
        {...iconShared}
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-white/90">
      <path
        d="M20.2 14.8A8.6 8.6 0 1 1 9.2 3.8a6.9 6.9 0 0 0 11 11Z"
        fill="currentColor"
        stroke="none"
      />
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
      className={clsx(
        "focus-ring relative flex h-6 w-6 shrink-0 items-center justify-center border border-white/15",
        className,
      )}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.4) 100%)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {/* inset glass shading */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.35)",
        }}
      />

      {/* pulse glow on toggle */}
      <motion.span
        aria-hidden
        className="absolute inset-0"
        initial={false}
        animate={{
          boxShadow: isDark
            ? [
                "0 0 0px 0px rgba(36,81,214,0)",
                "0 0 8px 2px rgba(36,81,214,0.65)",
                "0 0 5px 1px rgba(36,81,214,0.5)",
              ]
            : [
                "0 0 0px 0px rgba(255,255,255,0)",
                "0 0 6px 1.5px rgba(255,255,255,0.5)",
                "0 0 4px 1px rgba(255,255,255,0.35)",
              ],
        }}
        transition={{ duration: 0.5, times: [0, 0.6, 1] }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
          transition={{ duration: 0.22 }}
          className="relative z-10 flex items-center justify-center"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
