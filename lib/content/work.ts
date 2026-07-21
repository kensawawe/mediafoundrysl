export type WorkCategory =
  | "Documentaries"
  | "Brand Films"
  | "Campaigns"
  | "Photography"
  | "Podcasts"
  | "Social Content";

export const workCategories: WorkCategory[] = [
  "Documentaries",
  "Brand Films",
  "Campaigns",
  "Photography",
  "Podcasts",
  "Social Content",
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
    slug: "nwrma-river-basin",
    title: "The River Gave and the River Took",
    category: "Documentaries",
    description:
      "A feature documentary following communities along the NWRMA river basin as they adapt to a changing water system.",
    client: "National Water Resources Management Agency",
    variant: "video",
    size: "lg",
    hasCaseStudy: true,
  },
  {
    slug: "cottage-industries-brand-film",
    title: "Made By Hand",
    category: "Brand Films",
    description:
      "A brand film for a Freetown textile cooperative, shot across three workshops over five days of production.",
    variant: "video",
    size: "md",
  },
  {
    slug: "sea-salt-harvest-campaign",
    title: "Sea Salt Harvest",
    category: "Campaigns",
    description:
      "A nationwide brand campaign for a coastal salt cooperative, built from real harvest-season testimony.",
    client: "Sherbro Salt Collective",
    variant: "video",
    size: "md",
    hasCaseStudy: true,
  },
  {
    slug: "portraits-of-freetown",
    title: "Portraits of Freetown",
    category: "Photography",
    description:
      "An ongoing photographic study of the people, trades and streets that shape the capital.",
    variant: "photo",
    size: "lg",
  },
  {
    slug: "the-foundry-sessions",
    title: "The Foundry Sessions",
    category: "Podcasts",
    description:
      "Long-form conversations with Sierra Leonean founders, artists and organisers, recorded on location.",
    variant: "photo",
    size: "md",
    hasCaseStudy: true,
  },
  {
    slug: "harvest-season-socials",
    title: "Harvest Season",
    category: "Social Content",
    description:
      "A short-form content series built around a cocoa cooperative's harvest, made for reach and for record.",
    variant: "photo",
    size: "md",
  },
  {
    slug: "public-health-voices",
    title: "Every Clinic, Every Voice",
    category: "Campaigns",
    description:
      "A public-health awareness campaign built from real patient and health-worker testimony across six districts.",
    variant: "video",
    size: "md",
  },
  {
    slug: "bunce-island-documentary-short",
    title: "What the Island Remembers",
    category: "Documentaries",
    description:
      "A short documentary on memory, heritage and tourism at Bunce Island, told through the people who guide it.",
    variant: "video",
    size: "md",
  },
];
