import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import type { CaseStudy } from "@/lib/content/case-studies";

export function Outcome({ study }: { study: CaseStudy }) {
  return (
    <Section className="py-20 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <SlateTag>Final Outcome</SlateTag>
          <FadeIn>
            <p className="max-w-2xl font-body text-base leading-relaxed text-current/75 sm:text-lg">
              {study.outcome}
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border-subtle pt-10 sm:grid-cols-3">
          {study.impact.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <span className="font-mono text-2xl text-accent-text sm:text-3xl">
                {item.stat}
              </span>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-current/50">
                {item.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
