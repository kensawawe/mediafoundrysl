"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { clientFit as clientFitEn } from "@/lib/content/home";
import { clientFit as clientFitKri } from "@/lib/content/home.kri";
import { useTranslated } from "@/lib/content/useTranslated";

/** "The cost of being forgettable": why the work needs to be seen, understood and remembered. */
export function ClientFit() {
  const clientFit = useTranslated(clientFitEn, clientFitKri);

  return (
    <Section className="pt-8 pb-0 md:pt-12 md:pb-0">
      <Container>
        <div className="h-px w-full bg-navy-rule" />

        <div className="mx-auto grid max-w-6xl gap-10 pt-16 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-16 md:pt-20 lg:px-8">
          <FadeIn className="min-w-0">
            <span className="font-belmonte text-xl font-normal uppercase tracking-[-0.02em] text-accent-text sm:text-2xl">
              {clientFit.eyebrow}
            </span>
            <h2 className="mt-6 max-w-xl text-balance font-godthem text-3xl font-normal uppercase leading-[1.08] tracking-[0.02em] sm:text-4xl lg:text-5xl">
              {clientFit.headline}
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="min-w-0 md:border-l md:border-border-subtle md:pl-16">
            <div className="max-w-lg space-y-4 font-body text-base leading-relaxed text-foreground/75 sm:text-lg">
              {clientFit.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 max-w-lg font-godthem text-lg uppercase leading-snug tracking-[0.03em] text-accent-text sm:text-xl">
              {clientFit.closing}
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 h-px w-full bg-navy-rule md:mt-20" />
      </Container>
    </Section>
  );
}
