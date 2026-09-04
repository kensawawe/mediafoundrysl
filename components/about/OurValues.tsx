"use client";

import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ourValues as ourValuesEn } from "@/lib/content/about";
import { ourValues as ourValuesKri } from "@/lib/content/about.kri";
import { useTranslated } from "@/lib/content/useTranslated";

const iconShared = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

function ClarityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="20" cy="20" r="12" {...iconShared} />
      <path d="M29 29L40 40" {...iconShared} />
    </svg>
  );
}

function ConvictionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="6" y="6" width="36" height="36" {...iconShared} />
      <path d="M14 24L21 31L34 16" {...iconShared} />
    </svg>
  );
}

function CourageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M26 4L6 28h18l-2 16 20-24H24l2-16z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="16" cy="13" r="6" {...iconShared} />
      <path d="M4 38l2-11c1-5 5-8 10-8s9 3 10 8l2 11" {...iconShared} />
      <circle cx="34" cy="13" r="6" {...iconShared} />
      <path d="M24 38l2-11c1-5 5-8 10-8s9 3 10 8l2 11" {...iconShared} />
    </svg>
  );
}

const icons = [ClarityIcon, ConvictionIcon, CourageIcon, CareIcon];

/**
 * A static 2x2 value grid — deliberately not folded into AboutAccordion.
 * Unlike the studio's five statements (long-form, one-at-a-time reading),
 * these are meant to all be visible together at a glance.
 */
export function OurValues() {
  const content = useTranslated(ourValuesEn, ourValuesKri);

  return (
    <Section>
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,28rem)_1fr] md:items-center md:gap-10">
          <div>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              {content.title}
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-current/70 sm:text-lg">
              {content.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:max-w-[41rem]">
            {content.values.map((value, i) => {
              const Icon = icons[i % icons.length];
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
                  <Icon className="h-10 w-10 shrink-0" />
                  <h3 className="whitespace-nowrap font-display text-lg font-black uppercase leading-[0.95] tracking-tight sm:text-xl md:text-2xl">
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
