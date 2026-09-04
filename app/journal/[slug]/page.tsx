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
    alternates: { canonical: `/journal/${article.slug}` },
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

  // `date` is only ever stored at month precision (e.g. "May 2026") — the
  // 1st of that month is the most precise ISO date we can honestly claim,
  // rather than fabricating a specific day.
  const datePublished = new Date(`1 ${article.date}`).toISOString().slice(0, 10);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/logo-dark.png`,
      },
    },
    mainEntityOfPage: `${site.url}/journal/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ArticlePageBody article={article} />
    </>
  );
}
