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

        <div className="mx-auto grid max-w-6xl gap-10 pt-16 md:grid-cols-2 md:items-center md:gap-16 md:pt-20 lg:px-8">
          <FadeIn className="min-w-0 text-center sm:text-left">
            <span className="font-mono text-lg uppercase tracking-tight text-accent-text sm:text-xl">
              {clientFit.eyebrow}
            </span>
            <h2 className="mt-6 font-display text-xs font-black uppercase leading-[1.15] tracking-tight sm:text-2xl md:text-xl lg:text-xl xl:text-2xl">
              {clientFit.headline.map((line) => (
                <span
                  key={line}
                  className="block whitespace-nowrap sm:whitespace-normal xl:whitespace-nowrap"
                >
                  {line}
                </span>
              ))}
            </h2>
            <SunburstMark className="mx-auto mt-12 h-9 w-9 text-steel sm:mx-0" />
          </FadeIn>

          <FadeIn
            delay={0.15}
            className="flex min-w-0 flex-col items-center text-center md:border-l md:border-border-subtle md:pl-16"
          >
            <div
              className="max-w-lg space-y-1.5 font-semibold text-base leading-snug tracking-tight text-foreground/70 sm:text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {clientFit.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Button href={clientFit.ctaHref} className="mt-8 !rounded-full">
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
