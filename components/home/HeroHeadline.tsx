"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { TextMorphSlot } from "@/components/ui/TextMorph";
import { framerEase } from "@/lib/motion/easing";
import { hero as heroEn } from "@/lib/content/home";
import { hero as heroKri } from "@/lib/content/home.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// Long enough to read each phrase comfortably before the next morph begins —
// an editorial pace, not a fast word-carousel.
const CYCLE_MS = 3600;

/**
 * "[Stories/Media] that move[s] [people/change]" — the subject and object
 * morph independently, "that move" never re-renders, and the trailing "s"
 * is its own tiny morph slot so the grammar stays correct without the verb
 * appearing to change.
 */
export function HeroHeadline({
  className,
  wrap = true,
}: {
  className?: string;
  /** Set false to force the whole phrase onto one line (caller is
   *  responsible for sizing text to actually fit). Defaults to the
   *  original wrapping behaviour used on the homepage. */
  wrap?: boolean;
}) {
  const { morph } = useTranslated(heroEn, heroKri);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % 2), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const hasSuffix = morph.suffix.some(Boolean);

  return (
    <h1 className={className}>
      <span className={clsx("flex items-baseline gap-x-[0.28em]", wrap ? "flex-wrap" : "flex-nowrap")}>
        <TextMorphSlot
          variants={morph.subjects}
          activeIndex={index}
          baseDelay={0}
          className={wrap ? undefined : "shrink-0"}
        />
        <motion.span
          layout="position"
          transition={{ duration: 0.5, ease: framerEase }}
          className={clsx("inline-flex items-baseline whitespace-nowrap", !wrap && "shrink-0")}
        >
          <span>{morph.connector}</span>
          {hasSuffix && (
            <TextMorphSlot variants={morph.suffix} activeIndex={index} baseDelay={0.06} />
          )}
        </motion.span>
        <TextMorphSlot
          variants={morph.objects}
          activeIndex={index}
          baseDelay={0.1}
          layoutPosition
          className={wrap ? undefined : "shrink-0"}
        />
      </span>
    </h1>
  );
}
