import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/RevealText";
import { Process } from "@/components/home/Process";
import { pillars, servicesPage as copy } from "@/lib/content/positioning";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `What We Do | ${site.name}`,
  description:
    "Strategy, production and storytelling: The Media Foundry helps organisations and brands in Sierra Leone find the message, create the work and make it matter.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <header className="pb-12 pt-32 md:pb-16 md:pt-40">
        <Container>
          <h1 className="font-godthem text-5xl font-normal uppercase leading-[1] tracking-[0.02em] sm:text-6xl md:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground/75 sm:text-xl">{copy.intro}</p>

          <nav aria-label={copy.flowLabel} className="mt-10">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-godthem text-sm uppercase tracking-[0.06em]">
              {pillars.map((p, i) => (
                <li key={p.id} className="flex items-center gap-3">
                  <a href={`#${p.id}`} className="focus-ring rounded-full border border-border-subtle px-4 py-2 transition-colors hover:border-accent-fill">
                    {p.number} {p.name}
                  </a>
                  {i < pillars.length - 1 && (
                    <span aria-hidden className="text-accent-text">
                      &rarr;
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </header>

      {pillars.map((pillar, i) => (
        <section key={pillar.id} id={pillar.id} aria-labelledby={`${pillar.id}-title`} className="scroll-mt-24 py-12 md:py-16">
          <Container>
            <div className="border-t border-current/15 pt-12 md:pt-16">
              <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                <FadeIn className={i % 2 === 1 ? "min-w-0 md:order-2" : "min-w-0"}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
                    <img
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      width={1600}
                      height={1200}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.1} className="min-w-0">
                  <p className="font-godthem text-sm tracking-[0.08em] text-accent-text">
                    {pillar.number} &middot; {pillar.name.toUpperCase()}
                  </p>
                  <h2
                    id={`${pillar.id}-title`}
                    className="mt-4 font-godthem text-4xl font-normal uppercase leading-[1.02] tracking-[0.02em] sm:text-5xl"
                  >
                    {pillar.headline}
                  </h2>
                  <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-foreground/75 sm:text-lg">
                    {pillar.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <h3 className="mt-8 font-godthem text-xs uppercase tracking-[0.08em] text-foreground/60">
                    {copy.capabilitiesLabel}
                  </h3>
                  <ul className="mt-3 grid gap-x-6 gap-y-1.5 font-body text-[15px] text-foreground/85 sm:grid-cols-2">
                    {pillar.capabilities.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span aria-hidden className="text-accent-text">
                          &bull;
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-xl bg-surface p-5">
                    <h3 className="font-godthem text-xs uppercase tracking-[0.08em] text-foreground/60">{copy.whenLabel}</h3>
                    <p className="mt-2 font-body text-[15px] leading-relaxed">{pillar.whenToCall}</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section aria-labelledby="combine-title" className="py-12 md:py-16">
        <Container>
          <div className="border-t border-current/15 pt-12 md:pt-16">
            <h2
              id="combine-title"
              className="max-w-3xl font-godthem text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl md:text-5xl"
            >
              {copy.combineHeading}
            </h2>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-foreground/70 sm:text-lg">
              {copy.combineIntro}
            </p>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {copy.combineExamples.map((ex) => (
                <li key={ex.title} className="rounded-2xl border border-border-subtle p-6">
                  <h3 className="font-godthem text-lg uppercase tracking-[0.03em]">{ex.title}</h3>
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-foreground/70">{ex.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 max-w-2xl">
              <h3 className="font-godthem text-xs uppercase tracking-[0.08em] text-foreground/60">{copy.supportingHeading}</h3>
              <p className="mt-2 font-body text-base leading-relaxed text-foreground/75">{copy.supportingBody}</p>
            </div>
          </div>
        </Container>
      </section>

      <Process />

      <div className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-surface p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl font-godthem text-2xl uppercase leading-tight tracking-[0.02em] sm:text-3xl">
              Have something worth saying?
            </p>
            <Button href="/contact">{copy.discuss}</Button>
          </div>
        </Container>
      </div>
    </>
  );
}
