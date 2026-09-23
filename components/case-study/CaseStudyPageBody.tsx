"use client";

import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Overview } from "@/components/case-study/Overview";
import { Gallery } from "@/components/case-study/Gallery";
import { Outcome } from "@/components/case-study/Outcome";
import type { CaseStudy } from "@/lib/content/case-studies";
import type { WorkItem } from "@/lib/content/work";
import { useTranslated } from "@/lib/content/useTranslated";

// `study` is the server-resolved English case study (guaranteed to exist —
// the page already 404s otherwise); this only needs to swap in the
// same-slug Krio version when that language is active. `workItems` (English
// only — its image fields aren't language-specific) is passed through to
// CaseStudyHero for the "use the work item's real image" hero option.
export function CaseStudyPageBody({
  study,
  caseStudies: caseStudiesByLang,
  workItems,
}: {
  study: CaseStudy;
  caseStudies: { en: CaseStudy[]; kri: CaseStudy[] };
  workItems: WorkItem[];
}) {
  const caseStudies = useTranslated(caseStudiesByLang.en, caseStudiesByLang.kri);
  const translated = caseStudies.find((s) => s.slug === study.slug) ?? study;

  return (
    <>
      <CaseStudyHero study={translated} workItems={workItems} />
      <Overview study={translated} />
      <Gallery study={translated} />
      <Outcome study={translated} />
    </>
  );
}
