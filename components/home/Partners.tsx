import { Section, Eyebrow } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { partnerSlots } from "@/lib/content/partners";

export function Partners() {
  return (
    <Section className="border-b border-border-subtle">
      <Eyebrow>Trusted by</Eyebrow>
      <h2 className="mt-4 max-w-xl font-display text-3xl leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        Space reserved for the organisations we&rsquo;ll tell stories with.
      </h2>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {partnerSlots.map((slot, i) => (
          <FadeIn key={slot.label} delay={i * 0.05}>
            <div className="flex aspect-[3/2] items-center justify-center rounded-lg border border-dashed border-border-subtle px-4 text-center">
              <span className="font-body text-xs uppercase tracking-[0.15em] text-foreground/35">
                {slot.label}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
