import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { partnerSlots } from "@/lib/content/partners";

export function Partners() {
  return (
    <Section>
      <Container>
        <SlateTag>Who We Work With</SlateTag>
        <p className="mt-4 max-w-lg font-body text-sm text-current/60">
          Space reserved for the NGOs, brands, organisations and development
          partners we&apos;ll build with next.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-px border border-border-subtle bg-border-subtle sm:grid-cols-3 md:grid-cols-6">
          {partnerSlots.map((slot, i) => (
            <FadeIn key={slot.label} delay={i * 0.04}>
              <div className="flex aspect-[3/2] items-center justify-center bg-background px-4 text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-current/35">
                  {slot.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
