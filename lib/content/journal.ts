export const journalHero = {
  eyebrow: "The Foundry Journal",
  title: "Notes from the floor.",
  body:
    "Writing on craft, production and the studio's way of working — new pieces roughly twice a month.",
};

export type Article = {
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
};

export const articles: Article[] = [
  {
    title: "Why We Don't Outsource Production",
    category: "Studio",
    excerpt: "The case for keeping strategy, design and the camera in the same building.",
    readTime: "4 min",
    date: "May 2026",
  },
  {
    title: "The Cold Seam Problem",
    category: "Craft",
    excerpt:
      "What foundries taught us about what happens when a project loses heat between hand-offs.",
    readTime: "6 min",
    date: "March 2026",
  },
  {
    title: "Casting Real People, Not Actors",
    category: "Production",
    excerpt: "Notes from the Halyard shoot on why we cast boat owners instead of talent.",
    readTime: "5 min",
    date: "January 2026",
  },
  {
    title: "A Brand System Built to Flex",
    category: "Brand",
    excerpt: "What it actually takes to design an identity that scales across markets without a redesign every year.",
    readTime: "7 min",
    date: "November 2025",
  },
];
