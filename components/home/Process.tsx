"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useInView } from "@/components/ui/useInView";
import { framerEase } from "@/lib/motion/easing";
import { processStages } from "@/lib/content/process";

function StageIcon({ title, className }: { title: string; className?: string }) {
  const shared = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    fill: "none",
  };

  switch (title) {
    case "Discover":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="6.5" cy="6.5" r="4.5" {...shared} />
          <path d="M13 13l-3.6-3.6" {...shared} />
        </svg>
      );
    case "Design":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <path d="M3 13l.7-3.5L10 3l3 3-6.3 6.3L3 13z" {...shared} />
          <path d="M8.5 4.5l3 3" {...shared} />
        </svg>
      );
    case "Produce":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="5.5" width="12" height="8" {...shared} />
          <path d="M5.5 5.5L7 3h2l1.5 2.5" {...shared} />
          <circle cx="8" cy="9.5" r="2.1" {...shared} />
        </svg>
      );
    case "Deliver":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2.5" y="7.5" width="11" height="6" {...shared} />
          <path d="M8 7.5V2M8 2L5.7 4.3M8 2l2.3 2.3" {...shared} />
        </svg>
      );
    default:
      return null;
  }
}

export function Process() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Section id="process">
      <Container>
        <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          Discover. Design. Produce. Deliver.
        </h2>

        <div ref={ref} className="mt-16">
          {/* Desktop: the process reads left to right, in order. */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-4 h-px bg-border-subtle" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: framerEase }}
              className="absolute left-0 right-0 top-4 h-px origin-left bg-accent-fill"
            />
            <div className="grid grid-cols-4 gap-x-8">
              {processStages.map((stage, i) => (
                <motion.div
                  key={stage.index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.32, ease: framerEase }}
                >
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center border border-accent-fill bg-background">
                    <StageIcon title={stage.title} className="h-4 w-4 text-accent-text" />
                  </span>
                  <span className="mt-4 block font-mono text-xs text-accent-text">
                    {stage.index}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight lg:text-3xl">
                    {stage.title}
                  </h3>
                  <p className="mt-3 font-body text-sm text-current/65">{stage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: not enough width for four columns, so the same order reads top to bottom. */}
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
                    <StageIcon title={stage.title} className="h-4 w-4 text-accent-text" />
                  </span>
                  <span className="font-mono text-xs text-accent-text">{stage.index}</span>
                  <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
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
