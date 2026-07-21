"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { services } from "@/lib/content/services";

export function Services() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section>
      <Container>
        <SlateTag>Capabilities</SlateTag>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
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
                  className="focus-ring flex w-full items-center gap-6 border-b border-border-subtle py-7 text-left"
                  aria-expanded={open}
                >
                  <span className="font-mono text-sm text-accent-text">{service.code}</span>
                  <span className="flex-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {service.title}
                  </span>
                  <span className="hidden font-body text-sm text-current/50 sm:block">
                    {service.description}
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
                    <ul className="flex flex-wrap gap-x-8 gap-y-2 pb-8 pl-12 font-body text-sm text-current/70">
                      {service.examples.map((ex) => (
                        <li key={ex}>{ex}</li>
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
