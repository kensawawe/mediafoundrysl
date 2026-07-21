import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import type { CaseStudy } from "@/lib/content/case-studies";

export function Overview({ study }: { study: CaseStudy }) {
  return (
    <Section className="py-20 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <SlateTag>Overview</SlateTag>
          <FadeIn>
            <p className="max-w-2xl font-display text-2xl leading-[1.15] tracking-tight sm:text-3xl">
              {study.overview}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
