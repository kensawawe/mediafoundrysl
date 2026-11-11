"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WorkThumb } from "@/components/work/WorkThumb";
import { FadeIn } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import {
  caseStudiesPublic,
  featuredWorkSlugs,
  portfolioCategoriesFor,
  workCopy as workCopyEn,
  type WorkItem,
} from "@/lib/content/work";
import { workCopy as workCopyKri } from "@/lib/content/work.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// Case-study pages stay unpublished until `caseStudiesPublic` is switched on.
// Until then each card links to the project's entry on the Work page (in dev
// it opens the case study, so the pages can still be worked on).
const isDev = process.env.NODE_ENV === "development";

export function workHref(item: WorkItem) {
  return item.hasCaseStudy && (caseStudiesPublic || isDev) ? `/work/${item.slug}` : `/work#${item.slug}`;
}

/** Pick the featured projects, in the featured order; fall back to the first six. */
function pickFeatured(items: WorkItem[]) {
  const bySlug = new Map(items.map((i) => [i.slug, i]));
  const featured = featuredWorkSlugs.map((s) => bySlug.get(s)).filter((i): i is WorkItem => !!i);
  return featured.length >= 4 ? featured : items.slice(0, 6);
}

/** Selected Work: 4–6 projects with category, a line of description and a link. */
export function WorkWall({ workItems: workItemsByLang }: { workItems: { en: WorkItem[]; kri: WorkItem[] } }) {
  const workItems = useTranslated(workItemsByLang.en, workItemsByLang.kri);
  const copy = useTranslated(workCopyEn, workCopyKri);
  const featured = pickFeatured(workItems);

  return (
    <Section id="work" className="pb-0 md:pb-0">
      <Container>
        <div aria-hidden className="mb-12 border-t border-current/15" />

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-belmonte text-xl uppercase tracking-[-0.02em] text-accent-text sm:text-2xl">
              {copy.workPageHeading}
            </span>
            <h2 className="mt-5 text-balance font-godthem text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl md:text-5xl">
              {copy.selectedWorkHeading}
            </h2>
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-foreground/70 sm:text-lg">
              {copy.selectedWorkIntro}
            </p>
          </div>
          <Button
            href="/work"
            variant="outline"
            className="border-current/30! text-current! hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
          >
            {copy.viewAllWork}
          </Button>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <FadeIn key={item.slug} delay={(i % 3) * 0.06} className="min-w-0">
              <Link href={workHref(item)} className="focus-ring group relative block rounded-2xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <WorkThumb item={item} aspect="aspect-[4/3]" className="rounded-2xl" />
                </div>
                <p className="mt-4 font-godthem text-[11px] uppercase tracking-[0.08em] text-accent-text">
                  {portfolioCategoriesFor(item).join(" · ")}
                </p>
                <h3 className="mt-2 font-godthem text-xl font-normal uppercase leading-snug tracking-[0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 font-body text-[15px] leading-relaxed text-foreground/70">
                  {item.description}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
