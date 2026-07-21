export type Service = {
  /** Department code, foundry-floor shorthand rather than a sequence number —
   *  these four run in parallel, not in order. */
  code: string;
  title: string;
  description: string;
  examples: string[];
};

export const services: Service[] = [
  {
    code: "BR",
    title: "Brand & Identity",
    description: "Positioning, naming and identity systems built to hold up at any scale.",
    examples: [
      "Brand strategy",
      "Naming & verbal identity",
      "Visual identity systems",
      "Brand guidelines",
    ],
  },
  {
    code: "CP",
    title: "Campaigns & Digital",
    description: "Ideas built to travel — across platforms, formats and audiences.",
    examples: [
      "Campaign concepting",
      "Art direction",
      "Web & digital design",
      "Social systems",
    ],
  },
  {
    code: "FM",
    title: "Film & Production",
    description: "Full production, in-house — from pre-production to final grade.",
    examples: [
      "Brand films",
      "Documentary",
      "Commercial production",
      "Post & sound design",
    ],
  },
  {
    code: "ST",
    title: "Strategy & Content",
    description: "The thinking that gives everything else a reason to exist.",
    examples: [
      "Audience & market strategy",
      "Content strategy",
      "Copywriting",
      "Producer support",
    ],
  },
];
