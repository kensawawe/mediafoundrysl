import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { brandStatement } from "@/lib/content/home";

export function BrandStatement() {
  return (
    <Section>
      <Container>
        <SlateTag>Statement</SlateTag>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="font-display text-3xl leading-[1.08] tracking-tight sm:text-4xl md:text-[2.75vw]">
              {brandStatement.agencyLine}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-display text-3xl leading-[1.08] tracking-tight text-current/50 sm:text-4xl md:text-[2.75vw]">
              {brandStatement.storytellerLine}
            </p>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
