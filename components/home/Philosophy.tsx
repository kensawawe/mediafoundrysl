import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { highlights, philosophyStatement } from "@/lib/content/philosophy";

export function Philosophy() {
  return (
    <Section tone="inverse">
      <Container>
        <SlateTag className="text-white/60">Why Media Foundry</SlateTag>
        <p className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          {philosophyStatement}
        </p>

        <div className="mt-16 grid gap-x-8 gap-y-12 border-t border-white/15 pt-12 sm:grid-cols-2">
          {highlights.map((h, i) => (
            <FadeIn key={h.index} delay={i * 0.08}>
              <span className="font-mono text-xs text-accent-text">{h.index}</span>
              <h3 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">{h.title}</h3>
              <p className="mt-3 max-w-sm font-body text-sm text-white/60 sm:text-base">
                {h.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
