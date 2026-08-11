"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { framerEase } from "@/lib/motion/easing";

function Chars({ text, charDelay, baseDelay }: { text: string; charDelay: number; baseDelay: number }) {
  const chars = useMemo(() => Array.from(text), [text]);

  return (
    // Absolutely positioned within the slot's own box (see TextMorphSlot)
    // so the exiting and entering words stack and crossfade in place,
    // rather than briefly sitting side by side in normal flow.
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
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Word-level morph slot: swaps between `variants[activeIndex]` with a
 * per-character blur/rise reveal. Sized to the CURRENT word alone — an
 * invisible sibling holding the exact same text, not a "widest of all
 * variants" guess by character count. Guessing by length breaks two ways:
 * a shorter word leaves dead space inside an oversized box, and two
 * words with equal character counts can still render at different pixel
 * widths (this display font's "change" is wider than "people" despite
 * both being 6 characters), which clipped the wider one against the
 * overflow-hidden edge instead of leaving a gap.
 *
 * `layoutPosition` opts a slot into Framer's layout tracking (position
 * only, no scale — safe for text) so that when an *earlier* slot's own
 * width changes, this one slides smoothly to its new x rather than
 * snapping. Only pass it on slots that can sit downstream of a resizing
 * sibling; a slot's own width change always snaps instantly, masked by
 * the character crossfade itself.
 */
export function TextMorphSlot({
  variants,
  activeIndex,
  charDelay = 0.028,
  baseDelay = 0,
  layoutPosition = false,
  className,
}: {
  variants: string[];
  activeIndex: number;
  charDelay?: number;
  baseDelay?: number;
  layoutPosition?: boolean;
  className?: string;
}) {
  const text = variants[activeIndex] ?? "";

  return (
    <motion.span
      layout={layoutPosition ? "position" : false}
      transition={{ duration: 0.5, ease: framerEase }}
      className={clsx("relative inline-block align-baseline", className)}
    >
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <Chars key={activeIndex} text={text} charDelay={charDelay} baseDelay={baseDelay} />
        </AnimatePresence>
      </span>
    </motion.span>
  );
}
