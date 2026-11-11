"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { caseStudyCopy as copyEn, type CaseStudy } from "@/lib/content/case-studies";
import { caseStudyCopy as copyKri } from "@/lib/content/case-studies.kri";
import { testimonials as testimonialsEn } from "@/lib/content/testimonials";
import { testimonials as testimonialsKri } from "@/lib/content/testimonials.kri";
import { useTranslated } from "@/lib/content/useTranslated";

/** The client's own words, when a real testimonial exists for this project. */
export function ClientQuote({ study }: { study: CaseStudy }) {
  const copy = useTranslated(copyEn, copyKri);
  const testimonials = useTranslated(testimonialsEn, testimonialsKri);
  const t = testimonials.find((x) => x.id === (study.testimonialId ?? study.slug));
  if (!t) return null;

  return (
    <Section className="py-12 md:py-16">
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-3xl border-t border-current/15 pt-12 text-center">
            <p className="font-godthem text-xs uppercase tracking-[0.08em] text-accent-text">{copy.clientWords}</p>
            <blockquote className="mt-6 font-body text-xl leading-relaxed sm:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 font-godthem text-sm uppercase tracking-[0.05em] text-foreground/70">
              {t.name}
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </Section>
  );
}

/** One suggested next project. */
export function Related({ study, caseStudies }: { study: CaseStudy; caseStudies: CaseStudy[] }) {
  const copy = useTranslated(copyEn, copyKri);
  const i = caseStudies.findIndex((s) => s.slug === study.slug);
  const next =
    caseStudies.find((s) => s.slug === study.relatedSlug) ??
    (caseStudies.length > 1 ? caseStudies[(i + 1) % caseStudies.length] : undefined);
  if (!next || next.slug === study.slug) return null;

  return (
    <Section className="py-16 md:py-24">
      <Container>
        <Link
          href={`/work/${next.slug}`}
          className="focus-ring group block rounded-2xl border border-border-subtle p-8 transition-colors hover:border-accent-fill sm:p-12"
        >
          <span className="font-godthem text-xs uppercase tracking-[0.08em] text-accent-text">{copy.related}</span>
          <span className="mt-4 flex items-center justify-between gap-6">
            <span className="font-godthem text-3xl uppercase leading-tight tracking-[0.02em] sm:text-5xl">{next.title}</span>
            <span aria-hidden className="text-3xl transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </Link>
      </Container>
    </Section>
  );
}
