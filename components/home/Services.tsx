"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DepartmentGrid } from "@/components/home/DepartmentGrid";
import {
  servicesSectionHeading as headingEn,
  servicesSectionSubheading as subheadingEn,
} from "@/lib/content/services";
import {
  servicesSectionHeading as headingKri,
  servicesSectionSubheading as subheadingKri,
} from "@/lib/content/services.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function Services() {
  const heading = useTranslated(headingEn, headingKri);
  const subheading = useTranslated(subheadingEn, subheadingKri);

  return (
    <Section className="awareness-keep-blue bg-surface">
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
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
