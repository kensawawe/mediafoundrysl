import { Section, Eyebrow } from "@/components/ui/Section";
import { RevealText, FadeIn } from "@/components/ui/RevealText";
import { highlights } from "@/lib/content/philosophy";

export function WhyMediaFoundry() {
  return (
    <Section className="border-b border-border-subtle bg-surface">
      <Eyebrow>Why Media Foundry</Eyebrow>

      <RevealText as="p" className="mt-6 max-w-4xl">
        <span className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Stories are not just created. They are crafted with purpose.
        </span>
      </RevealText>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {highlights.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.08}>
            <span className="font-body text-xs uppercase tracking-[0.25em] text-accent-green-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-foreground/60">
              {item.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
