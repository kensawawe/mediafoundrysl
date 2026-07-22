"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Slate } from "@/components/ui/Slate";
import { PourOverlay } from "@/components/ui/PourOverlay";
import { FadeIn } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { workItems } from "@/lib/content/work";

/**
 * "The Cast Wall" — asymmetric contact-sheet grid (a few hero-sized cells
 * among standard ones). Hover pours an ember wash over each frame — the
 * signature reveal used consistently across every work thumbnail.
 */
export function WorkWall() {
  return (
    <Section id="work" tone="inverse">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-6xl">
              The Cast Wall
            </h2>
          </div>
          <Button
            href="/work"
            variant="outline"
            className="border-current/30 text-current hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
          >
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
                  className="focus-ring group relative block"
                >
                  <Slate
                    label={item.title}
                    category={item.category}
                    variant={item.variant}
                    aspect={isLarge ? "aspect-square md:aspect-[4/3]" : "aspect-[4/5] md:aspect-square"}
                  />
                  <PourOverlay>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
                      {item.category}
                    </span>
                    <h3 className="font-display text-xl font-black leading-tight text-paper sm:text-2xl">
                      {item.title}
                    </h3>
                  </PourOverlay>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
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
