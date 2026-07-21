import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { highlights, philosophyStatement } from "@/lib/content/philosophy";

export function Philosophy() {
  return (
    <Section tone="inverse">
      <Container>
        <SlateTag tone="inverse" className="text-current/60">
          Principles
        </SlateTag>
        <p className="mt-6 max-w-3xl font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
          {philosophyStatement}
        </p>

        <div className="mt-16 grid gap-x-8 gap-y-12 border-t border-current/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <FadeIn key={h.tag} delay={i * 0.08}>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-text-inverse">
                {h.tag}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">
                {h.title}
              </h3>
              <p className="mt-3 max-w-sm font-body text-sm text-current/60 sm:text-base">
                {h.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
