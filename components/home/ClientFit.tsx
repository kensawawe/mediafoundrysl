"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { clientFit as clientFitEn } from "@/lib/content/home";
import { clientFit as clientFitKri } from "@/lib/content/home.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function ClientFit() {
  const clientFit = useTranslated(clientFitEn, clientFitKri);

  return (
    <Section className="pt-8 pb-0 md:pt-12 md:pb-0">
      <Container>
        <div className="h-px w-full bg-navy-rule" />

        <div className="grid gap-10 pt-16 md:grid-cols-2 md:items-center md:gap-16 md:pt-20">
          <FadeIn>
            <span className="font-mono text-xl uppercase tracking-tight text-accent-text">
              {clientFit.eyebrow}
            </span>
            <h2 className="mt-6 font-display text-2xl font-black uppercase leading-[1.08] tracking-tight sm:text-3xl md:text-4xl">
              {clientFit.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <SunburstMark className="mt-12 h-9 w-9 text-steel" />
          </FadeIn>

          <FadeIn delay={0.15} className="md:border-l md:border-border-subtle md:pl-16">
            <div
              className="max-w-sm space-y-1.5 font-semibold text-base leading-snug tracking-tight text-foreground/70 sm:text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {clientFit.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Button href={clientFit.ctaHref} className="mt-8">
              {clientFit.ctaLabel}
            </Button>
          </FadeIn>
        </div>

        <div className="mt-16 h-px w-full bg-navy-rule md:mt-20" />
      </Container>
    </Section>
  );
}

function SunburstMark({ className }: { className?: string }) {
  const spokes = Array.from({ length: 8 });

  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      {spokes.map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 20 + Math.cos(angle) * 5;
        const y1 = 20 + Math.sin(angle) * 5;
        const x2 = 20 + Math.cos(angle) * 19;
        const y2 = 20 + Math.sin(angle) * 19;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
