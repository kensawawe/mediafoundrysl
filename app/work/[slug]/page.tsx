import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPageBody } from "@/components/case-study/CaseStudyPageBody";
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
    alternates: { canonical: `/work/${study.slug}` },
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

  return <CaseStudyPageBody study={study} />;
}
