"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DepartmentGrid } from "@/components/home/DepartmentGrid";
import { servicesSectionHeading as headingEn } from "@/lib/content/services";
import { servicesSectionHeading as headingKri } from "@/lib/content/services.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function Services() {
  const heading = useTranslated(headingEn, headingKri);
  return (
    <Section className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="border-t border-current/15 mb-12" />

        <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          {heading}
        </h2>

        <div className="mt-14">
          <DepartmentGrid />
        </div>
      </Container>
    </Section>
  );
}
