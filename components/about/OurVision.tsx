"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { ourVision as ourVisionEn } from "@/lib/content/about";
import { ourVision as ourVisionKri } from "@/lib/content/about.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function OurVision() {
  const ourVision = useTranslated(ourVisionEn, ourVisionKri);
  return (
    <Section>
      <Container>
        <SlateTag className="!text-[22px] !text-current">
          {ourVision.title}
        </SlateTag>
        <FadeIn>
          <p className="mt-6 max-w-4xl font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            {ourVision.body}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
