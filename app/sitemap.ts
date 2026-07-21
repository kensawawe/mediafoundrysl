import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content/case-studies";

export const dynamic = "force-static";

const base = "https://www.themediafoundry.sl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/work", "/journal", "/careers"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${base}/work/${study.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
