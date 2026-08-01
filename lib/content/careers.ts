export const careersHero = {
  eyebrow: "Careers",
  title: "Come build something meaningful.",
  statement: [
    "We are building a place for people who believe stories can move culture, inspire change, and connect communities.",
    "We're looking for curious minds and passionate creators who want to do meaningful work, and help us tell the stories that shape Sierra Leone and beyond.",
  ],
};

export type Pillar = {
  title: string;
  description: string;
};

export const pillars: Pillar[] = [
  {
    title: "Stories Worth Telling",
    description:
      "Every project is an opportunity to capture something real. We create work that lives beyond campaigns, screens, and deadlines.",
  },
  {
    title: "Collaboration Is Our Craft",
    description:
      "Great ideas aren't built alone. We bring storytellers, strategists, designers, and producers together to create work stronger than any one person could make.",
  },
  {
    title: "Quality Over Quantity And Without Compromise",
    description:
      "We don't chase perfection through endless hours. We chase excellence through care, intention, and attention to every detail. We focus on what we can do best instead of trying to do everything.",
  },
];

export type Role = {
  title: string;
  department: "Creative" | "Production" | "Strategy" | "Operations";
  type: "Full-time" | "Freelance";
  location: string;
};

export const departments = ["All", "Creative", "Production", "Strategy", "Operations"] as const;

export const roles: Role[] = [
  { title: "Videographer", department: "Production", type: "Full-time", location: "Freetown / On location" },
  { title: "Graphic Designer", department: "Creative", type: "Full-time", location: "Freetown" },
  { title: "Content & Social Media Manager", department: "Strategy", type: "Full-time", location: "Freetown" },
  { title: "Studio Operations Manager", department: "Operations", type: "Full-time", location: "Freetown" },
];

export type ApplicationStep = {
  title: string;
  description: string;
};

export const applicationSteps: ApplicationStep[] = [
  {
    title: "Apply",
    description:
      "Send your portfolio or reel. We read every one — no ATS filter deciding before a person does.",
  },
  {
    title: "Intro call",
    description:
      "A short call with our team to talk through the role, your work and what you're looking for next.",
  },
  {
    title: "Team session",
    description: "Meet the people you'd actually work with. A working session, not a trivia panel.",
  },
  {
    title: "Offer",
    description: "If it's a fit both ways, we move fast — an offer within days, not months.",
  },
];
