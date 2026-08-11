import type { WorkCategory } from "@/lib/content/work";

export const caseStudyCopy = {
  backToWork: "← Back to work",
  overview: "Overview",
  gallery: "Gallery",
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: WorkCategory;
  client?: string;
  year: string;
  heroMedia: { variant: "video" | "photo"; label: string };
  overview: string;
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
    slug: "the-feminist-cohort",
    title: "The Feminist Cohort",
    category: "Activation",
    year: "2025",
    heroMedia: { variant: "photo", label: "The Feminist Cohort, launch activation" },
    overview:
      "A brand identity and live launch activation for The Feminist Cohort, built to turn a community that had only ever met online into a room full of people who already knew each other's work.",
    gallery: [
      { variant: "photo", label: "Activation signage, entrance", category: "Activation" },
      { variant: "video", label: "Launch night recap film" },
      { variant: "photo", label: "Live mural in progress" },
      { variant: "photo", label: "Attendees, chapter meetup" },
    ],
    impact: [
      { stat: "1", label: "Identity system built from the community itself" },
      { stat: "150+", label: "Members at the launch activation" },
      { stat: "1ST", label: "In-person gathering for the Cohort" },
    ],
  },
  {
    slug: "slmda",
    title: "Sierra Leone Medical & Dental Association",
    category: "Cinematography & Photography",
    year: "2025",
    heroMedia: { variant: "photo", label: "SLMDA annual conference, Freetown" },
    overview:
      "A cinematography and photography commission for the Sierra Leone Medical & Dental Association, documenting the country's medical professionals at work and at their annual gathering.",
    gallery: [
      { variant: "photo", label: "Practitioner, district hospital", category: "Photography" },
      { variant: "video", label: "Conference recap film" },
      { variant: "photo", label: "Delegates, annual conference" },
      { variant: "photo", label: "Clinical documentation, field visit" },
    ],
    impact: [
      { stat: "2 WEEKS", label: "Embedded field access" },
      { stat: "1ST", label: "Visual archive of this standard for the association" },
      { stat: "1", label: "Short documentary film delivered" },
    ],
  },
];
