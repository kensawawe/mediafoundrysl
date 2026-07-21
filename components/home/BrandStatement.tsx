import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { IgniteRule } from "@/components/ui/IgniteRule";
import { FadeIn } from "@/components/ui/RevealText";
import { brandStatement } from "@/lib/content/home";

export function BrandStatement() {
  return (
    <Section>
      <Container>
        <SlateTag>Statement</SlateTag>
        <IgniteRule className="mt-6" />
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.6vw]">
              {brandStatement.agencyLine}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-current/50 sm:text-4xl md:text-[2.6vw]">
              {brandStatement.storytellerLine}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
