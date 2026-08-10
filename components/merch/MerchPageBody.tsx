"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { IgniteRule } from "@/components/ui/IgniteRule";
import { Slate } from "@/components/ui/Slate";
import { Button } from "@/components/ui/Button";
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
                <div className="flex h-full flex-col">
                  <Slate
                    label={item.name}
                    category={item.category}
                    variant="photo"
                    aspect="aspect-square"
                    grainOpacity={0.05}
                  />
                  <div className="mt-3 flex flex-1 flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.03em] text-accent-text">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
                      {item.name}
                    </h3>
                    <p className="mt-2 flex-1 font-body text-xs text-current/60 sm:text-sm">
                      {item.description}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      disabled
                      className="mt-4 w-full px-3! py-2.5! text-xs"
                    >
                      {copy.comingSoon}
                    </Button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
