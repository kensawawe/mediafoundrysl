"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Section, Eyebrow } from "@/components/ui/Section";
import { services } from "@/lib/content/services";

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <Section className="border-b border-border-subtle">
      <Eyebrow>What we do</Eyebrow>
      <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
        Four pillars. One craft.
      </h2>

      <div className="mt-14 border-t border-border-subtle">
        {services.map((service, i) => {
          const isActive = active === i;
          return (
            <div key={service.index} className="border-b border-border-subtle">
              <button
                type="button"
                aria-expanded={isActive}
                onClick={() => setActive(isActive ? -1 : i)}
                className="focus-ring flex w-full items-center gap-6 py-7 text-left transition-colors md:gap-10"
              >
                <span className="font-body text-sm text-foreground/40">
                  {service.index}
                </span>
                <span
                  className={clsx(
                    "flex-1 font-display text-3xl tracking-tight transition-colors sm:text-4xl md:text-5xl",
                    isActive ? "text-accent-green-ink" : "text-foreground",
                  )}
                >
                  {service.title}
                </span>
                <span className="hidden max-w-xs font-body text-sm text-foreground/55 md:block">
                  {service.description}
                </span>
                <span
                  aria-hidden
                  className={clsx(
                    "shrink-0 font-body text-2xl text-foreground/40 transition-transform duration-300",
                    isActive && "rotate-45 text-accent-green-ink",
                  )}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-3 pb-8 pl-0 md:pl-[4.5rem]">
                      <p className="mb-1 w-full font-body text-sm text-foreground/55 md:hidden">
                        {service.description}
                      </p>
                      {service.examples.map((example) => (
                        <span
                          key={example}
                          className="rounded-full border border-border-subtle px-4 py-2 font-body text-sm text-foreground/75"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
