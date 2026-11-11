export const workCopy = {
  selectedWorkHeading: "Stories we've helped bring to life.",
  selectedWorkIntro:
    "A selection of projects developed with organisations and brands to communicate ideas, capture moments and tell stories worth remembering.",
  workPageHeading: "Selected Work",
  workPageIntro: "A collection of stories, campaigns and productions created with organisations and brands.",
  allWork: "All work",
  castWallHeading: "The Cast Wall",
  viewAllWork: "View all work",
  emptyCategory: "No work in this category yet.",
  whatWeCast: "What we've cast.",
  clientSpreadHeading: ["Who we've", "worked with."],
  clientSpreadSub: "The organisations and brands we've had the privilege of telling stories for.",
  workIndexIntro:
    "A working record of brand identity, campaigns, film and production, digital and photography — browse by discipline.",
};

export type WorkCategory =
  | "Brand Identity"
  | "Campaigns"
  | "Film & Production"
  | "Digital"
  | "Photography"
  | "Social & Content"
  | "Music Video"
  | "Video Podcast"
  | "Activation"
  | "Cinematography & Photography";

export const workCategories: WorkCategory[] = [
  "Brand Identity",
  "Campaigns",
  "Film & Production",
  "Digital",
  "Photography",
  "Social & Content",
  "Music Video",
  "Video Podcast",
  "Activation",
  "Cinematography & Photography",
];

/** The public portfolio taxonomy. Stored work items (here and in Sanity) still
 *  carry the older, finer `category`; `portfolioCategoriesFor` maps them onto
 *  these five so the filters stay simple without rewriting stored data. */
export type PortfolioCategory =
  | "Institutional & Impact Films"
  | "Brand & Corporate Films"
  | "Campaigns & Creative"
  | "Photography"
  | "Podcasts & Editorial";

export const portfolioCategories: PortfolioCategory[] = [
  "Institutional & Impact Films",
  "Brand & Corporate Films",
  "Campaigns & Creative",
  "Photography",
  "Podcasts & Editorial",
];

const categoryMap: Record<WorkCategory, PortfolioCategory> = {
  "Brand Identity": "Campaigns & Creative",
  Campaigns: "Campaigns & Creative",
  "Film & Production": "Brand & Corporate Films",
  Digital: "Podcasts & Editorial",
  Photography: "Photography",
  "Social & Content": "Campaigns & Creative",
  "Music Video": "Brand & Corporate Films",
  "Video Podcast": "Podcasts & Editorial",
  Activation: "Campaigns & Creative",
  "Cinematography & Photography": "Photography",
};

// Projects that honestly belong in more than one public category. The first
// entry is the one shown on the card.
const multiCategory: Record<string, PortfolioCategory[]> = {
  slmda: ["Institutional & Impact Films", "Photography"],
  "rotary-international": ["Campaigns & Creative", "Institutional & Impact Films"],
};

export function portfolioCategoriesFor(item: { slug: string; category: WorkCategory }): PortfolioCategory[] {
  return multiCategory[item.slug] ?? [categoryMap[item.category] ?? "Campaigns & Creative"];
}

/** The work shown on the homepage, in order: a mix of institutional and
 *  commercial work, chosen for clarity rather than volume. */
export const featuredWorkSlugs = [
  "rokel-commercial-bank",
  "conex-campaign",
  "slmda",
  "the-feminist-cohort",
  "rotary-international",
  "foundations-and-futures",
];

/** Flip to true once the case-study pages are ready for visitors. Until then
 *  work cards are inert in production builds; `next dev` keeps them clickable
 *  so the pages can still be worked on. */
export const caseStudiesPublic = false;

export type WorkItem = {
  slug: string;
  title: string;
  /** Shorter stand-in for `title` inside the hover overlay, when the full
   *  name is long enough to push the layout around. */
  hoverTitle?: string;
  category: WorkCategory;
  description: string;
  client?: string;
  variant: "video" | "photo";
  /** Contact-sheet grid sizing — a few frames read as "hero" cells among standard ones. */
  size?: "lg" | "md";
  /** A case-study page exists for this piece (see `caseStudiesPublic`). */
  hasCaseStudy?: boolean;
  /** Real client assets, when we have them, in place of the placeholder Slate frame. */
  restingImage?: string;
  /** Shown inside the pour-wash hover reveal, alongside title/category. */
  hoverImage?: string;
  /** "contain" for a logo lockup that needs breathing room on a white
   *  field; "cover" for a full-bleed photographic thumbnail. Defaults to
   *  "cover". */
  imageFit?: "contain" | "cover";
  /** Overrides the default inset padding around a "contain"-fit image
   *  (e.g. a poster/cover-art asset that should read larger than a small
   *  logo mark). Defaults to "p-10". */
  imagePadding?: string;
  /** Overrides the default size of hoverImage inside the pour-wash reveal.
   *  Defaults to "h-16 w-16 sm:h-20 sm:w-20". */
  hoverImageSize?: string;
};

export const workItems: WorkItem[] = [
  {
    slug: "rokel-commercial-bank",
    title: "Rokel Commercial Bank",
    category: "Music Video",
    description:
      "A music-video-style brand anthem film for Sierra Leone's oldest commercial bank, built to reach a new generation of customers.",
    variant: "video",
    size: "lg",
    hasCaseStudy: true,
    restingImage: "/rokel.jpg",
    hoverImage: "/headerlogo.png",
    imageFit: "contain",
  },
  {
    slug: "conex-campaign",
    title: "Conex",
    category: "Campaigns",
    description: "A brand campaign for Conex, launched around a bold new mark built to command attention.",
    variant: "video",
    size: "md",
    restingImage: "/conex.jpg",
    hoverImage: "/conex%20logo.png",
    hasCaseStudy: true,
  },
  {
    slug: "the-feminist-cohort",
    title: "The Feminist Cohort",
    hoverTitle: "FemCo",
    category: "Activation",
    description:
      "A brand identity and launch activation for a community collective, built from the members it represents.",
    variant: "photo",
    size: "md",
    hasCaseStudy: true,
    restingImage: "/The%20Feminist%20Cohort.jpg",
    hoverImage: "/femco%20logo.png",
    imageFit: "contain",
  },
  {
    slug: "afta-di-wisul",
    title: "Afta Di Wisul",
    category: "Video Podcast",
    description:
      "A weekly video podcast breaking down the beautiful game, built into a show identity of its own.",
    variant: "video",
    size: "lg",
    restingImage: "/after%201.jpg",
    hoverImage: "/wisul.png",
    hasCaseStudy: true,
  },
  {
    slug: "slmda",
    title: "Sierra Leone Medical & Dental Association",
    hoverTitle: "SLMDA",
    category: "Cinematography & Photography",
    description:
      "A cinematography and photography commission documenting the country's medical professionals at work and at their annual gathering.",
    variant: "photo",
    size: "md",
    hasCaseStudy: true,
    restingImage: "/SLMDA%20banner.jpg",
    hoverImage: "/fSLMDA-logo.png",
    imageFit: "contain",
  },
  {
    slug: "rotary-international",
    title: "Rotary",
    category: "Social & Content",
    description:
      "A short-form content system built for Rotary International's always-on social calendar.",
    variant: "photo",
    size: "md",
    restingImage: "/ritt.png",
    hoverImage: "/rot%20png.png",
    imageFit: "contain",
    hasCaseStudy: true,
  },
  {
    slug: "foundations-and-futures",
    title: "Foundations & Futures",
    category: "Video Podcast",
    description: "A podcast series produced by The Media Foundry, hosted by Ken Saro-Wiwa Fofana.",
    variant: "video",
    size: "md",
    restingImage: "/F.png",
    hoverImage: "/futures.png",
    imageFit: "contain",
    imagePadding: "p-0 scale-110",
    hoverImageSize: "mb-1 h-6 w-auto max-w-full sm:h-8",
    hasCaseStudy: true,
  },
  {
    slug: "the-leonean",
    title: "The Leonean",
    category: "Digital",
    description: "A digital magazine — stories, culture and ideas from Sierra Leone and beyond.",
    variant: "photo",
    size: "md",
    restingImage: "/Leonean.png",
    hoverImage: "/leonean-logo.png",
    imageFit: "contain",
    hoverImageSize: "mb-1 h-6 w-auto max-w-full sm:h-8",
    hasCaseStudy: true,
  },
];
