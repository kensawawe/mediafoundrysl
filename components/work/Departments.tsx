"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { services as servicesEn, servicesSectionHeading as headingEn } from "@/lib/content/services";
import { services as servicesKri, servicesSectionHeading as headingKri } from "@/lib/content/services.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// Keyed by the language-invariant department code, not the (translated)
// title — a title switch would silently drop every icon once translated.
function DepartmentIcon({ code, className }: { code: string; className?: string }) {
  const shared = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    fill: "none",
  };

  switch (code) {
    case "PR":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="5.5" width="12" height="8" {...shared} />
          <path d="M5.5 5.5L7 3h2l1.5 2.5" {...shared} />
          <circle cx="8" cy="9.5" r="2.1" {...shared} />
        </svg>
      );
    case "CR":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <path d="M3 13l.7-3.5L10 3l3 3-6.3 6.3L3 13z" {...shared} />
          <path d="M8.5 4.5l3 3" {...shared} />
        </svg>
      );
    case "ST":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="8" cy="8" r="5.5" {...shared} />
          <circle cx="8" cy="8" r="2.4" {...shared} />
          <circle cx="8" cy="8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "DV":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="3.5" width="12" height="8" {...shared} />
          <path d="M2 6h12" {...shared} />
          <path d="M6 13.5h4" {...shared} />
        </svg>
      );
    case "DG":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="3.5" cy="12.5" r="1.3" fill="currentColor" stroke="none" />
          <path d="M6.5 12.5c0-2.8 2.2-5 5-5" {...shared} />
          <path d="M6.5 12.5c0-4.7 3.8-8.5 8.5-8.5" {...shared} />
        </svg>
      );
    case "RI":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="6.5" cy="6.5" r="4.5" {...shared} />
          <path d="M13 13l-3.6-3.6" {...shared} />
        </svg>
      );
    default:
      return null;
  }
}

const AUTOPLAY_INTERVAL = 4000;
const TICK_MS = 100;

/**
 * Auto-advancing department showcase — replaced the plain accordion with a
 * stepped list (click or wait) paired with a cross-fading photo, so the
 * six departments read as one continuous story instead of six flat rows.
 */
export function Departments() {
  const services = useTranslated(servicesEn, servicesKri);
  const heading = useTranslated(headingEn, headingKri);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + (100 * TICK_MS) / AUTOPLAY_INTERVAL;
        setActive((i) => (i + 1) % services.length);
        return 0;
      });
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [services.length]);

  function selectStep(i: number) {
    setActive(i);
    setProgress(0);
  }

  const activeService = services[active];

  return (
    <Section>
      <Container>
        <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          {heading}
        </h2>

        <FadeIn className="mt-14 grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="order-2 md:order-1">
            {services.map((service, i) => {
              const isActive = i === active;
              return (
                <button
                  key={service.code}
                  type="button"
                  onClick={() => selectStep(i)}
                  aria-current={isActive}
                  aria-expanded={isActive}
                  className="focus-ring flex w-full items-start gap-5 border-b border-border-subtle py-5 text-left sm:items-center sm:gap-6"
                >
                  <span
                    className={clsx(
                      "flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-300",
                      isActive
                        ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                        : "border-border-subtle text-foreground/40",
                    )}
                  >
                    <DepartmentIcon code={service.code} className="h-4 w-4" />
                  </span>

                  <span className="flex-1">
                    <span
                      className={clsx(
                        "block font-display text-xl font-bold tracking-tight transition-colors duration-300 sm:text-2xl",
                        isActive ? "text-foreground" : "text-foreground/40",
                      )}
                    >
                      {service.title}
                    </span>

                    <div
                      className={clsx(
                        "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="min-h-0">
                        <p className="mt-2 font-body text-sm text-foreground/60">
                          {service.description}
                        </p>
                        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                          {service.examples.map((ex) => (
                            <li
                              key={ex}
                              className="flex items-baseline gap-2.5 font-body text-sm text-foreground/50"
                            >
                              <span
                                aria-hidden
                                className="h-1 w-1 shrink-0 translate-y-[-2px] bg-accent-fill"
                              />
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl bg-ink md:order-2">
            {services.map((service) => (
              <img
                key={service.code}
                src={service.image}
                alt={service.title}
                className={clsx(
                  "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-in-out",
                  service.code === activeService.code ? "opacity-100 scale-100" : "opacity-0 scale-105",
                )}
              />
            ))}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
            />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
