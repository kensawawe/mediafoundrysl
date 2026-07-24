"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { sectorSlots, type SectorSlot } from "@/lib/content/partners";

function SectorCell({ label, gradient, index }: SectorSlot & { index: number }) {
  const backgroundImage = `linear-gradient(115deg, ${gradient.join(", ")})`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }

  return (
    <div
      onMouseMove={handleMove}
      className="group relative isolate flex aspect-[3/2] items-center justify-center overflow-hidden px-4 text-center"
    >
      <div
        aria-hidden
        className="animate-gradient-drift absolute inset-0"
        style={{ backgroundImage, animationDuration: `${8 + index * 1.1}s` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.45), transparent 55%)",
        }}
      />
      <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.12em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
        {label}
      </span>
    </div>
  );
}

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
              <SectorCell {...slot} index={i} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
