import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Slate } from "@/components/ui/Slate";
import { SlateTag } from "@/components/ui/SlateTag";
import type { CaseStudy } from "@/lib/content/case-studies";

export function CaseStudyHero({ study }: { study: CaseStudy }) {
  return (
    <div className="pt-28 md:pt-32">
      <Container>
        <Link
          href="/work"
          className="focus-ring font-mono text-xs uppercase tracking-[0.14em] text-current/50 hover:text-accent-text"
        >
          ← Back to work
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SlateTag>
              {study.category}
              {study.client ? ` — ${study.client}` : ""}
            </SlateTag>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              {study.title}
            </h1>
          </div>
          <span className="font-mono text-sm text-current/50">{study.year}</span>
        </div>
      </Container>

      <div className="mt-10">
        <Slate
          label={study.title}
          category={study.category}
          variant={study.heroMedia.variant}
          aspect="aspect-[16/9] md:aspect-[21/9]"
        />
      </div>
    </div>
  );
}
