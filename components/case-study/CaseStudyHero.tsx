"use client";

import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Slate } from "@/components/ui/Slate";
import { SlateTag } from "@/components/ui/SlateTag";
import { caseStudyCopy as copyEn, type CaseStudy } from "@/lib/content/case-studies";
import type { WorkItem } from "@/lib/content/work";
import { caseStudyCopy as copyKri } from "@/lib/content/case-studies.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function CaseStudyHero({ study, workItems }: { study: CaseStudy; workItems: WorkItem[] }) {
  const copy = useTranslated(copyEn, copyKri);
  const work = study.realHero ? workItems.find((w) => w.slug === study.slug) : undefined;
  const contain = work?.imageFit === "contain";

  return (
    <div className="pt-28 md:pt-32">
      <Container>
        <Link
          href="/work"
          className="focus-ring font-mono text-xs uppercase tracking-[0.03em] text-current/50 hover:text-accent-text"
        >
          {copy.backToWork}
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SlateTag>
              {study.category}
              {study.client ? ` — ${study.client}` : ""}
            </SlateTag>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
              {study.title}
            </h1>
          </div>
          {study.year && <span className="font-mono text-sm text-current/50">{study.year}</span>}
        </div>
      </Container>

      <div className="mt-10">
        {work?.restingImage ? (
          <div
            className={clsx(
              "relative isolate aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]",
              contain ? "border-y border-border-strong bg-white" : "bg-ink",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
            <img
              src={work.restingImage}
              alt={study.heroMedia.label}
              className={clsx(
                "absolute inset-0 h-full w-full",
                contain ? clsx("object-contain", work.imagePadding ?? "p-10") : "object-cover",
              )}
            />
          </div>
        ) : (
          <Slate
            label={study.title}
            category={study.category}
            variant={study.heroMedia.variant}
            aspect="aspect-[16/9] md:aspect-[21/9]"
          />
        )}
      </div>
    </div>
  );
}
