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
    slug: "nwrma-river-basin",
    title: "The River Gave and the River Took",
    category: "Documentaries",
    client: "National Water Resources Management Agency",
    year: "2025",
    heroMedia: { variant: "video", label: "NWRMA river basin, dry season" },
    overview:
      "A feature-length documentary following three communities along the NWRMA river basin as shifting rainfall patterns and upstream development reshape how they farm, fish and live with water. Commissioned to document not just infrastructure, but the people whose lives run alongside it.",
    challenge:
      "NWRMA needed a film that could sit in front of both international funding partners and the communities it serves — technical enough to be credible, human enough to be believed. Most water-management documentation is either dry policy footage or disconnected from the people actually affected.",
    approach:
      "We spent three weeks embedded across two riverside villages before filming began, building trust with community leaders, fishers and farmers so the camera could arrive as a familiar presence rather than an outside crew. Interviews were conducted in Krio and Temne, with the agency's technical narrative woven around lived testimony rather than the other way around.",
    process: [
      {
        title: "Pre-production & access",
        description:
          "Community entry through local liaisons, scouting river access points across two dry-season and one wet-season visit to capture the basin's full cycle.",
      },
      {
        title: "Principal photography",
        description:
          "Twelve days on location across three communities, shot handheld and on a stabilised gimbal to move between intimate testimony and wide landscape context.",
      },
      {
        title: "Edit & sound design",
        description:
          "A six-week edit built around community voice first, agency data second — original score composed with local instrumentation.",
      },
    ],
    outcome:
      "Delivered as a 38-minute feature cut plus three short-form extracts for NWRMA's funding partners. The film screened at a regional water-policy forum and became the agency's primary tool for community briefings.",
    gallery: [
      { variant: "video", label: "Fishers at dawn, upper basin", category: "Documentary" },
      { variant: "photo", label: "Community elder interview" },
      { variant: "video", label: "Aerial, river confluence" },
      { variant: "photo", label: "Children at the water's edge" },
    ],
    impact: [
      { stat: "38 MIN", label: "Feature runtime" },
      { stat: "3", label: "Communities documented" },
      { stat: "12 DAYS", label: "Principal photography" },
    ],
  },
  {
    slug: "sea-salt-harvest-campaign",
    title: "Sea Salt Harvest",
    category: "Campaigns",
    client: "Sherbro Salt Collective",
    year: "2025",
    heroMedia: { variant: "video", label: "Salt pans at low tide, Sherbro coast" },
    overview:
      "A nationwide brand campaign for a coastal salt-producing cooperative, built to shift perception of artisanal Sierra Leonean salt from commodity to craft — ahead of the collective's first export contracts.",
    challenge:
      "The cooperative's product was excellent but invisible — sold in unbranded sacks at local markets with no story attached. They needed a campaign that could carry the same product into premium retail and export buyers without losing what made it authentic.",
    approach:
      "Rather than build a campaign around finished packaging, we built it around process — the tidal timing, the hand-raking, the drying racks — treating the harvest itself as the brand story. Testimony from three generations of one harvesting family anchored the campaign's emotional core.",
    process: [
      {
        title: "Field research",
        description:
          "A full harvest-season cycle observed and logged before any brief was written, to ground the campaign in real production rhythm rather than assumption.",
      },
      {
        title: "Concept & shoot",
        description:
          "A five-day shoot timed to tidal low-water windows, capturing harvest, drying and packing across two cooperative sites.",
      },
      {
        title: "Campaign roll-out",
        description:
          "A hero film, six short-form cutdowns and a photography set delivered for retail partners, social and export-facing decks.",
      },
    ],
    outcome:
      "The campaign became the cooperative's primary sales asset for its first export negotiations and drove a measurable uplift in domestic premium-retail placement within the following quarter.",
    gallery: [
      { variant: "photo", label: "Hand-raking at low tide", category: "Campaign" },
      { variant: "video", label: "Drying racks, golden hour" },
      { variant: "photo", label: "Three generations, one family" },
      { variant: "photo", label: "Packed for export" },
    ],
    impact: [
      { stat: "6", label: "Short-form cutdowns" },
      { stat: "2", label: "Cooperative sites filmed" },
      { stat: "1ST", label: "Export contract secured" },
    ],
  },
  {
    slug: "the-foundry-sessions",
    title: "The Foundry Sessions",
    category: "Podcasts",
    year: "2024–ongoing",
    heroMedia: { variant: "photo", label: "Studio setup, Freetown" },
    overview:
      "An ongoing long-form interview podcast produced in-house, built to give Sierra Leonean founders, artists and organisers a platform with production values usually reserved for international media.",
    challenge:
      "Independent podcasting in Sierra Leone typically means a phone mic and inconsistent releases. To attract the calibre of guest the show wanted, it needed to sound and feel like a credible, recurring editorial product from day one — not a pilot.",
    approach:
      "We built a modest but broadcast-grade studio setup, established a repeatable recording and edit pipeline, and treated the first season as a proof of format — booking guests through direct relationships before opening to pitches.",
    process: [
      {
        title: "Format & studio build",
        description:
          "A fixed two-camera, multi-mic setup designed for a 90-minute turnaround per episode, built once and reused for consistency.",
      },
      {
        title: "Recording rhythm",
        description:
          "A standing weekly recording slot with a three-episode buffer, so release schedule never depends on any single guest's availability.",
      },
      {
        title: "Distribution",
        description:
          "Full episodes plus a short-form clip package cut for social from every session, extending each conversation's reach well past the audio feed.",
      },
    ],
    outcome:
      "Now in its second season, with a guest list spanning founders, musicians and civic organisers, and a growing library that doubles as an oral record of Sierra Leone's creative and entrepreneurial scene.",
    gallery: [
      { variant: "photo", label: "Guest recording, season 2", category: "Podcast" },
      { variant: "photo", label: "Studio detail" },
      { variant: "video", label: "Clip package, episode 14" },
    ],
    impact: [
      { stat: "2", label: "Seasons produced" },
      { stat: "90 MIN", label: "Studio turnaround" },
      { stat: "WEEKLY", label: "Recording rhythm" },
    ],
  },
];
