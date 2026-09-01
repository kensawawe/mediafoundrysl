"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DepartmentGrid } from "@/components/home/DepartmentGrid";
import {
  servicesSectionEyebrow as eyebrowEn,
  servicesSectionHeading as headingEn,
  servicesSectionSubheading as subheadingEn,
} from "@/lib/content/services";
import {
  servicesSectionEyebrow as eyebrowKri,
  servicesSectionHeading as headingKri,
  servicesSectionSubheading as subheadingKri,
} from "@/lib/content/services.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function Services() {
  const eyebrow = useTranslated(eyebrowEn, eyebrowKri);
  const heading = useTranslated(headingEn, headingKri);
  const subheading = useTranslated(subheadingEn, subheadingKri);

  return (
    <Section className="bg-surface">
      <Container>
        <div aria-hidden className="border-t border-current/15 mb-12" />

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 font-serif text-sm uppercase tracking-[0.2em] text-foreground/70">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-foreground/70" />
            {eyebrow}
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-foreground/60 sm:text-lg">
            {subheading}
          </p>
        </div>

        <div className="mt-14">
          <DepartmentGrid />
        </div>
      </Container>
    </Section>
  );
}
