import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { IgniteRule } from "@/components/ui/IgniteRule";
import { FadeIn, RevealLines } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { RolesList } from "@/components/careers/RolesList";
import {
  applicationSteps,
  benefitGroups,
  careersHero,
  pillars,
} from "@/lib/content/careers";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description: careersHero.statement,
};

export default function CareersPage() {
  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <h1 className="max-w-3xl font-display text-6xl font-black uppercase leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
            <RevealLines lines={[careersHero.title]} onMount />
          </h1>
          <p className="mt-8 max-w-lg font-body text-lg leading-relaxed text-current/70 sm:text-xl">
            {careersHero.statement}
          </p>
        </Container>
      </div>

      <Section className="pt-0">
        <Container>
          <IgniteRule lineColor="var(--accent-fill)" />
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.08}>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-sm text-current/65 sm:text-base">
                  {pillar.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inverse">
        <Container>
          <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Built to last, same as the work.
          </h2>

          <div className="mt-14 grid gap-x-8 gap-y-12 border-t border-current/15 pt-12 sm:grid-cols-3">
            {benefitGroups.map((group, i) => (
              <FadeIn key={group.title} delay={i * 0.08}>
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent-text-inverse">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2 font-body text-sm text-current/75 sm:text-base">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Find your next role.
          </h2>

          <div className="mt-14">
            <RolesList />
          </div>

          <p className="mt-10 font-body text-sm text-current/60">
            Don&apos;t see the right role listed?{" "}
            <a href={`mailto:${site.email}`} className="focus-ring text-accent-text underline underline-offset-4">
              Introduce yourself anyway
            </a>
            .
          </p>
        </Container>
      </Section>

      <Section tone="inverse">
        <Container>
          <SlateTag tone="inverse" className="text-current/60">
            How to Apply
          </SlateTag>
          <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-current/15 pt-10 sm:grid-cols-4">
            {applicationSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <span className="font-mono text-xs text-accent-text-inverse">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm text-current/65">{step.description}</p>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16">
            <Button
              href={`mailto:${site.email}`}
              variant="outline"
              className="border-current/30 text-current hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
            >
              Apply now
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
