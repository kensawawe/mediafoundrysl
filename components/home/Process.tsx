"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Slate } from "@/components/ui/Slate";
import { useInView } from "@/components/ui/useInView";
import { framerEase } from "@/lib/motion/easing";
import { processStages as processStagesEn } from "@/lib/content/process";
import { processStages as processStagesKri } from "@/lib/content/process.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// Keyed by the language-invariant stage index, not the (translated) title —
// a title switch would silently drop every icon once translated.
function StageIcon({ index, className }: { index: string; className?: string }) {
  const shared = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    fill: "none",
  };

  switch (index) {
    case "01": // Discover — magnifying glass
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="6.5" cy="6.5" r="4.5" {...shared} />
          <path d="M13 13l-3.6-3.6" {...shared} />
        </svg>
      );
    case "02": // Design — pen
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <path d="M3 13l.7-3.5L10 3l3 3-6.3 6.3L3 13z" {...shared} />
          <path d="M8.5 4.5l3 3" {...shared} />
        </svg>
      );
    case "03": // Develop — blueprint / planning doc
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="3" y="2.5" width="10" height="11" {...shared} />
          <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" {...shared} />
        </svg>
      );
    case "04": // Produce — camera
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="5.5" width="12" height="8" {...shared} />
          <path d="M5.5 5.5L7 3h2l1.5 2.5" {...shared} />
          <circle cx="8" cy="9.5" r="2.1" {...shared} />
        </svg>
      );
    case "05": // Deliver — package handoff
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2.5" y="7.5" width="11" height="6" {...shared} />
          <path d="M8 7.5V2M8 2L5.7 4.3M8 2l2.3 2.3" {...shared} />
        </svg>
      );
    case "06": // Amplify — broadcast signal
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="4" cy="12" r="1.3" fill="currentColor" stroke="none" />
          <path d="M4 12C4 8 7 5 11 5" {...shared} />
          <path d="M4 12C4 6 8.5 2.5 14 2.5" {...shared} />
        </svg>
      );
    default:
      return null;
  }
}

// Desktop/tablet: a horizontal image accordion — one wide panel, the rest
// collapsed to narrow strips, expanding on hover/focus. Row width is
// constant regardless of which panel is active (activeWidth + 5 *
// inactiveWidth + 5 * gap), sized to clear the container at the md
// breakpoint (768px viewport, 80px of Container padding) with room to
// spare, so it never needs its own responsive size sets the way the old
// arc carousel did.
function ProcessAccordion({ processStages }: { processStages: typeof processStagesEn }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex justify-center gap-2 overflow-x-auto">
      {processStages.map((stage, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={stage.index}
            type="button"
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
            aria-label={stage.title}
            aria-selected={isActive}
            role="option"
            className={clsx(
              "group relative h-[450px] shrink-0 overflow-hidden border border-border-subtle text-left transition-[width] duration-700 ease-in-out focus-ring",
              isActive ? "w-[340px]" : "w-12",
            )}
          >
            <Slate
              label={stage.title}
              variant="photo"
              aspect="h-full"
              grainOpacity={0.08}
              caption={false}
              className="absolute inset-0"
            />
            <div aria-hidden className="absolute inset-0 bg-ink/55" />

            <span className="absolute left-4 top-4">
              <StageIcon index={stage.index} className="h-6 w-6 text-paper" />
            </span>

            {isActive ? (
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.03em] text-paper/60">
                  {stage.index}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-paper">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-paper/75">
                  {stage.description}
                </p>
              </div>
            ) : (
              <span className="absolute bottom-8 left-1/2 origin-center -translate-x-1/2 rotate-90 whitespace-nowrap font-display text-sm font-bold uppercase tracking-tight text-paper">
                {stage.title}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Process() {
  const processStages = useTranslated(processStagesEn, processStagesKri);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Section id="process" className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="border-t border-current/15 mb-12" />

        <div ref={ref}>
          {/* Desktop/tablet: hover-expand image accordion. */}
          <div className="hidden md:block">
            <ProcessAccordion processStages={processStages} />
          </div>

          {/* Mobile: not enough width for the accordion, so the same order reads top to bottom. */}
          <div className="relative pl-8 md:hidden">
            <div className="absolute left-0 top-1 h-full w-px bg-border-subtle" />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: framerEase }}
              className="absolute left-0 top-1 h-full w-px origin-top bg-accent-fill"
            />
            <div className="flex flex-col gap-16">
              {processStages.map((stage, i) => (
                <motion.div
                  key={stage.index}
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.32, ease: framerEase }}
                >
                  <span className="absolute -left-8 -top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center border border-accent-fill bg-background">
                    <StageIcon index={stage.index} className="h-4 w-4 text-accent-text" />
                  </span>
                  <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {stage.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-sm text-current/65 sm:text-base">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
