export type WorkCategory =
  | "Documentaries"
  | "Brand Films"
  | "Campaigns"
  | "Photography"
  | "Podcasts"
  | "Social Content";

export type WorkItem = {
  slug: string;
  title: string;
  category: WorkCategory;
  description: string;
  client?: string;
  tone: "navy" | "green" | "blue" | "mono";
  variant: "video" | "photo";
};

export const workItems: WorkItem[] = [
  {
    slug: "nwrma-river-basin",
    title: "The River Gave and the River Took",
    category: "Documentaries",
    description:
      "A feature documentary following communities along the NWRMA river basin as they adapt to a changing water system.",
    client: "National Water Resources Management Agency",
    tone: "navy",
    variant: "video",
  },
  {
    slug: "cottage-industries-brand-film",
    title: "Made By Hand",
    category: "Brand Films",
    description:
      "A brand film for a Freetown textile cooperative, shot across three workshops over five days of production.",
    tone: "green",
    variant: "video",
  },
  {
    slug: "public-health-campaign",
    title: "Every Clinic, Every Voice",
    category: "Campaigns",
    description:
      "A nationwide awareness campaign built from real patient and health-worker testimony across six districts.",
    tone: "blue",
    variant: "video",
  },
  {
    slug: "portraits-of-freetown",
    title: "Portraits of Freetown",
    category: "Photography",
    description:
      "An ongoing photographic study of the people, trades and streets that shape the capital.",
    tone: "mono",
    variant: "photo",
  },
  {
    slug: "the-foundry-sessions",
    title: "The Foundry Sessions",
    category: "Podcasts",
    description:
      "Long-form conversations with Sierra Leonean founders, artists and organisers, recorded on location.",
    tone: "navy",
    variant: "photo",
  },
  {
    slug: "harvest-season-socials",
    title: "Harvest Season",
    category: "Social Content",
    description:
      "A short-form content series built around a cocoa cooperative's harvest, made for reach and for record.",
    tone: "green",
    variant: "photo",
  },
];
