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
    slug: "the-feminist-cohort",
    title: "The Feminist Cohort",
    category: "Activation",
    year: "2025",
    heroMedia: { variant: "photo", label: "The Feminist Cohort, launch activation" },
    overview:
      "A brand identity and live launch activation for The Feminist Cohort, built to turn a community that had only ever met online into a room full of people who already knew each other's work.",
    challenge:
      "The Cohort's community lived entirely online — years of conversation, mutual support and shared language with no shared physical space to match it. Their first in-person gathering needed to feel like a homecoming, not a conference, without an existing brand or event infrastructure to build it on.",
    approach:
      "We designed the identity and the activation as one brief: a mark built from the community's own members — a chain of member silhouettes forming the Cohort's 'C' — then carried that same idea of people carrying each other forward into every touchpoint of the launch event itself.",
    process: [
      {
        title: "Identity & mark",
        description:
          "A logotype built from illustrated member silhouettes rather than an abstract symbol, so the brand mark was literally made of the community it represents.",
      },
      {
        title: "Activation design",
        description:
          "Signage, seating and a live mural extended the same figures-in-motion motif from the mark out into the physical room.",
      },
      {
        title: "On-site production",
        description:
          "A full crew documenting the activation live, turning the one-night event into a recurring content library for the Cohort's own channels.",
      },
    ],
    outcome:
      "Delivered as a complete identity system plus a fully produced launch activation, the event became the template for The Feminist Cohort's ongoing chapter meetups, with the mark now recognised across their community as their own.",
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
    challenge:
      "SLMDA's professional community had never been documented at the standard of the work its members actually do — decades of practice with no visual record built to represent it to government, donors or the public.",
    approach:
      "We treated it as an editorial assignment, not an event recap — embedding with practitioners across hospitals and clinics before the conference, then covering the gathering itself as the culmination of that longer story rather than the whole of it.",
    process: [
      {
        title: "Field access",
        description:
          "Two weeks embedded across hospitals and clinics, building the trust needed to photograph practitioners mid-practice rather than posed.",
      },
      {
        title: "Conference coverage",
        description:
          "Full cinematography and photography coverage of the annual conference, from keynote sessions to the delegates between them.",
      },
      {
        title: "Edit & delivery",
        description:
          "A curated still archive plus a short film cut for SLMDA's own use across membership communications and public health partners.",
      },
    ],
    outcome:
      "Delivered as a full photographic archive and a short documentary film, now used by SLMDA in its own communications with government and international health partners — the association's first visual record built to that standard.",
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
