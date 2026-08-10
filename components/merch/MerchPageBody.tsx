"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { IgniteRule } from "@/components/ui/IgniteRule";
import { Slate } from "@/components/ui/Slate";
import { FadeIn, RevealLines } from "@/components/ui/RevealText";
import {
  merchItems as merchItemsEn,
  merchHero as merchHeroEn,
  merchCopy as merchCopyEn,
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

  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SlateTag>{merchHero.eyebrow}</SlateTag>
          <h1 className="mt-5 max-w-3xl font-display text-6xl font-black uppercase leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
            <RevealLines lines={[merchHero.title]} onMount />
          </h1>
          <p className="mt-8 max-w-md font-body text-base text-current/60 sm:text-lg">
            {merchHero.body}
          </p>
        </Container>
      </div>

      <Section className="pt-0">
        <Container>
          <IgniteRule />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {merchItems.map((item, i) => (
              <FadeIn key={item.slug} delay={i * 0.04}>
                {/* Fixed white/ink pairing (not theme tokens) — the product
                    card is meant to read like a catalogue print regardless
                    of the site's own light/dark toggle, matching the
                    existing "contain"-logo card treatment elsewhere. */}
                <div className="group border border-border-strong bg-white p-3 pb-5 text-center">
                  <div className="overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105">
                    <Slate
                      label={item.name}
                      variant="photo"
                      aspect="aspect-square"
                      grainOpacity={0.05}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-base italic font-bold uppercase tracking-tight text-ink sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-body text-sm text-ink/50">{copy.comingSoon}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
