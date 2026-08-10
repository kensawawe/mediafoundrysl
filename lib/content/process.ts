export type ProcessStage = {
  index: string;
  title: string;
  description: string;
};

export const processIntro = {
  title: "The Forge",
  description:
    "The Forge is our six-stage process for turning ideas into impactful stories.",
};

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "We start by listening. We immerse ourselves in the brief, the audience, the challenge, and the story behind the work. Research, conversations, and strategy shape the foundation before a single frame is created.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "Ideas become direction. We develop the creative concept, visual language, narrative approach, and strategy that bring the vision to life. Every story begins with a clear purpose and a strong creative foundation.",
  },
  {
    index: "03",
    title: "Develop",
    description:
      "The vision becomes a plan. We turn concepts into production-ready blueprints through scripts, storyboards, schedules, budgets, and detailed planning. Every creative decision is mapped before execution begins.",
  },
  {
    index: "04",
    title: "Produce",
    description:
      "This is where stories are built. Our team brings the vision into reality through filming, photography, sound, and production. From studio to location, we capture every moment with intention and craft.",
  },
  {
    index: "05",
    title: "Deliver",
    description:
      "We refine, package, and prepare the final story for the world. Through editing, colour grading, sound design, and content formatting, we deliver polished assets built for their intended platform.",
  },
  {
    index: "06",
    title: "Amplify",
    description:
      "Great stories deserve to travel. We help content reach the right audiences through distribution strategy, social media packaging, campaigns, and ongoing optimisation to maximise impact.",
  },
];
