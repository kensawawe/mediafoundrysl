import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content/case-studies";
import { articles } from "@/lib/content/journal";
import { site } from "@/lib/content/site";

export const dynamic = "force-static";

const base = site.url;

// /merch is a soft-launch preview — deliberately excluded here (and
// noindexed on its own pages, see app/merch/page.tsx) until it's ready to
// announce.
export default function sitemap(): MetadataRoute.Sitemap {
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
