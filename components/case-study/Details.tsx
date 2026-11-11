"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { caseStudyCopy as copyEn, type CaseStudy } from "@/lib/content/case-studies";
import { caseStudyCopy as copyKri } from "@/lib/content/case-studies.kri";
import { useTranslated } from "@/lib/content/useTranslated";

const isDev = process.env.NODE_ENV === "development";

/** A note that only appears in development, marking content the company still has to supply. */
export function ToSupply({ what }: { what: string }) {
  if (!isDev) return null;
  return (
    <p className="rounded-lg border border-dashed border-amber-500/60 bg-amber-500/10 px-4 py-3 font-mono text-xs text-amber-700 dark:text-amber-300">
      To supply: {what} (only visible in development)
    </p>
  );
}

/** Challenge → approach → the work → deliverables → verified outcome. */
export function Details({ study }: { study: CaseStudy }) {
  const copy = useTranslated(copyEn, copyKri);
  const blocks: { label: string; text?: string; missing: string }[] = [
    { label: copy.challenge, text: study.challenge, missing: "the client's challenge or brief" },
    { label: copy.approach, text: study.approach, missing: "how we approached it (strategy and creative direction)" },
    { label: copy.execution, text: study.execution, missing: "what was produced and how (shoot, edit, rollout)" },
    { label: copy.outcome, text: study.outcome, missing: "a verified, client-confirmed outcome" },
  ];
  const hasDeliverables = !!study.deliverables?.length;
  const anyContent = blocks.some((b) => b.text) || hasDeliverables;
  if (!anyContent && !isDev) return null;

  return (
    <Section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-x-16 gap-y-12 border-t border-current/15 pt-12 md:grid-cols-2">
          {blocks.map((b) => (
            <FadeIn key={b.label} className="min-w-0">
              <h2 className="font-godthem text-xs uppercase tracking-[0.08em] text-accent-text">{b.label}</h2>
              <div className="mt-3">
                {b.text ? (
                  <p className="max-w-xl font-body text-base leading-relaxed text-foreground/80 sm:text-lg">{b.text}</p>
                ) : (
                  <ToSupply what={b.missing} />
                )}
              </div>
            </FadeIn>
          ))}
          <FadeIn className="min-w-0">
            <h2 className="font-godthem text-xs uppercase tracking-[0.08em] text-accent-text">{copy.deliverables}</h2>
            <div className="mt-3">
              {hasDeliverables ? (
                <ul className="flex flex-wrap gap-2">
                  {study.deliverables!.map((d) => (
                    <li key={d} className="rounded-full border border-border-subtle px-3.5 py-1.5 font-body text-sm">
                      {d}
                    </li>
                  ))}
                </ul>
              ) : (
                <ToSupply what="the list of deliverables (e.g. one 3-minute film, 40 photographs)" />
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
