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
  /** Real client assets, when we have them, in place of the placeholder Slate frame. */
  restingImage?: string;
  /** Shown inside the pour-wash hover reveal, alongside title/category. */
  hoverImage?: string;
  /** "contain" for a logo lockup that needs breathing room on a white
   *  field; "cover" for a full-bleed photographic thumbnail. Defaults to
   *  "cover". */
  imageFit?: "contain" | "cover";
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
  },
  {
    slug: "the-feminist-cohort",
    title: "The Feminist Cohort",
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
  },
  {
    slug: "slmda",
    title: "Sierra Leone Medical & Dental Association",
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
