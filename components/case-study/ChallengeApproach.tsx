import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import type { CaseStudy } from "@/lib/content/case-studies";

export function ChallengeApproach({ study }: { study: CaseStudy }) {
  return (
    <Section className="py-20 md:py-24" tone="inverse">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
          <FadeIn>
            <SlateTag className="text-white/60">The Challenge</SlateTag>
            <p className="mt-5 font-body text-base leading-relaxed text-white/80 sm:text-lg">
              {study.challenge}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <SlateTag className="text-white/60">Our Approach</SlateTag>
            <p className="mt-5 font-body text-base leading-relaxed text-white/80 sm:text-lg">
              {study.approach}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
