"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Section, Eyebrow } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { processStages } from "@/lib/content/process";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });

  return (
    <Section className="border-b border-border-subtle">
      <Eyebrow>How we work</Eyebrow>
      <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
        From idea to impact.
      </h2>

      <div ref={ref} className="relative mt-20">
        <div className="absolute left-4 top-0 h-full w-px bg-border-subtle md:left-0 md:top-4 md:h-px md:w-full">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="h-full w-full origin-top bg-accent-green-ink md:origin-left"
          />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {processStages.map((stage, i) => (
            <FadeIn key={stage.index} delay={i * 0.1} className="relative pl-12 md:pl-0">
              <span className="absolute left-0 top-0 h-2 w-2 -translate-x-[3.5px] rounded-full bg-accent-green-ink md:relative md:mb-8 md:block md:translate-x-0" />
              <span className="block font-body text-xs uppercase tracking-[0.25em] text-foreground/40">
                {stage.index}
              </span>
              <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-3xl">
                {stage.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-foreground/60">
                {stage.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
