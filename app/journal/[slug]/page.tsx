import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageBody } from "@/components/journal/ArticlePageBody";
import { articles } from "@/lib/content/journal";
import { site } from "@/lib/content/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — ${site.name}`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return <ArticlePageBody article={article} />;
}
