"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { services as servicesEn, servicesSectionHeading as headingEn } from "@/lib/content/services";
import { services as servicesKri, servicesSectionHeading as headingKri } from "@/lib/content/services.kri";
import { useTranslated } from "@/lib/content/useTranslated";

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
    <Section className="pb-0 md:pb-0">
      <Container>
        <h2 className="max-w-2xl font-godthem text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl">
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
                  className="focus-ring flex w-full items-start border-b border-border-subtle py-5 text-left sm:items-center"
                >
                  <span className="flex-1">
                    <span
                      className={clsx(
                        "block font-godthem text-xl font-normal uppercase tracking-[0.04em] transition-colors duration-300 sm:text-2xl",
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
