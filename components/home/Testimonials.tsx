"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  testimonials as testimonialsEn,
  whatClientsSay as whatClientsSayEn,
  type Testimonial,
} from "@/lib/content/testimonials";
import { testimonials as testimonialsKri, whatClientsSay as whatClientsSayKri } from "@/lib/content/testimonials.kri";
import { portfolioCategoriesFor, workItems } from "@/lib/content/work";
import { useTranslated } from "@/lib/content/useTranslated";

// Testimonial ids that differ from their project's slug in lib/content/work.ts.
const PROJECT_SLUG: Record<string, string> = { conex: "conex-campaign", rotary: "rotary-international" };

/** The kind of work behind the quote, e.g. "Brand & Corporate Films". */
function workLabel(t: Testimonial) {
  const item = workItems.find((w) => w.slug === (PROJECT_SLUG[t.id] ?? t.id));
  return item ? portfolioCategoriesFor(item).join(" · ") : "";
}

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={clsx(direction === "left" && "rotate-180")}>
      <path d="M2 8h11.5M8.5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

/**
 * "What clients say": one quote at a time, set large on a deep navy panel,
 * with the clients as tabs underneath. `ids` picks (and orders) a subset;
 * all testimonials show when it is omitted.
 */
export function Testimonials({ ids }: { ids?: string[] } = {}) {
  const all = useTranslated(testimonialsEn, testimonialsKri);
  const whatClientsSay = useTranslated(whatClientsSayEn, whatClientsSayKri);
  const testimonials = ids
    ? ids.map((id) => all.find((t) => t.id === id)).filter((t): t is Testimonial => !!t)
    : all;
  const total = testimonials.length;
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const go = useCallback((i: number) => setIndex((i + total) % total), [total]);
  const current = testimonials[index];
  if (!current) return null;
  const label = workLabel(current);

  // Arrow keys move between quotes only while focus is inside the panel.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  return (
    <Section className="pb-20 md:pb-28">
      <Container>
        <div aria-hidden className="mb-12 border-t border-current/15" />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={`${whatClientsSay} (use the left and right arrow keys)`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="focus-ring rounded-2xl"
        >
          {/* Heading row: same eyebrow + heading pattern as the other sections, arrows on the right. */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-belmonte text-xl uppercase tracking-[-0.02em] text-accent-text sm:text-2xl">
                In their words
              </span>
              <h2 className="mt-5 font-godthem text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl md:text-5xl">
                {whatClientsSay}
              </h2>
            </div>
            {total > 1 && (
              <div className="flex items-center gap-4">
                <p aria-hidden className="font-godthem text-sm tracking-[0.08em] text-foreground/60">
                  <span className="text-foreground">{pad(index + 1)}</span> / {pad(total)}
                </p>
                {(["left", "right"] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => go(index + (dir === "left" ? -1 : 1))}
                    aria-label={dir === "left" ? "Previous testimonial" : "Next testimonial"}
                    className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong text-current transition-colors duration-300 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
                  >
                    <Arrow direction={dir} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 rounded-2xl border border-border-subtle bg-surface md:mt-14">
            {/* The quote */}
            <figure className="px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12">
              <div aria-live="polite" className="grid min-h-[14rem] sm:min-h-[12rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col justify-between gap-8"
                  >
                    <blockquote className="max-w-4xl font-body text-lg leading-relaxed text-foreground/85 sm:text-xl md:text-2xl">
                      <span aria-hidden className="mr-1 font-godthem text-accent-text">
                        &ldquo;
                      </span>
                      {current.quote}
                      <span aria-hidden className="ml-0.5 font-godthem text-accent-text">
                        &rdquo;
                      </span>
                    </blockquote>
                    <figcaption className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-white p-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
                        <img src={current.logo} alt="" decoding="async" className="h-full w-full object-contain" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-godthem text-base uppercase tracking-[0.03em]">{current.name}</span>
                        {label && <span className="mt-0.5 block font-body text-sm text-foreground/60">{label}</span>}
                      </span>
                    </figcaption>
                  </motion.div>
                </AnimatePresence>
              </div>
            </figure>

            {/* Client tabs */}
            {total > 1 && (
              <div className="grid border-t border-border-subtle sm:grid-cols-3" role="tablist" aria-label="Choose a client">
                {testimonials.map((t, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => go(i)}
                      className={clsx(
                        "focus-ring group relative flex items-center gap-3 px-6 py-4 text-left transition-colors duration-300 sm:px-8",
                        "border-border-subtle max-sm:[&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l",
                      )}
                    >
                      <span
                        aria-hidden
                        className={clsx(
                          "absolute inset-x-0 -top-px h-0.5 origin-left bg-accent-fill transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                      <span className="truncate font-godthem text-xs uppercase tracking-[0.06em] sm:text-sm">
                        <span className={clsx("transition-colors", active ? "text-foreground" : "text-foreground/50 group-hover:text-foreground/80")}>
                          {t.name}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
