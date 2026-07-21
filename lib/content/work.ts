export type WorkCategory =
  | "Brand Identity"
  | "Campaigns"
  | "Film & Production"
  | "Digital"
  | "Photography"
  | "Social & Content";

export const workCategories: WorkCategory[] = [
  "Brand Identity",
  "Campaigns",
  "Film & Production",
  "Digital",
  "Photography",
  "Social & Content",
];

export type WorkItem = {
  slug: string;
  title: string;
  category: WorkCategory;
  description: string;
  client?: string;
  variant: "video" | "photo";
  /** Contact-sheet grid sizing — a few frames read as "hero" cells among standard ones. */
  size?: "lg" | "md";
  hasCaseStudy?: boolean;
};

export const workItems: WorkItem[] = [
  {
    slug: "northline-rebrand",
    title: "Northline",
    category: "Brand Identity",
    description:
      "A full identity system for a micromobility startup scaling from three cities to thirty.",
    client: "Northline Mobility",
    variant: "photo",
    size: "lg",
    hasCaseStudy: true,
  },
  {
    slug: "verdant-brand-film",
    title: "Verdant",
    category: "Film & Production",
    description:
      "A brand film for a plant-based food company, shot across four working farms.",
    variant: "video",
    size: "md",
  },
  {
    slug: "halyard-launch-campaign",
    title: "Halyard",
    category: "Campaigns",
    description:
      "A category-defining launch campaign for an insurtech built for a new generation of boat owners.",
    client: "Halyard Insurance",
    variant: "video",
    size: "md",
    hasCaseStudy: true,
  },
  {
    slug: "meridian-portraits",
    title: "Meridian Health",
    category: "Photography",
    description:
      "An ongoing photographic study of frontline clinicians for a healthcare network's people-first rebrand.",
    variant: "photo",
    size: "lg",
  },
  {
    slug: "cast-and-co-digital",
    title: "Cast & Co.",
    category: "Digital",
    description:
      "A commerce-ready site and design system for a direct-to-consumer homeware brand.",
    variant: "photo",
    size: "md",
    hasCaseStudy: true,
  },
  {
    slug: "aster-social-series",
    title: "Aster",
    category: "Social & Content",
    description:
      "A short-form content system built for a beauty brand's always-on social calendar.",
    variant: "photo",
    size: "md",
  },
  {
    slug: "pennant-hotels-campaign",
    title: "Pennant Hotels",
    category: "Campaigns",
    description:
      "A rebrand and launch campaign for a boutique hospitality group's first ten properties.",
    variant: "video",
    size: "md",
  },
  {
    slug: "lowline-documentary",
    title: "Lowline",
    category: "Film & Production",
    description:
      "A short documentary on the makers behind an independent audio-equipment manufacturer.",
    variant: "video",
    size: "md",
  },
];
