"use client";

import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Overview } from "@/components/case-study/Overview";
import { ChallengeApproach } from "@/components/case-study/ChallengeApproach";
import { ProcessJourney } from "@/components/case-study/ProcessJourney";
import { Gallery } from "@/components/case-study/Gallery";
import { Outcome } from "@/components/case-study/Outcome";
import { caseStudies as caseStudiesEn, type CaseStudy } from "@/lib/content/case-studies";
import { caseStudies as caseStudiesKri } from "@/lib/content/case-studies.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// `study` is the server-resolved English case study (guaranteed to exist —
// the page already 404s otherwise); this only needs to swap in the
// same-slug Krio version when that language is active.
export function CaseStudyPageBody({ study }: { study: CaseStudy }) {
  const caseStudies = useTranslated(caseStudiesEn, caseStudiesKri);
  const translated = caseStudies.find((s) => s.slug === study.slug) ?? study;

  return (
    <>
      <CaseStudyHero study={translated} />
      <Overview study={translated} />
      <ChallengeApproach study={translated} />
      <ProcessJourney study={translated} />
      <Gallery study={translated} />
      <Outcome study={translated} />
    </>
  );
}
