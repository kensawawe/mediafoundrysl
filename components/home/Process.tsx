"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useInView } from "@/components/ui/useInView";
import { framerEase } from "@/lib/motion/easing";
import { processStages } from "@/lib/content/process";

function StageIcon({ title, className }: { title: string; className?: string }) {
  const shared = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    fill: "none",
  };

  switch (title) {
    case "Discover":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="6.5" cy="6.5" r="4.5" {...shared} />
          <path d="M13 13l-3.6-3.6" {...shared} />
        </svg>
      );
    case "Design":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <path d="M3 13l.7-3.5L10 3l3 3-6.3 6.3L3 13z" {...shared} />
          <path d="M8.5 4.5l3 3" {...shared} />
        </svg>
      );
    case "Produce":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="5.5" width="12" height="8" {...shared} />
          <path d="M5.5 5.5L7 3h2l1.5 2.5" {...shared} />
          <circle cx="8" cy="9.5" r="2.1" {...shared} />
        </svg>
      );
    case "Deliver":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2.5" y="7.5" width="11" height="6" {...shared} />
          <path d="M8 7.5V2M8 2L5.7 4.3M8 2l2.3 2.3" {...shared} />
        </svg>
      );
    default:
      return null;
  }
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

// Arc layout: the active stage centers at the top, the rest fan out either
// side by shortest wrap-around distance. VISIBLE_COUNT is derived from the
// stage count itself (not a separate windowing cap) since all four stages
// stay on screen at once — this is a rotating arc, not a windowed carousel.
// Two size sets: the tablet range (md, 768–1023px) is narrow enough that the
// full desktop radius would push the receding outer card past the viewport
// edge, so it gets a tighter arc; lg (1024px+) gets the full-size version.
const ARC_SIZES = {
  compact: { radiusX: 200, radiusY: 85, card: "h-40 w-56 p-5", icon: "h-5 w-5", title: "text-xl", body: "text-xs" },
  full: { radiusX: 340, radiusY: 150, card: "h-56 w-80 p-7", icon: "h-7 w-7", title: "text-3xl", body: "text-sm" },
};

function getArcPosition(
  index: number,
  activeIndex: number,
  total: number,
  radiusX: number,
  radiusY: number,
) {
  const half = Math.floor(total / 2);
  let offset = index - activeIndex;

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  const angle = (offset / total) * Math.PI;
  const x = Math.sin(angle) * radiusX;
  const y = -Math.cos(angle) * radiusY;

  const distance = Math.abs(offset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  const opacity = Math.max(0.35, 1 - (distance / maxDistance) * 0.65);
  const zIndex = total - distance;

  return { x, y, scale, opacity, zIndex };
}

function ProcessArcCarousel() {
  const total = processStages.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const size = isCompact ? ARC_SIZES.compact : ARC_SIZES.full;

  const goTo = useCallback(
    (index: number) => setActiveIndex(((index % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our process"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="outline-none"
    >
      <div
        className={clsx(
          "relative mx-auto w-full transition-[height] duration-300",
          isCompact ? "h-[320px] max-w-xl" : "h-[440px] max-w-3xl",
        )}
      >
        <AnimatePresence>
          {processStages.map((stage, i) => {
            const pos = getArcPosition(i, activeIndex, total, size.radiusX, size.radiusY);
            const isActive = i === activeIndex;

            return (
              <motion.button
                key={stage.index}
                type="button"
                layout
                initial={false}
                animate={{ x: pos.x, y: pos.y, scale: pos.scale, opacity: pos.opacity, zIndex: pos.zIndex }}
                transition={{ duration: 0.6, ease: framerEase }}
                onClick={() => goTo(i)}
                aria-label={stage.title}
                aria-selected={isActive}
                role="option"
                className={clsx(
                  "focus-ring absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-between border text-left transition-colors duration-300",
                  size.card,
                  isActive
                    ? "border-accent-fill bg-accent-fill text-white"
                    : "border-border-subtle bg-surface text-current",
                )}
              >
                <StageIcon
                  title={stage.title}
                  className={clsx(size.icon, isActive ? "text-white" : "text-accent-text")}
                />
                <div>
                  <h3 className={clsx("font-display font-bold tracking-tight", size.title)}>
                    {stage.title}
                  </h3>
                  <p
                    className={clsx(
                      "mt-3 line-clamp-3 font-body leading-relaxed",
                      size.body,
                      isActive ? "text-white/75" : "text-current/60",
                    )}
                  >
                    {stage.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous stage"
          className="focus-ring flex h-10 w-10 items-center justify-center border border-border-strong text-current transition-colors duration-300 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
        >
          <Arrow direction="left" />
        </button>

        <div className="flex items-center gap-2" role="tablist">
          {processStages.map((stage, i) => (
            <button
              key={stage.index}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${stage.title}`}
              onClick={() => goTo(i)}
              className={clsx(
                "h-1.5 transition-all duration-300",
                i === activeIndex ? "w-6 bg-accent-fill" : "w-1.5 border border-border-strong",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next stage"
          className="focus-ring flex h-10 w-10 items-center justify-center border border-border-strong text-current transition-colors duration-300 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
        >
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  );
}

export function Process() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Section id="process">
      <Container>
        <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          Discover. Design. Produce. Deliver.
        </h2>

        <div ref={ref} className="mt-16">
          {/* Desktop/tablet: a rotating arc, the active stage centered up top. */}
          <div className="hidden md:block">
            <ProcessArcCarousel />
          </div>

          {/* Mobile: not enough width for the arc, so the same order reads top to bottom. */}
          <div className="relative pl-8 md:hidden">
            <div className="absolute left-0 top-1 h-full w-px bg-border-subtle" />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: framerEase }}
              className="absolute left-0 top-1 h-full w-px origin-top bg-accent-fill"
            />
            <div className="flex flex-col gap-16">
              {processStages.map((stage, i) => (
                <motion.div
                  key={stage.index}
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.32, ease: framerEase }}
                >
                  <span className="absolute -left-8 -top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center border border-accent-fill bg-background">
                    <StageIcon title={stage.title} className="h-4 w-4 text-accent-text" />
                  </span>
                  <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {stage.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-sm text-current/65 sm:text-base">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
