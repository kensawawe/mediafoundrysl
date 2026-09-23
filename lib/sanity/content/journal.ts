import { cache } from "react";
import { urlForImage, type SanityImage } from "@/lib/sanity/client";
import { fetchWithFallback } from "@/lib/sanity/fetchWithFallback";
import { articles as articlesEnLocal, type Article } from "@/lib/content/journal";
import { articles as articlesKriLocal } from "@/lib/content/journal.kri";

type SanityLocaleString = { en: string; kri: string };
type SanityLocaleText = { en: string; kri: string };
type SanityLocaleParagraphs = { en: string[]; kri: string[] };

type SanityAuthor = {
  name: string;
  role: SanityLocaleString;
  image?: SanityImage;
  socials?: Article["author"]["socials"];
};

type SanityArticle = {
  _id: string;
  title: SanityLocaleString;
  slug: { current: string };
  category: string;
  excerpt: SanityLocaleText;
  readTime: string;
  date: string;
  body: SanityLocaleParagraphs;
  author: SanityAuthor | null;
};

const ARTICLES_QUERY = `*[_type == "journalArticle"] | order(publishedAt desc) {
  _id, title, slug, category, excerpt, readTime, date, body,
  author -> { name, role, image, socials }
}`;

function toArticle(row: SanityArticle, lang: "en" | "kri"): Article {
  return {
    slug: row.slug.current,
    title: row.title[lang],
    category: row.category,
    excerpt: row.excerpt[lang],
    readTime: row.readTime,
    date: row.date,
    body: row.body[lang],
    author: row.author
      ? {
          name: row.author.name,
          role: row.author.role[lang],
          image: urlForImage(row.author.image),
          socials: row.author.socials ?? [],
        }
      : { name: "", role: "", socials: [] },
  };
}

/**
 * All Journal articles, in both languages. `cache()`d so
 * generateStaticParams, generateMetadata and the page body (three separate
 * server calls for the same route, per Next.js's data model) share one
 * Sanity request instead of three.
 */
export const getJournalArticles = cache(async (): Promise<{ en: Article[]; kri: Article[] }> => {
  const rows = await fetchWithFallback<SanityArticle[]>(ARTICLES_QUERY, []);
  if (rows.length === 0) return { en: articlesEnLocal, kri: articlesKriLocal };
  return {
    en: rows.map((row) => toArticle(row, "en")),
    kri: rows.map((row) => toArticle(row, "kri")),
  };
});
