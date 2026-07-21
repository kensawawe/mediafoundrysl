import { Section, Eyebrow } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";

export function BrandStatement() {
  return (
    <Section className="border-b border-border-subtle">
      <Eyebrow>Who we are</Eyebrow>

      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <FadeIn>
          <p className="font-display text-3xl leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            We are a creative media agency built to help organisations
            communicate through powerful storytelling.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <blockquote className="relative border-l-2 border-accent-green-ink pl-6">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-6 font-serif text-6xl italic text-accent-green-ink/25 md:text-7xl"
            >
              &ldquo;
            </span>
            <p className="font-serif text-2xl italic leading-snug text-foreground sm:text-3xl md:text-[2rem]">
              Every nation has stories waiting to be told. We exist to
              capture the voices, moments and ideas that shape Sierra Leone
              — and craft them into work that stands beside the best
              storytelling in the world.
            </p>
          </blockquote>
        </FadeIn>
      </div>
    </Section>
  );
}
