import { cache } from "react";
import { urlForImage, type SanityImage } from "@/lib/sanity/client";
import { fetchWithFallback } from "@/lib/sanity/fetchWithFallback";
import { workItems as workItemsEnLocal, type WorkItem } from "@/lib/content/work";
import { workItems as workItemsKriLocal } from "@/lib/content/work.kri";
import { caseStudies as caseStudiesEnLocal, type CaseStudy } from "@/lib/content/case-studies";
import { caseStudies as caseStudiesKriLocal } from "@/lib/content/case-studies.kri";

type SanityLocaleString = { en: string; kri: string };
type SanityLocaleText = { en: string; kri: string };

type SanityWorkItem = {
  _id: string;
  title: string;
  slug: { current: string };
  hoverTitle?: string;
  category: WorkItem["category"];
  description: SanityLocaleText;
  client?: string;
  variant: WorkItem["variant"];
  size?: WorkItem["size"];
  hasCaseStudy?: boolean;
  restingImage?: SanityImage;
  hoverImage?: SanityImage;
  imageFit?: WorkItem["imageFit"];
  imagePadding?: string;
  hoverImageSize?: string;
};

type SanityCaseStudyMedia = { variant: "video" | "photo"; label: SanityLocaleString; category?: string };
type SanityImpactStat = { stat: string; label: SanityLocaleString };

type SanityCaseStudy = {
  slug: { current: string };
  year?: string;
  heroMedia: SanityCaseStudyMedia;
  useWorkItemImage: boolean;
  overview: SanityLocaleText;
  gallery: SanityCaseStudyMedia[];
  impact: SanityImpactStat[];
  workItem: { title: string; category: WorkItem["category"]; client?: string } | null;
};

const WORK_ITEMS_QUERY = `*[_type == "workItem"] | order(order asc) {
  _id, title, slug, hoverTitle, category, description, client, variant, size,
  hasCaseStudy, restingImage, hoverImage, imageFit, imagePadding, hoverImageSize
}`;

const CASE_STUDIES_QUERY = `*[_type == "caseStudy"] {
  slug, year, heroMedia, useWorkItemImage, overview, gallery, impact,
  workItem -> { title, category, client }
}`;

function toWorkItem(row: SanityWorkItem, lang: "en" | "kri"): WorkItem {
  return {
    slug: row.slug.current,
    title: row.title,
    hoverTitle: row.hoverTitle,
    category: row.category,
    description: row.description[lang],
    client: row.client,
    variant: row.variant,
    size: row.size,
    hasCaseStudy: row.hasCaseStudy,
    restingImage: urlForImage(row.restingImage),
    hoverImage: urlForImage(row.hoverImage),
    imageFit: row.imageFit,
    imagePadding: row.imagePadding,
    hoverImageSize: row.hoverImageSize,
  };
}

function toCaseStudy(row: SanityCaseStudy, lang: "en" | "kri"): CaseStudy | null {
  if (!row.workItem) return null;
  return {
    slug: row.slug.current,
    title: row.workItem.title,
    category: row.workItem.category,
    client: row.workItem.client,
    year: row.year,
    heroMedia: { variant: row.heroMedia.variant, label: row.heroMedia.label[lang] },
    realHero: row.useWorkItemImage,
    overview: row.overview[lang],
    gallery: row.gallery.map((item) => ({
      variant: item.variant,
      label: item.label[lang],
      category: item.category,
    })),
    impact: row.impact.map((item) => ({ stat: item.stat, label: item.label[lang] })),
  };
}

/** All Work items (the /work grid and the client-spread), in both languages. */
export const getWorkItems = cache(async (): Promise<{ en: WorkItem[]; kri: WorkItem[] }> => {
  const rows = await fetchWithFallback<SanityWorkItem[]>(WORK_ITEMS_QUERY, []);
  if (rows.length === 0) return { en: workItemsEnLocal, kri: workItemsKriLocal };
  return {
    en: rows.map((row) => toWorkItem(row, "en")),
    kri: rows.map((row) => toWorkItem(row, "kri")),
  };
});

/** All Case-study pages, in both languages. */
export const getCaseStudies = cache(async (): Promise<{ en: CaseStudy[]; kri: CaseStudy[] }> => {
  const rows = await fetchWithFallback<SanityCaseStudy[]>(CASE_STUDIES_QUERY, []);
  if (rows.length === 0) return { en: caseStudiesEnLocal, kri: caseStudiesKriLocal };
  return {
    en: rows.map((row) => toCaseStudy(row, "en")).filter((study) => study !== null),
    kri: rows.map((row) => toCaseStudy(row, "kri")).filter((study) => study !== null),
  };
});
