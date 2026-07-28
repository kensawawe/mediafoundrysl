"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const TRACK_W = 92;
const TRACK_H = 30;
const ORB = 38;

const iconShared = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink/70">
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
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink/70">
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
      className={clsx("focus-ring relative shrink-0 rounded-full", className)}
      style={{ width: TRACK_W, height: TRACK_H }}
    >
      {/* glass track */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-white/10"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.4))",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -2px 4px rgba(0,0,0,0.4)",
        }}
      />

      {/* label */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "dark" : "light"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={clsx(
              "absolute top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75",
              isDark ? "left-3" : "right-3",
            )}
          >
            {isDark ? "Dark" : "Light"}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* glass orb thumb */}
      <motion.span
        aria-hidden
        className="absolute top-1/2 z-10 flex items-center justify-center rounded-full"
        style={{
          width: ORB,
          height: ORB,
          marginTop: -ORB / 2,
          background:
            "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 38%, rgba(255,255,255,0.12) 100%)",
        }}
        initial={false}
        animate={{
          left: isDark ? TRACK_W - ORB + 4 : -4,
          boxShadow: isDark
            ? [
                "0 0 0px 0px rgba(36,81,214,0)",
                "0 0 18px 4px rgba(36,81,214,0.65)",
                "0 0 14px 3px rgba(36,81,214,0.55)",
              ]
            : [
                "0 0 0px 0px rgba(255,255,255,0)",
                "0 0 14px 3px rgba(255,255,255,0.5)",
                "0 0 10px 2px rgba(255,255,255,0.4)",
              ],
        }}
        transition={{
          left: { type: "spring", stiffness: 420, damping: 26 },
          boxShadow: { duration: 0.5, times: [0, 0.6, 1] },
        }}
      >
        {/* inner rim shading, layered above the base gradient */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 0 -3px 5px rgba(0,0,0,0.22), inset 0 2px 3px rgba(255,255,255,0.8)",
          }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
            transition={{ duration: 0.22 }}
            className="relative"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
