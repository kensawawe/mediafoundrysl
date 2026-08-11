"use client";

import { useEffect, useState } from "react";
import { TextMorphSlot } from "@/components/ui/TextMorph";
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
export function HeroHeadline({ className }: { className?: string }) {
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
      <span className="flex flex-wrap items-baseline gap-x-[0.28em]">
        <TextMorphSlot variants={morph.subjects} activeIndex={index} baseDelay={0} />
        <span className="inline-flex items-baseline">
          <span>{morph.connector}</span>
          {hasSuffix && (
            <TextMorphSlot variants={morph.suffix} activeIndex={index} baseDelay={0.06} />
          )}
        </span>
        <TextMorphSlot variants={morph.objects} activeIndex={index} baseDelay={0.1} />
      </span>
    </h1>
  );
}
