export const journalHero = {
  eyebrow: "The Foundry Journal",
  title: "Notes from the floor.",
  body:
    "Writing on craft, production and the studio's way of working — new pieces roughly twice a month.",
};

export const readSuffix = "read";

export const journalCopy = {
  backToJournal: "Back to Journal",
  writtenBy: "Written by",
  readArticle: "Read article",
};

export type Author = {
  name: string;
  role: string;
  /** Falls back to an initials mark (components/ui/Slate.tsx convention) when omitted. */
  image?: string;
  // Left empty until real profile links are supplied — never fabricate a
  // social URL for a named person.
  socials: { platform: "instagram" | "linkedin" | "facebook" | "twitter"; href: string }[];
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  body: string[];
  author: Author;
};

export const articles: Article[] = [
  {
    slug: "why-we-dont-outsource-production",
    title: "Why We Don't Outsource Production",
    category: "Studio",
    excerpt: "The case for keeping strategy, design and the camera in the same building.",
    readTime: "4 min",
    date: "May 2026",
    body: [
      "Most agencies hand production off to a separate vendor once the deck is signed off. We don't, and it's not a philosophy we arrived at lightly — it's the direct result of watching good ideas get diluted at the handoff.",
      "When the people who wrote the strategy are the same people holding the camera, nothing gets lost in translation. A shot list isn't a literal interpretation of someone else's brief; it's a continuation of a conversation that's been running since the first meeting.",
      "This also means we can make calls on set that most production companies can't — reworking a scene because it no longer serves the strategy, not because the schedule allows it.",
      "The overhead is real. Keeping strategy, design and production under one roof costs more than treating them as separate line items. But it's the only way we've found to ship work that still looks like the idea that sold it.",
    ],
    author: {
      name: "Ken Saro-Wiwa Fofana",
      role: "Founder & Creative Director",
      image: "/ken.JPG",
      socials: [],
    },
  },
  {
    slug: "the-cold-seam-problem",
    title: "The Cold Seam Problem",
    category: "Craft",
    excerpt:
      "What foundries taught us about what happens when a project loses heat between hand-offs.",
    readTime: "6 min",
    date: "March 2026",
    body: [
      "In casting, a cold seam happens when molten metal cools before the next pour joins it — the two halves never fully fuse, and the flaw sits invisible until the piece is under load.",
      "Creative work has the same failure mode. A brief that sits in an inbox for two weeks before production picks it up has already gone cold. The people executing it are working from notes, not from the moment the idea was hot.",
      "We named the studio after the process because we wanted the metaphor to hold us accountable. Every hand-off between departments is a place where a project can go cold if we let it.",
      "The fix isn't more documentation. It's fewer hand-offs — keeping the same people close to a project from strategy through final cut, so there's no seam left to go cold in the first place.",
    ],
    author: {
      name: "Francis Sam-Mboma",
      role: "Content Strategist",
      socials: [],
    },
  },
  {
    slug: "casting-real-people-not-actors",
    title: "Casting Real People, Not Actors",
    category: "Production",
    excerpt:
      "Notes from The Feminist Cohort activation on why we pointed the camera at the real room instead of staging one.",
    readTime: "5 min",
    date: "January 2026",
    body: [
      "When The Feminist Cohort came to us for their activation film, the easy version was a script, a casting call and a controlled set. We pushed for the harder version instead: point the camera at the room that was actually happening.",
      "That meant giving up a lot of control. No blocking rehearsals, no second takes of a reaction that only happens once. What we got back was a room full of people who forgot the camera was there by the second hour.",
      "The trade-off shows up in the edit. Real footage is messier — harder to cut, harder to pace. But it's also the only kind of footage where the audience can tell the difference between something staged and something that actually happened.",
      "We'd make the same call again. A story about real people gets weaker every time you replace one of them with someone playing a role.",
    ],
    author: {
      name: "Frankvin McEwen",
      role: "Producer & Operations Manager",
      socials: [],
    },
  },
  {
    slug: "a-brand-system-built-to-flex",
    title: "A Brand System Built to Flex",
    category: "Brand",
    excerpt: "What it actually takes to design an identity that scales across markets without a redesign every year.",
    readTime: "7 min",
    date: "November 2025",
    body: [
      "Most brand identities are designed for the launch moment — one market, one language, one context. They start to crack the moment the client expands past it.",
      "Building a system that flexes means designing the rules before the assets. A type scale that still reads at Krio's longer word lengths. A colour system that holds up translated onto a market stall sign, not just a Figma frame.",
      "It also means resisting the urge to over-specify. The identities that age worst are the ones with too many fixed rules and not enough principles — so the moment a new format shows up, nothing in the guidelines tells you what to do with it.",
      "We test every system we build against a use case it wasn't designed for. If it breaks, it wasn't a system — it was a lookbook.",
    ],
    author: {
      name: "Kanja Fofana",
      role: "Multimedia Creator",
      socials: [],
    },
  },
];
