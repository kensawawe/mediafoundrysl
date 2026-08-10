"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { Slate } from "@/components/ui/Slate";
import { FadeIn, RevealLines } from "@/components/ui/RevealText";
import {
  merchItems as merchItemsEn,
  merchHero as merchHeroEn,
  merchCopy as merchCopyEn,
  merchCategories,
  formatPrice,
} from "@/lib/content/merch";
import {
  merchItems as merchItemsKri,
  merchHero as merchHeroKri,
  merchCopy as merchCopyKri,
} from "@/lib/content/merch.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function MerchPageBody() {
  const merchHero = useTranslated(merchHeroEn, merchHeroKri);
  const merchItems = useTranslated(merchItemsEn, merchItemsKri);
  const copy = useTranslated(merchCopyEn, merchCopyKri);
  // "All" sits first by position (language-agnostic), same convention as
  // the careers department filter.
  const filters = [copy.all, ...merchCategories];
  const [active, setActive] = useState<string>(copy.all);

  const filtered = active === copy.all ? merchItems : merchItems.filter((item) => item.category === active);

  return (
    <>
      <div className="pt-32 pb-4 md:pt-40 md:pb-6">
        <Container>
          <SlateTag>{merchHero.eyebrow}</SlateTag>
          <h1 className="mt-5 max-w-3xl font-display text-6xl font-black uppercase leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
            <RevealLines lines={[merchHero.title]} onMount />
          </h1>
        </Container>
      </div>

      <Section className="pt-0">
        <Container>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={clsx(
                  "focus-ring border px-4 py-2 font-mono text-xs uppercase tracking-[0.03em] transition-colors",
                  active === filter
                    ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                    : "border-border-subtle hover:border-accent-text hover:text-accent-text",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* isolate + generous row-gap keeps a hovered card's scale-up
              from visually overlapping the row below it, since the scale
              transform doesn't participate in grid layout/reflow. */}
          <div className="isolate mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {filtered.map((item, i) => (
              <FadeIn key={item.slug} delay={i * 0.04}>
                <Link
                  href={`/merch/${item.slug}`}
                  className="focus-ring group relative block text-center transition-transform duration-250 ease-out hover:z-10 hover:scale-[1.03]"
                >
                  {/* Fixed white/ink pairing (not theme tokens) — the
                      product card is meant to read like a catalogue print
                      regardless of the site's own light/dark toggle,
                      matching the existing "contain"-logo card treatment
                      elsewhere. */}
                  <div className="border border-border-strong bg-white p-3 pb-5 transition-colors duration-250 group-hover:border-accent-fill">
                    <div className="overflow-hidden">
                      <Slate
                        label={item.name}
                        variant="photo"
                        aspect="aspect-[4/5]"
                        grainOpacity={0.05}
                      />
                    </div>
                    <h3 className="mt-4 font-display text-base italic font-bold uppercase tracking-tight text-ink sm:text-lg">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-ink/60">{formatPrice(item.price)}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
