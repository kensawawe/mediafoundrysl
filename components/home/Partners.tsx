import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { sectorSlots } from "@/lib/content/partners";

export function Partners() {
  return (
    <Section>
      <Container>
        <p className="max-w-lg font-body text-sm text-current/60">
          Sectors we&apos;ve built brand, campaign and production work for — across
          startups, established brands and mission-driven organisations.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-px border border-border-subtle bg-border-subtle sm:grid-cols-4">
          {sectorSlots.map((slot, i) => (
            <FadeIn key={slot.label} delay={i * 0.04}>
              <div className="flex aspect-[3/2] items-center justify-center bg-background px-4 text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-current/45">
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
