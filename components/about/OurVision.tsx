import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { ourVision } from "@/lib/content/about";

export function OurVision() {
  return (
    <Section tone="inverse">
      <Container>
        <SlateTag tone="inverse" className="text-current/60">
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
