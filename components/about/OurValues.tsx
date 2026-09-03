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

function CuriosityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="20" cy="20" r="12" {...iconShared} />
      <path d="M29 29L40 40" {...iconShared} />
    </svg>
  );
}

function ProximityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="6" y="6" width="24" height="24" {...iconShared} />
      <rect x="18" y="18" width="24" height="24" {...iconShared} />
    </svg>
  );
}

function HonestyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="6" y="6" width="36" height="36" {...iconShared} />
      <path d="M14 24L21 31L34 16" {...iconShared} />
    </svg>
  );
}

function IntentionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="16" {...iconShared} />
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
      <path d="M24 4V10" {...iconShared} />
      <path d="M24 38V44" {...iconShared} />
      <path d="M4 24H10" {...iconShared} />
      <path d="M38 24H44" {...iconShared} />
    </svg>
  );
}

const icons = [CuriosityIcon, ProximityIcon, HonestyIcon, IntentionIcon];

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
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              {content.title}
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-current/70 sm:text-lg">
              {content.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.values.map((value, i) => {
              const Icon = icons[i % icons.length];
              const isFeatured = i === 0;
              return (
                <div
                  key={value.title}
                  className={clsx(
                    "flex flex-col justify-between gap-10 border p-6",
                    isFeatured
                      ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                      : "border-border-subtle bg-surface text-foreground",
                  )}
                >
                  <Icon className="h-8 w-8" />
                  <div>
                    <p
                      className={clsx(
                        "font-body text-sm leading-relaxed",
                        isFeatured ? "text-accent-fill-ink/85" : "text-foreground/70",
                      )}
                    >
                      {value.description}
                    </p>
                    <div
                      className={clsx(
                        "mt-4 border-t pt-3 font-mono text-[11px] uppercase tracking-[0.03em]",
                        isFeatured ? "border-accent-fill-ink/30" : "border-border-subtle",
                      )}
                    >
                      {value.title}
                    </div>
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
