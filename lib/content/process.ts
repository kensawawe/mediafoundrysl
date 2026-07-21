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
      "We start by listening — to the brief, the market, the people the work has to speak to. No deck before the diagnosis.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "Strategy becomes shape: identity, concept, script. The idea is tested in the open before it's committed to production.",
  },
  {
    index: "03",
    title: "Produce",
    description:
      "Cameras, crew, edit bay. The same team that designed the idea builds it — on set, in the studio, frame by frame.",
  },
  {
    index: "04",
    title: "Deliver",
    description:
      "Graded, mastered and packaged for its platform — handed off with everything the client needs to run with it.",
  },
];
