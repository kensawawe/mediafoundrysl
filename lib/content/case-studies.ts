import type { WorkCategory } from "@/lib/content/work";

export type CaseStudy = {
  slug: string;
  title: string;
  category: WorkCategory;
  client?: string;
  year: string;
  heroMedia: { variant: "video" | "photo"; label: string };
  overview: string;
  challenge: string;
  approach: string;
  process: { title: string; description: string }[];
  outcome: string;
  gallery: { variant: "video" | "photo"; label: string; category?: string }[];
  impact: { stat: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "rokel-commercial-bank",
    title: "Rokel Commercial Bank",
    category: "Music Video",
    year: "2025",
    heroMedia: { variant: "video", label: "Rokel Commercial Bank, anthem film" },
    overview:
      "A music-video-style brand anthem for Sierra Leone's oldest commercial bank, built to modernise its image for a generation of customers who'd never associate banking with anything they'd choose to watch.",
    challenge:
      "Bank marketing looks the same everywhere: a boardroom, a handshake, a voiceover about trust. Rokel Commercial Bank needed to reach a younger, mobile-first customer base without spending the goodwill built over seventy years as the country's oldest bank.",
    approach:
      "We wrote and produced the campaign as a music video first and a bank commercial second — an original anthem track, a cast of real customers and staff, and a visual identity built around the bank's existing mark rather than a generic finance-ad palette.",
    process: [
      {
        title: "Track & script",
        description:
          "An original song commissioned and scored before a single frame was planned, so the film could be cut to the music rather than the music fitted to the film.",
      },
      {
        title: "Production",
        description:
          "A multi-location shoot across branches, city streets and customer homes, cast with real account holders and frontline staff instead of actors.",
      },
      {
        title: "Edit & grade",
        description:
          "A rhythm-led edit built around the track's structure, graded to feel like a music video release rather than a corporate reel.",
      },
    ],
    outcome:
      "Delivered as a full-length anthem film plus a cutdown for broadcast and social, the film became Rokel Commercial Bank's primary brand piece for its youth-focused account launch, running across television, cinema and social platforms.",
    gallery: [
      { variant: "video", label: "Anthem film, full cut", category: "Music Video" },
      { variant: "photo", label: "On location, branch shoot" },
      { variant: "video", label: "Broadcast cutdown, 30s" },
      { variant: "photo", label: "Cast, real account holders" },
    ],
    impact: [
      { stat: "1", label: "Original anthem track produced" },
      { stat: "3", label: "Cities filmed across" },
      { stat: "1ST", label: "Youth-focused account campaign for the brand" },
    ],
  },
  {
    slug: "halyard-launch-campaign",
    title: "Halyard",
    category: "Campaigns",
    client: "Halyard Insurance",
    year: "2025",
    heroMedia: { variant: "video", label: "Halyard launch film, marina" },
    overview:
      "A category-defining launch campaign for an insurtech bringing boat insurance to a generation of owners who'd never buy it the old way — built to run across broadcast, social and the point of sale.",
    challenge:
      "Marine insurance advertising looks the same everywhere: navy, brass, a retired admiral. Halyard needed to launch into that category and read as something else entirely, without losing the credibility a first-time buyer needs to see.",
    approach:
      "We treated the campaign as a production problem first and a media plan second — writing and shooting a hero film built around real boat owners, then breaking it into forty-plus cutdowns engineered for the exact platforms Halyard's underwriting data said its buyers were on.",
    process: [
      {
        title: "Strategy & script",
        description:
          "Positioning and campaign architecture built from underwriting and customer-interview data, not category convention.",
      },
      {
        title: "Production",
        description:
          "A five-day shoot across two coastal locations, cast entirely with real boat owners rather than actors.",
      },
      {
        title: "Media system",
        description:
          "One hero film re-cut into 40+ platform-specific versions, each engineered to its channel's aspect ratio and attention span.",
      },
    ],
    outcome:
      "The campaign became Halyard's primary acquisition asset at launch, run across broadcast, paid social and point-of-sale video — and set the visual template the brand still uses for every campaign since.",
    gallery: [
      { variant: "video", label: "Hero film, 60s cut", category: "Campaign" },
      { variant: "photo", label: "Production still, marina shoot" },
      { variant: "video", label: "Social cutdown, 15s" },
      { variant: "photo", label: "Owner casting, on location" },
    ],
    impact: [
      { stat: "40+", label: "Platform-specific cutdowns delivered" },
      { stat: "5 DAYS", label: "Principal photography" },
      { stat: "1ST", label: "Category launch campaign for the brand" },
    ],
  },
  {
    slug: "cast-and-co-digital",
    title: "Cast & Co.",
    category: "Digital",
    client: "Cast & Co.",
    year: "2024",
    heroMedia: { variant: "photo", label: "Cast & Co. product studio" },
    overview:
      "A commerce-ready site and design system for a direct-to-consumer homeware brand outgrowing its original template store — built to carry a fast-expanding catalogue without the site outgrowing its own brand.",
    challenge:
      "Cast & Co.'s catalogue had tripled in a year, and their storefront hadn't kept pace — a templated build that couldn't express the material quality of the product or scale past a few hundred SKUs without breaking its own layout.",
    approach:
      "We designed a component-driven system before we designed a single page — modular product, story and collection templates built to hold thousands of SKUs at the same visual standard as the hero launch pieces.",
    process: [
      {
        title: "System architecture",
        description:
          "A component library and content model built first, so every future page inherits the same craft without custom design work.",
      },
      {
        title: "Design & build",
        description:
          "Full storefront redesign across product, collection, story and checkout templates, built on a headless commerce stack.",
      },
      {
        title: "Photography direction",
        description:
          "An in-house photography system specified so new products can be shot and published without a re-brief every time.",
      },
    ],
    outcome:
      "Launched with over 1,200 SKUs live on day one at a consistent visual standard, with a component system Cast & Co.'s team now extends without design support for net-new product lines.",
    gallery: [
      { variant: "photo", label: "Storefront, product detail template", category: "Digital" },
      { variant: "photo", label: "Collection page, modular grid" },
      { variant: "photo", label: "Checkout flow" },
      { variant: "video", label: "Site walkthrough" },
    ],
    impact: [
      { stat: "1,200+", label: "SKUs live at launch" },
      { stat: "4", label: "Modular template types" },
      { stat: "0", label: "Design hours needed per new SKU" },
    ],
  },
];
