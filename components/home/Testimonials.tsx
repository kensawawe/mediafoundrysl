"use client";

import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  testimonials as testimonialsEn,
  whatClientsSay as whatClientsSayEn,
  type Testimonial,
} from "@/lib/content/testimonials";
import { testimonials as testimonialsKri, whatClientsSay as whatClientsSayKri } from "@/lib/content/testimonials.kri";
import { useTranslated } from "@/lib/content/useTranslated";

const FRAME_OFFSET = -28;
const FRAMES_VISIBLE = 3;

function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max);
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={clsx(direction === "left" && "rotate-180")}
    >
      <path
        d="M2 8h11.5M8.5 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ReviewCard({
  item,
  index,
  activeIndex,
}: {
  item: Testimonial;
  index: number;
  activeIndex: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const offset = index - activeIndex;
  const isActive = index === activeIndex;
  const isPast = activeIndex > index;

  const scale = shouldReduceMotion ? 1 : clamp(1 - offset * 0.08, [0.08, 2]);
  const y = shouldReduceMotion
    ? 0
    : clamp(offset * FRAME_OFFSET, [FRAME_OFFSET * FRAMES_VISIBLE, Number.POSITIVE_INFINITY]);
  const blur = isPast ? 3 : 0;
  const opacity = isPast ? 0 : 1;

  return (
    <motion.figure
      initial={false}
      animate={{
        y,
        scale,
        transition: { type: "spring", stiffness: 250, damping: 20, mass: 0.5 },
      }}
      className={clsx(
        "absolute top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-surface p-6 sm:p-8",
        isActive ? "border-accent-fill/40" : "border-border-subtle",
      )}
      style={{
        borderWidth: 1 / scale,
        willChange: "opacity, filter, transform",
        filter: `blur(${blur}px)`,
        opacity,
        transitionProperty: "opacity, filter",
        transitionDuration: shouldReduceMotion ? "0ms" : "300ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 100 - offset,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <blockquote className="relative">
        <span
          aria-hidden
          className="absolute -top-3 -left-1 font-display text-5xl leading-none text-accent-fill/10"
        >
          &ldquo;
        </span>
        <p className="relative line-clamp-4 font-body text-sm leading-relaxed text-current/70 sm:text-base">
          {item.quote}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-current/10 pt-4">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">{item.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.03em] text-current/50">
            {item.role}
          </p>
        </div>
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          className="h-9 w-9 shrink-0 object-contain grayscale"
        />
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  const testimonials = useTranslated(testimonialsEn, testimonialsKri);
  const whatClientsSay = useTranslated(whatClientsSayEn, whatClientsSayKri);
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const maxIndex = total - 1;

  const handlePrev = useCallback(() => {
    setIndex((i) => clamp(i - 1, [0, maxIndex]));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setIndex((i) => clamp(i + 1, [0, maxIndex]));
  }, [maxIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <Section className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="border-t border-current/15 mb-12" />

        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            {whatClientsSay}
          </h2>
          {total > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={index === 0}
                aria-label="Previous testimonial"
                className="focus-ring flex h-10 w-10 items-center justify-center border border-border-strong text-current transition-colors duration-300 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-current"
              >
                <Arrow direction="left" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={index === maxIndex}
                aria-label="Next testimonial"
                className="focus-ring flex h-10 w-10 items-center justify-center border border-border-strong text-current transition-colors duration-300 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-current"
              >
                <Arrow direction="right" />
              </button>
            </div>
          )}
        </div>

        <div className="relative mt-12 h-[320px] md:mt-16">
          {testimonials.map((item, i) => (
            <ReviewCard key={item.id} item={item} index={i} activeIndex={index} />
          ))}
        </div>

        {total > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={clsx(
                  "h-1.5 transition-all duration-300",
                  i === index ? "w-8 bg-accent-fill" : "w-1.5 bg-current/20 hover:bg-current/40",
                )}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
