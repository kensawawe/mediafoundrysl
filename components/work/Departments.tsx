"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { services } from "@/lib/content/services";

function DepartmentIcon({ title, className }: { title: string; className?: string }) {
  const shared = {
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    fill: "none",
  };

  switch (title) {
    case "Production":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="5.5" width="12" height="8" {...shared} />
          <path d="M5.5 5.5L7 3h2l1.5 2.5" {...shared} />
          <circle cx="8" cy="9.5" r="2.1" {...shared} />
        </svg>
      );
    case "Creative":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <path d="M3 13l.7-3.5L10 3l3 3-6.3 6.3L3 13z" {...shared} />
          <path d="M8.5 4.5l3 3" {...shared} />
        </svg>
      );
    case "Strategy":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <circle cx="8" cy="8" r="5.5" {...shared} />
          <circle cx="8" cy="8" r="2.4" {...shared} />
          <circle cx="8" cy="8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Development":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="3.5" width="12" height="8" {...shared} />
          <path d="M2 6h12" {...shared} />
          <path d="M6 13.5h4" {...shared} />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * The department accordion previously lived on the homepage (see
 * DepartmentGrid for its purely-visual replacement there). Moved here
 * as-is so the full detail — description and example services per
 * department — stays available somewhere on the site.
 */
export function Departments() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section>
      <Container>
        <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          Four departments. One floor.
        </h2>

        <div className="mt-14 border-t border-border-subtle">
          {services.map((service, i) => {
            const open = openIndex === i;
            return (
              <FadeIn key={service.code} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="focus-ring flex w-full items-start gap-5 border-b border-border-subtle py-7 text-left sm:items-center sm:gap-6"
                  aria-expanded={open}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent-fill/40 text-accent-text">
                    <DepartmentIcon title={service.title} className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {service.title}
                    </span>
                    <span className="mt-1 block max-w-md font-body text-sm text-current/50">
                      {service.description}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={clsx(
                      "font-mono text-lg transition-transform duration-300",
                      open ? "rotate-45" : "rotate-0",
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  className={clsx(
                    "grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="min-h-0">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 pb-8 pl-14 font-body text-sm text-current/70 sm:grid-cols-2 sm:pl-[4.75rem]">
                      {service.examples.map((ex) => (
                        <li key={ex} className="flex items-baseline gap-2.5">
                          <span aria-hidden className="h-1 w-1 shrink-0 translate-y-[-2px] bg-accent-fill" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
