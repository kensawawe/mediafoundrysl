import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import type { CaseStudy } from "@/lib/content/case-studies";

export function ProcessJourney({ study }: { study: CaseStudy }) {
  return (
    <Section className="py-20 md:py-24">
      <Container>
        <SlateTag>The Pour — Process & Production</SlateTag>
        <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-border-subtle pt-10 sm:grid-cols-3">
          {study.process.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08}>
              <span className="font-mono text-xs text-accent-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-sm text-current/65">{step.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
