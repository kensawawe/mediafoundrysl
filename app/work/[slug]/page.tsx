import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPageBody } from "@/components/case-study/CaseStudyPageBody";
import { site } from "@/lib/content/site";
import type { CaseStudy } from "@/lib/content/case-studies";
import { caseStudiesPublic } from "@/lib/content/work";
import { getCaseStudies, getWorkItems } from "@/lib/sanity/content/work";

export async function generateStaticParams() {
  const { en: caseStudies } = await getCaseStudies();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { en: caseStudies } = await getCaseStudies();
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} | ${site.name}`,
    description: study.overview,
    alternates: { canonical: `/work/${study.slug}` },
    // Unpublished case studies are built but kept out of search until their facts are confirmed.
    ...(caseStudiesPublic ? {} : { robots: { index: false, follow: false } }),
  };
}

// Unconfirmed figures and placeholder gallery frames never leave the build in
// production (not even in the page's embedded data); development keeps them so
// the template can be worked on.
function publishable(study: CaseStudy): CaseStudy {
  if (process.env.NODE_ENV === "development" || study.factsConfirmed) return study;
  return { ...study, impact: [], gallery: study.gallery.filter((g) => g.src) };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [allCaseStudies, workItems] = await Promise.all([getCaseStudies(), getWorkItems()]);
  const caseStudies = { en: allCaseStudies.en.map(publishable), kri: allCaseStudies.kri.map(publishable) };
  const study = caseStudies.en.find((s) => s.slug === slug);
  if (!study) notFound();

  return <CaseStudyPageBody study={study} caseStudies={caseStudies} workItems={workItems.en} />;
}
