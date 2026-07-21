export const careersHero = {
  eyebrow: "Careers",
  title: "Build here.",
  statement:
    "We hire slowly, trust completely, and give people real ownership over the work — not just a seat near it.",
};

export type Pillar = {
  title: string;
  description: string;
};

export const pillars: Pillar[] = [
  {
    title: "Work that leaves the building",
    description:
      "Every project ships — no case studies that only exist in a portfolio deck. If we make it, it runs.",
  },
  {
    title: "One team, not a chain of hand-offs",
    description:
      "Strategists, designers and producers work the same brief from day one, in the same room.",
  },
  {
    title: "Craft over hours",
    description:
      "We measure the work by whether it holds up, not by how late the lights stayed on to finish it.",
  },
];

export type BenefitGroup = {
  title: string;
  items: string[];
};

export const benefitGroups: BenefitGroup[] = [
  {
    title: "Health & Time",
    items: [
      "Private health cover",
      "25 days PTO, plus studio closures",
      "Paid parental leave",
      "Mental health support",
    ],
  },
  {
    title: "Money & Growth",
    items: [
      "Profit-share pool",
      "Annual learning stipend",
      "Kit & equipment allowance",
      "Transparent pay bands",
    ],
  },
  {
    title: "How We Work",
    items: [
      "Hybrid by default",
      "Quarterly studio gathering",
      "Freelance network for surge production",
      "Flexible hours around shoot schedules",
    ],
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
  { title: "Senior Brand Designer", department: "Creative", type: "Full-time", location: "London / Hybrid" },
  { title: "Director of Photography", department: "Production", type: "Freelance", location: "New York / On location" },
  { title: "Copywriter", department: "Creative", type: "Full-time", location: "Remote" },
  { title: "Producer, Brand Film", department: "Production", type: "Full-time", location: "London / Hybrid" },
  { title: "Strategy Director", department: "Strategy", type: "Full-time", location: "Remote" },
  { title: "Motion Designer", department: "Creative", type: "Freelance", location: "Remote" },
  { title: "Studio Operations Manager", department: "Operations", type: "Full-time", location: "New York / Hybrid" },
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
