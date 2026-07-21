"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { Slate } from "@/components/ui/Slate";
import { FadeIn } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { workItems } from "@/lib/content/work";

/**
 * "Wall of Stories" — asymmetric contact-sheet grid (a few hero-sized cells among
 * standard ones, like a real contact sheet). Deliberately NOT a horizontal
 * drag-rail or pinned ScrollTrigger — see plan for rationale.
 */
export function WorkWall() {
  return (
    <Section id="work" tone="inverse">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SlateTag className="text-white/60">Featured Work</SlateTag>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              Wall of Stories
            </h2>
          </div>
          <Button href="/work" variant="outline" className="border-white/30 text-white hover:border-accent-text hover:text-accent-text">
            View all work
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {workItems.slice(0, 6).map((item, i) => {
            const isLarge = item.size === "lg";
            return (
              <FadeIn
                key={item.slug}
                delay={i * 0.05}
                className={isLarge ? "col-span-2 row-span-2" : "col-span-1"}
              >
                <Link
                  href={item.hasCaseStudy ? `/work/${item.slug}` : "/work"}
                  className="focus-ring group block"
                >
                  <Slate
                    label={item.title}
                    category={item.category}
                    variant={item.variant}
                    aspect={isLarge ? "aspect-square md:aspect-[4/3]" : "aspect-[4/5] md:aspect-square"}
                  />
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg leading-tight tracking-tight sm:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
