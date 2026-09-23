import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { getCaseStudies } from "@/lib/sanity/content/work";
import { getJournalArticles } from "@/lib/sanity/content/journal";

export const dynamic = "force-static";

const base = site.url;

// /merch is a soft-launch preview — deliberately excluded here (and
// noindexed on its own pages, see app/merch/page.tsx) until it's ready to
// announce.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ en: caseStudies }, { en: articles }] = await Promise.all([getCaseStudies(), getJournalArticles()]);

  const staticRoutes = ["", "/about", "/work", "/journal", "/careers"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${base}/work/${study.slug}`,
    lastModified: new Date(),
  }));

  const journalRoutes = articles.map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...journalRoutes];
}
