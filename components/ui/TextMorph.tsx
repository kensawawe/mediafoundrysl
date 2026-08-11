"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { framerEase } from "@/lib/motion/easing";

function Chars({ text, charDelay, baseDelay }: { text: string; charDelay: number; baseDelay: number }) {
  const chars = useMemo(() => Array.from(text), [text]);

  return (
    // Absolutely positioned within the slot's already-reserved box (see
    // TextMorphSlot) so the exiting and entering words stack and crossfade
    // in place, rather than briefly sitting side by side in normal flow.
    <motion.span className="absolute inset-0 inline-flex items-baseline">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: framerEase, delay: baseDelay + i * charDelay }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Word-level morph slot: swaps between `variants[activeIndex]` with a
 * per-character blur/rise reveal, pre-sized (via a CSS-grid overlap sizer)
 * to its widest variant so swapping never reflows the surrounding line.
 */
export function TextMorphSlot({
  variants,
  activeIndex,
  charDelay = 0.028,
  baseDelay = 0,
  className,
}: {
  variants: string[];
  activeIndex: number;
  charDelay?: number;
  baseDelay?: number;
  className?: string;
}) {
  const longest = useMemo(
    () => variants.reduce((a, b) => (b.length > a.length ? b : a), variants[0] ?? ""),
    [variants],
  );

  return (
    <span className={clsx("relative inline-grid", className)}>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest || " "}
      </span>
      <span className="relative col-start-1 row-start-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <Chars key={activeIndex} text={variants[activeIndex] ?? ""} charDelay={charDelay} baseDelay={baseDelay} />
        </AnimatePresence>
      </span>
    </span>
  );
}
