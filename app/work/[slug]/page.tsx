import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPageBody } from "@/components/case-study/CaseStudyPageBody";
import { site } from "@/lib/content/site";
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
    title: `${study.title} — ${site.name}`,
    description: study.overview,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [caseStudies, workItems] = await Promise.all([getCaseStudies(), getWorkItems()]);
  const study = caseStudies.en.find((s) => s.slug === slug);
  if (!study) notFound();

  return <CaseStudyPageBody study={study} caseStudies={caseStudies} workItems={workItems.en} />;
}
