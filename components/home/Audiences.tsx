import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { audiences, audiencesSection } from "@/lib/content/positioning";

/** Who We Work With: institutions first, then brands, under one offer. */
export function Audiences() {
  return (
    <Section className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="mb-12 border-t border-current/15" />
        <FadeIn className="max-w-3xl">
          <span className="font-belmonte text-xl uppercase tracking-[-0.02em] text-accent-text sm:text-2xl">
            {audiencesSection.eyebrow}
          </span>
          <h2 className="mt-5 text-balance font-godthem text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl md:text-5xl">
            {audiencesSection.heading}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-8">
          {audiences.map((a, i) => (
            <FadeIn key={a.name} delay={i * 0.1} className="min-w-0">
              <article>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
                  <img
                    src={a.image}
                    alt={a.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1067}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 font-godthem text-2xl font-normal uppercase leading-tight tracking-[0.02em] sm:text-3xl">
                  {a.name}
                </h3>
                <p className="mt-3 max-w-lg font-body text-base leading-relaxed text-foreground/70">{a.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {a.work.map((w) => (
                    <li
                      key={w}
                      className="rounded-full border border-border-subtle px-3.5 py-1.5 font-body text-sm text-foreground/80"
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
