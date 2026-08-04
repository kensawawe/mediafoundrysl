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
  { title: "Editor", department: "Production", type: "Full-time", location: "Freetown" },
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
      "Share your portfolio, reel, CV, or any work you're proud of. We review every application ourselves because great talent deserves a real conversation, not an automated filter.",
  },
  {
    title: "Get to Know Each Other",
    description:
      "If we think there's a good fit, we'll invite you to a relaxed conversation. We'll talk about your experience, your ambitions, and the kind of work that excites you, while giving you the chance to learn more about us.",
  },
  {
    title: "Create Together",
    description:
      "Depending on the role, you may meet the wider team or complete a short practical exercise. We're not interested in trick questions. We want to see how you think, collaborate, and approach creative challenges.",
  },
  {
    title: "Welcome to the Foundry",
    description:
      "If it feels like the right fit for both of us, we'll move quickly with an offer and everything you need to get started. Then it's time to create work that matters, together.",
  },
];
