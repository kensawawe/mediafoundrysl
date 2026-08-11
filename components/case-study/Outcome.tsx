"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { type CaseStudy } from "@/lib/content/case-studies";

export function Outcome({ study }: { study: CaseStudy }) {
  return (
    <Section className="py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {study.impact.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <span className="font-display text-3xl font-black text-accent-text sm:text-4xl">
                {item.stat}
              </span>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.03em] text-current/50">
                {item.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
