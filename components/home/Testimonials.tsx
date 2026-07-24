"use client";

import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/lib/content/testimonials";

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

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const handlePrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const visible = useMemo(() => {
    if (total < 3) return [{ item: testimonials[index], position: "center" as const }];
    const left = (index - 1 + total) % total;
    const right = (index + 1) % total;
    return [
      { item: testimonials[left], position: "left" as const },
      { item: testimonials[index], position: "center" as const },
      { item: testimonials[right], position: "right" as const },
    ];
  }, [index, total]);

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            What clients say
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="focus-ring flex h-10 w-10 items-center justify-center border border-border-strong text-current transition-colors duration-300 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="focus-ring flex h-10 w-10 items-center justify-center border border-border-strong text-current transition-colors duration-300 hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-stretch justify-center gap-4 md:flex-row md:mt-16">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(({ item, position }) => {
              const isCenter = position === "center";
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: isCenter ? 1.12 : 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={clsx(
                    "relative flex w-full flex-col justify-between overflow-hidden border p-8 md:w-1/3",
                    position !== "center" && "hidden md:flex",
                    isCenter
                      ? "z-10 border-accent-fill bg-accent-fill text-white"
                      : "border-border-subtle bg-surface text-current",
                  )}
                >
                  {!isCenter && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          position === "left"
                            ? "linear-gradient(to right, var(--color-surface) 0%, transparent 65%)"
                            : "linear-gradient(to left, var(--color-surface) 0%, transparent 65%)",
                      }}
                    />
                  )}
                  <p
                    className={clsx(
                      "font-body text-base leading-relaxed sm:text-lg",
                      !isCenter && "text-current/70",
                    )}
                  >
                    {item.quote}
                  </p>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-lg font-bold tracking-tight">
                        {item.name}
                      </p>
                      <p
                        className={clsx(
                          "mt-1 font-mono text-[11px] uppercase tracking-[0.14em]",
                          isCenter ? "text-white/60" : "text-current/50",
                        )}
                      >
                        {item.role}
                      </p>
                    </div>
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className={clsx(
                        "h-10 w-10 shrink-0 object-contain",
                        !isCenter && "grayscale",
                      )}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
