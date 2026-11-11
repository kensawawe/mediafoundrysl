"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/RevealText";
import { WorkThumb } from "@/components/work/WorkThumb";
import {
  caseStudiesPublic,
  featuredWorkSlugs,
  portfolioCategories,
  portfolioCategoriesFor,
  workCopy as workCopyEn,
  type PortfolioCategory,
  type WorkItem,
} from "@/lib/content/work";
import { workCopy as workCopyKri } from "@/lib/content/work.kri";
import { useTranslated } from "@/lib/content/useTranslated";

const isDev = process.env.NODE_ENV === "development";

/** Featured projects first (in featured order), then everything else in its existing order. */
function ordered(items: WorkItem[]) {
  const rank = (slug: string) => {
    const i = featuredWorkSlugs.indexOf(slug);
    return i === -1 ? featuredWorkSlugs.length : i;
  };
  return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
}

function Card({ item, lead }: { item: WorkItem; lead?: boolean }) {
  const clickable = !!item.hasCaseStudy && (caseStudiesPublic || isDev);
  const body = (
    <>
      <div className="relative overflow-hidden rounded-2xl">
        <WorkThumb item={item} aspect={lead ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"} className="rounded-2xl" />
      </div>
      <p className="mt-4 font-godthem text-[11px] uppercase tracking-[0.08em] text-accent-text">
        {portfolioCategoriesFor(item).join(" · ")}
      </p>
      <h2
        className={clsx(
          "mt-2 font-godthem font-normal uppercase leading-snug tracking-[0.02em]",
          lead ? "text-2xl sm:text-3xl" : "text-xl",
        )}
      >
        {item.title}
      </h2>
      <p className={clsx("mt-2 font-body leading-relaxed text-foreground/70", lead ? "max-w-2xl text-base sm:text-lg" : "text-[15px]")}>
        {item.description}
      </p>
    </>
  );

  return (
    <article id={item.slug} className="scroll-mt-28">
      {clickable ? (
        <Link href={`/work/${item.slug}`} className="focus-ring group relative block rounded-2xl">
          {body}
        </Link>
      ) : (
        <div className="group relative">{body}</div>
      )}
    </article>
  );
}

export function WorkIndex({ workItems: workItemsByLang }: { workItems: { en: WorkItem[]; kri: WorkItem[] } }) {
  const workItems = ordered(useTranslated(workItemsByLang.en, workItemsByLang.kri));
  const copy = useTranslated(workCopyEn, workCopyKri);
  const [filter, setFilter] = useState<PortfolioCategory | null>(null);

  // Only offer categories that have at least one project.
  const used = portfolioCategories.filter((c) => workItems.some((i) => portfolioCategoriesFor(i).includes(c)));
  const shown = filter ? workItems.filter((i) => portfolioCategoriesFor(i).includes(filter)) : workItems;
  const [lead, ...rest] = shown;

  const chip = (active: boolean) =>
    clsx(
      "focus-ring rounded-full border px-4 py-2 font-godthem text-xs uppercase tracking-[0.06em] transition-colors",
      active
        ? "border-foreground bg-foreground text-background"
        : "border-border-subtle text-foreground/75 hover:border-accent-fill hover:text-foreground",
    );

  return (
    <div className="pb-20 pt-32 md:pb-28 md:pt-40">
      <Container>
        <header className="max-w-3xl">
          <h1 className="font-godthem text-5xl font-normal uppercase leading-[1] tracking-[0.02em] sm:text-6xl md:text-7xl">
            {copy.workPageHeading}
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-foreground/75">{copy.workPageIntro}</p>
        </header>

        <div role="group" aria-label="Filter projects by category" className="mt-10 flex flex-wrap gap-2">
          <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)} className={chip(filter === null)}>
            {copy.allWork}
          </button>
          {used.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className={chip(filter === c)}>
              {c}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>

        {lead ? (
          <div className="mt-12">
            <FadeIn key={`lead-${lead.slug}`}>
              <Card item={lead} lead />
            </FadeIn>
            {rest.length > 0 && (
              <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((item, i) => (
                  <FadeIn key={`${filter}-${item.slug}`} delay={(i % 3) * 0.05} className="min-w-0">
                    <Card item={item} />
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-12 font-body text-foreground/60">{copy.emptyCategory}</p>
        )}
      </Container>
    </div>
  );
}
