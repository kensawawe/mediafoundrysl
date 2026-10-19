"use client";

import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ourValues as ourValuesEn } from "@/lib/content/about";
import { ourValues as ourValuesKri } from "@/lib/content/about.kri";
import { useTranslated } from "@/lib/content/useTranslated";

/**
 * A static 2x2 value grid — deliberately not folded into AboutAccordion.
 * Unlike the studio's five statements (long-form, one-at-a-time reading),
 * these are meant to all be visible together at a glance.
 */
export function OurValues() {
  const content = useTranslated(ourValuesEn, ourValuesKri);

  return (
    <Section className="pb-0 md:pb-0">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,28rem)_1fr] md:items-center md:gap-10">
          <div>
            <h2 className="font-belmonte text-4xl font-normal uppercase leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl">
              {content.title}
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-current/70 sm:text-lg">
              {content.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:max-w-[41rem]">
            {content.values.map((value, i) => {
              const isFeatured = i === 0;
              return (
                <div
                  key={value.title}
                  className={clsx(
                    "flex aspect-square flex-col gap-3 rounded-2xl border p-6",
                    isFeatured
                      ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                      : "border-border-subtle bg-surface text-foreground",
                  )}
                >
                  <h3 className="whitespace-nowrap font-belmonte text-lg font-normal uppercase leading-[0.95] tracking-[-0.03em] sm:text-xl md:text-[clamp(13px,1.55vw,24px)]">
                    {value.title}
                  </h3>
                  <div
                    className={clsx(
                      "space-y-2 font-body text-sm leading-snug",
                      isFeatured ? "text-accent-fill-ink/85" : "text-foreground/70",
                    )}
                  >
                    {value.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
