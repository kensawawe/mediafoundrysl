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
    slug: "northline-rebrand",
    title: "Northline",
    category: "Brand Identity",
    client: "Northline Mobility",
    year: "2025",
    heroMedia: { variant: "photo", label: "Northline fleet, launch markets" },
    overview:
      "A full identity system for a micromobility startup preparing to scale from three cities to thirty — built to work on a scooter deck, a phone screen and a city permit application with equal clarity.",
    challenge:
      "Northline's existing mark was designed for one city and one product. As the company prepared a thirty-city expansion and a second vehicle line, they needed an identity system flexible enough to hold new products and markets without a redesign every eighteen months.",
    approach:
      "We built the identity around a single modular mark that could be cropped, tiled and recoloured by market without losing legibility at ten centimetres or ten metres. Type, colour and motion were specified as a system, not a style guide — with rules for exactly when and how each part was allowed to flex.",
    process: [
      {
        title: "Audit & workshops",
        description:
          "Three weeks auditing every existing touchpoint — fleet decals, app, permit filings — before a line was drawn, to find what was actually working.",
      },
      {
        title: "System design",
        description:
          "Identity, type and colour system built and stress-tested against real use cases: low-light decals, city signage restrictions, app icon legibility.",
      },
      {
        title: "Rollout toolkit",
        description:
          "A living brand system — templates, motion presets and fleet specifications — handed to Northline's in-house team to run without us.",
      },
    ],
    outcome:
      "Delivered as a full identity system with a 40-page usage guide and a Figma-native component library. Northline's operations team now ships new-market branding in-house in under a week, down from six.",
    gallery: [
      { variant: "photo", label: "Identity system, primary marks", category: "Brand" },
      { variant: "photo", label: "Fleet decal application" },
      { variant: "video", label: "Motion identity reel" },
      { variant: "photo", label: "App icon & UI type system" },
    ],
    impact: [
      { stat: "30", label: "Markets the system now supports" },
      { stat: "6→1", label: "Weeks to ship new-market branding" },
      { stat: "1", label: "Modular mark, zero redesigns since" },
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
