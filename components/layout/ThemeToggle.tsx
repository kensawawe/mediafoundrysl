"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import clsx from "clsx";

/**
 * An actual wall light switch: a small plate with two screws and a rocker
 * paddle. Press the top of the rocker and the lights are on (light mode);
 * press the bottom and they go off (dark mode). The paddle tilts in 3D on a
 * spring and its shading flips with it, so it reads as a real rocker.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lights "on" = light mode. The site defaults to light, so lights start on.
  const lightsOn = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lightsOn}
      aria-label="Lights"
      onClick={() => setTheme(lightsOn ? "dark" : "light")}
      className={clsx(
        "focus-ring group relative h-5 w-[15px] shrink-0 rounded-[3px] border border-[var(--sw-edge)] bg-[var(--sw-body)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {/* the two mounting screws */}
      <span aria-hidden className="absolute left-1/2 top-[1px] h-[1.5px] w-[1.5px] -translate-x-1/2 rounded-full bg-[var(--sw-deep)]/70">
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-[var(--sw-deep)]" />
      </span>
      <span aria-hidden className="absolute bottom-[1px] left-1/2 h-[1.5px] w-[1.5px] -translate-x-1/2 rounded-full bg-[var(--sw-deep)]/70">
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-12 bg-[var(--sw-deep)]" />
      </span>

      {/* recessed slot the rocker sits in */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[11px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-[var(--sw-deep)]/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
        style={{ perspective: 36 }}
      >
        {/* the rocker paddle */}
        <motion.span
          className="absolute inset-[0.75px] rounded-[1.5px] shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          style={{ transformOrigin: "50% 50%" }}
          animate={{
            rotateX: lightsOn ? -22 : 22,
            background: lightsOn
              ? "linear-gradient(to bottom, var(--sw-hi) 0%, var(--sw-mid) 55%, var(--sw-lo) 100%)"
              : "linear-gradient(to bottom, var(--sw-lo) 0%, var(--sw-mid) 45%, var(--sw-hi) 100%)",
          }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 700, damping: 30, mass: 0.6 }}
        />
      </span>
    </button>
  );
}
