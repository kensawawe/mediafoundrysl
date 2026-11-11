"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { pillars, pillarsSection } from "@/lib/content/positioning";

const EASE = "cubic-bezier(0.65,0,0.35,1)";

function subscribe(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function useMedia(query: string, serverValue: boolean) {
  return useSyncExternalStore(subscribe(query), () => window.matchMedia(query).matches, () => serverValue);
}

/**
 * What We Do: Strategy, Production, Storytelling as three tiles. Hovering
 * (or focusing) a tile grows it to 3fr and squeezes the other two to 1fr,
 * the same interaction as the earlier department grid. On touch screens the
 * tiles stack; the first tap opens a tile, the second follows its link.
 */
export function Pillars() {
  const [active, setActive] = useState<number | null>(null);
  const hoverCapable = useMedia("(hover: hover)", true);
  const wide = useMedia("(min-width: 768px)", true);

  const columns =
    active === null ? "1fr 1fr 1fr" : pillars.map((_, i) => (i === active ? "3fr" : "1fr")).join(" ");

  return (
    <Section id="what-we-do" className="awareness-keep-blue mt-16 bg-surface md:mt-24">
      <Container>
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            {pillarsSection.heading}
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-foreground/60 sm:text-lg">{pillarsSection.subheading}</p>
        </FadeIn>

        <div
          className="mt-14 flex flex-col gap-3 md:grid md:h-[440px] md:gap-5 lg:h-[480px]"
          style={
            wide
              ? { gridTemplateColumns: columns, transition: `grid-template-columns 0.5s ${EASE}`, contain: "layout" }
              : undefined
          }
          onMouseLeave={hoverCapable ? () => setActive(null) : undefined}
        >
          {pillars.map((pillar, i) => {
            const isActive = active === i;
            return (
              <Link
                key={pillar.id}
                href={`/services#${pillar.id}`}
                className={clsx(
                  "focus-ring flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-background text-left transition-colors duration-300 md:h-full",
                  isActive ? "border-accent-fill" : "border-border-subtle",
                )}
                onMouseEnter={hoverCapable ? () => setActive(i) : undefined}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={(e) => {
                  // Touch: the first tap opens the tile, the next one follows the link.
                  if (!hoverCapable && !isActive) {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <div className="relative aspect-[900/636] overflow-hidden bg-white md:aspect-auto md:min-h-0 md:flex-1">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
                  <img
                    src={pillar.illustration}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={636}
                    className="absolute inset-0 h-full w-full scale-[1.28] object-contain"
                  />
                </div>

                <div className="flex-none border-t border-border-subtle">
                  <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[0.65rem] font-bold text-background"
                    >
                      {pillar.number}
                    </span>
                    <span className="truncate font-godthem text-sm font-normal uppercase tracking-[0.04em] text-foreground sm:text-base">
                      {pillar.name}
                    </span>
                  </div>

                  <div
                    className="grid"
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr", transition: `grid-template-rows 0.5s ${EASE}` }}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-2 px-4 pb-4 sm:px-5 sm:pb-5">
                        <p className="font-godthem text-base uppercase tracking-[0.03em]">{pillar.headline}</p>
                        <p className="font-body text-sm text-foreground/70 sm:text-base">{pillar.summary}</p>
                        <p className="pt-1 font-godthem text-xs uppercase tracking-[0.08em] text-accent-text">
                          More on {pillar.name.toLowerCase()} <span aria-hidden>&rarr;</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
