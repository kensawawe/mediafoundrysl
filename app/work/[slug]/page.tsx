import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { Overview } from "@/components/case-study/Overview";
import { ChallengeApproach } from "@/components/case-study/ChallengeApproach";
import { ProcessJourney } from "@/components/case-study/ProcessJourney";
import { Gallery } from "@/components/case-study/Gallery";
import { Outcome } from "@/components/case-study/Outcome";
import { caseStudies } from "@/lib/content/case-studies";
import { site } from "@/lib/content/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} — ${site.name}`,
    description: study.overview,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <>
      <CaseStudyHero study={study} />
      <Overview study={study} />
      <ChallengeApproach study={study} />
      <ProcessJourney study={study} />
      <Gallery study={study} />
      <Outcome study={study} />
    </>
  );
}
