"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { framerEase } from "@/lib/motion/easing";
import {
  whoWeAre as whoWeAreEn,
  ourPhilosophy as ourPhilosophyEn,
  whyOneRoof as whyOneRoofEn,
  ourApproach as ourApproachEn,
  ourVision as ourVisionEn,
} from "@/lib/content/about";
import {
  whoWeAre as whoWeAreKri,
  ourPhilosophy as ourPhilosophyKri,
  whyOneRoof as whyOneRoofKri,
  ourApproach as ourApproachKri,
  ourVision as ourVisionKri,
} from "@/lib/content/about.kri";
import { useTranslated } from "@/lib/content/useTranslated";

/**
 * The studio's five statements as a single-open accordion — one large
 * uppercase claim visible at a time, the rest dimmed to a scannable list,
 * rather than five separately-scrolled full sections.
 */
export function AboutAccordion() {
  const whoWeAre = useTranslated(whoWeAreEn, whoWeAreKri);
  const ourPhilosophy = useTranslated(ourPhilosophyEn, ourPhilosophyKri);
  const whyOneRoof = useTranslated(whyOneRoofEn, whyOneRoofKri);
  const ourApproach = useTranslated(ourApproachEn, ourApproachKri);
  const ourVision = useTranslated(ourVisionEn, ourVisionKri);

  const items = [whoWeAre, ourPhilosophy, whyOneRoof, ourApproach, ourVision];
  // Opens on the studio's own name first — "Who We Are" is the natural
  // entry point, matching the reference's default-open behavior.
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <Container>
      <div className="border-t border-border-subtle">
        {items.map((item, i) => {
          const isActive = activeIndex === i;
          return (
            <div key={item.title} className="border-b border-border-subtle">
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? null : i)}
                aria-expanded={isActive}
                className="focus-ring flex w-full items-start py-8 text-left md:py-10"
              >
                <h2
                  className={clsx(
                    "font-display text-3xl font-black uppercase leading-[0.95] tracking-tight transition-colors duration-300 sm:text-4xl md:text-5xl",
                    isActive ? "text-current" : "text-current/25 hover:text-current/50",
                  )}
                >
                  {item.title}
                </h2>
              </button>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: framerEase }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-2xl space-y-4 pb-8 font-body text-lg leading-relaxed text-current/70 sm:text-xl md:pb-10">
                      {(Array.isArray(item.body) ? item.body : [item.body]).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
