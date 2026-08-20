"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Slate } from "@/components/ui/Slate";
import { processStages as processStagesEn, processIntro as processIntroEn } from "@/lib/content/process";
import { processStages as processStagesKri, processIntro as processIntroKri } from "@/lib/content/process.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// A horizontal image accordion — one wide panel, the rest collapsed to
// narrow strips, expanding on hover/focus/click. The row is wider than
// any viewport (activeWidth + 5 * inactiveWidth + 5 * gap ≈ 620px), so
// the same fixed-size layout runs everywhere; overflow-x-auto lets it
// scroll horizontally within itself on narrow screens rather than
// forcing the page wider.
function ProcessAccordion({ processStages }: { processStages: typeof processStagesEn }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-2 overflow-x-auto">
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

            {isActive ? (
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold tracking-tight text-paper">
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
  const processIntro = useTranslated(processIntroEn, processIntroKri);

  return (
    <Section id="process" className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="border-t border-current/15 mb-12" />

        <div className="lg:flex lg:items-start lg:gap-16">
          {/* Above the process on mobile/tablet, to the left on desktop. */}
          <div className="mb-10 lg:mb-0 lg:w-72 lg:shrink-0">
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
              {processIntro.title}
            </h2>
            <p className="mt-4 max-w-sm font-body text-sm text-current/65 sm:text-base">
              {processIntro.description}
            </p>
          </div>

          <div className="lg:min-w-0 lg:flex-1">
            <ProcessAccordion processStages={processStages} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
