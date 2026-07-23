import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { IgniteRule } from "@/components/ui/IgniteRule";
import { FadeIn } from "@/components/ui/RevealText";
import { brandStatement } from "@/lib/content/home";

export function BrandStatement() {
  return (
    <Section>
      <Container>
        <IgniteRule lineColor="var(--accent-fill)" />
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.6vw]">
              {brandStatement.agencyLine}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-accent-text sm:text-4xl md:text-[2.6vw]">
              {brandStatement.storytellerLine}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
