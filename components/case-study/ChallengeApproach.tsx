"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { caseStudyCopy as copyEn, type CaseStudy } from "@/lib/content/case-studies";
import { caseStudyCopy as copyKri } from "@/lib/content/case-studies.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function ChallengeApproach({ study }: { study: CaseStudy }) {
  const copy = useTranslated(copyEn, copyKri);

  return (
    <Section className="py-20 md:py-24">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
          <FadeIn>
            <SlateTag className="text-current/60">{copy.theChallenge}</SlateTag>
            <p className="mt-5 font-body text-base leading-relaxed text-current/80 sm:text-lg">
              {study.challenge}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <SlateTag className="text-current/60">{copy.ourApproach}</SlateTag>
            <p className="mt-5 font-body text-base leading-relaxed text-current/80 sm:text-lg">
              {study.approach}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
