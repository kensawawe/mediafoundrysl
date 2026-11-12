import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { processSection, processSteps } from "@/lib/content/positioning";

/** How We Work: Discover → Define → Create → Deliver. */
export function Process({ id = "how-we-work" }: { id?: string }) {
  return (
    <Section id={id} className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="mb-12 border-t border-current/15" />
        <FadeIn className="max-w-3xl">
          <span className="font-belmonte text-xl uppercase tracking-[-0.02em] text-accent-text sm:text-2xl">
            {processSection.eyebrow}
          </span>
          <h2 className="mt-5 text-balance font-godthem text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl md:text-5xl">
            {processSection.heading}
          </h2>
        </FadeIn>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.number} className="bg-background">
              <FadeIn delay={i * 0.08} className="flex h-full flex-col p-6 sm:p-8">
                <h3 className="font-godthem text-2xl font-normal uppercase tracking-[0.02em] sm:text-3xl">
                  {step.name}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-foreground/70">{step.body}</p>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
