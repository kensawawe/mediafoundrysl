export type ProcessStage = {
  index: string;
  title: string;
  description: string;
};

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "We listen first. Understanding the people, context and purpose behind every story before a single frame is planned.",
  },
  {
    index: "02",
    title: "Develop",
    description:
      "Concepts, scripts and visual direction take shape — grounded in research and built for the audience we're reaching.",
  },
  {
    index: "03",
    title: "Create",
    description:
      "Production on location, wherever the story lives — from coastal villages to city studios — crafted with care.",
  },
  {
    index: "04",
    title: "Deliver",
    description:
      "Finished, polished and packaged for its platform — then shared with the audience it was made to reach.",
  },
];
