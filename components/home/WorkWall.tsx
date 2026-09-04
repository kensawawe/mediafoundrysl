"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WorkThumb } from "@/components/work/WorkThumb";
import { FadeIn } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { workItems as workItemsEn, workCopy as workCopyEn } from "@/lib/content/work";
import { workItems as workItemsKri, workCopy as workCopyKri } from "@/lib/content/work.kri";
import { useTranslated } from "@/lib/content/useTranslated";

/**
 * "The Cast Wall" — uniform contact-sheet grid. Hover pours an ember wash
 * over each frame — the signature reveal used consistently across every
 * work thumbnail.
 */
export function WorkWall() {
  const workItems = useTranslated(workItemsEn, workItemsKri);
  const copy = useTranslated(workCopyEn, workCopyKri);

  return (
    <Section id="work" className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="border-t border-current/15 mb-12" />

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-6xl">
              {copy.castWallHeading}
            </h2>
          </div>
          <Button
            href="/work"
            variant="outline"
            className="border-current/30! text-current! hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
          >
            {copy.viewAllWork}
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 px-12 sm:px-20 md:grid-cols-4 md:gap-4 md:px-32 lg:px-48">
          {workItems.slice(0, 8).map((item, i) => (
            <FadeIn key={item.slug} delay={i * 0.05}>
              <Link
                href={item.hasCaseStudy ? `/work/${item.slug}` : "/work"}
                className="focus-ring group relative block"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <WorkThumb
                    item={item}
                    aspect="aspect-[4/5] md:aspect-square"
                    className="rounded-2xl"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-sm font-bold leading-tight tracking-tight sm:text-base">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
