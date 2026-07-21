export type Principle = {
  /** A real foundry-process term, not an arbitrary A/B/C/D — each one maps
   *  literally to the studio behaviour it names. */
  tag: string;
  title: string;
  description: string;
};

export const philosophyStatement =
  "Good work isn't assembled. It's forged — under pressure, at the right temperature, by people who don't leave until it holds its shape.";

export const highlights: Principle[] = [
  {
    tag: "Temper",
    title: "Discipline over decoration",
    description:
      "Craft that's been tested, not just styled. Every idea gets pressure-tested against the brief before it ships.",
  },
  {
    tag: "Alloy",
    title: "One team, every discipline",
    description:
      "Strategists, designers and producers are the same team — not vendors handed the brief one after another.",
  },
  {
    tag: "Pour",
    title: "Built to finish, not just start",
    description:
      "We stay through production and delivery, not just the deck. Half-forged ideas don't leave the building.",
  },
  {
    tag: "Grain",
    title: "Detail carries the work",
    description:
      "The difference between good and great is in the finish — the frame, the kerning, the cut. We don't skip it.",
  },
];
