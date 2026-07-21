"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { processStages } from "@/lib/content/process";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="process">
      <Container>
        <SlateTag>How We Work</SlateTag>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.98] tracking-tight sm:text-5xl">
          Discover. Develop. Create. Deliver.
        </h2>

        <div ref={trackRef} className="relative mt-16 pl-8 md:pl-12">
          <div className="absolute left-0 top-1 h-full w-px bg-border-subtle md:left-0" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-1 h-full w-px origin-top bg-accent-text"
          />

          <div className="flex flex-col gap-16">
            {processStages.map((stage) => (
              <div key={stage.index} className="relative">
                <span className="absolute -left-8 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-current md:-left-12" />
                <span className="font-mono text-xs text-accent-text">{stage.index}</span>
                <h3 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-xl font-body text-sm text-current/65 sm:text-base">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
