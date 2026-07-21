export type Service = {
  index: string;
  title: string;
  description: string;
  examples: string[];
};

export const services: Service[] = [
  {
    index: "01",
    title: "Production",
    description: "Turning ideas into finished media.",
    examples: [
      "Documentary production",
      "Video production",
      "Photography",
      "Podcast production",
      "Brand films",
    ],
  },
  {
    index: "02",
    title: "Creative",
    description: "Building the story behind the content.",
    examples: [
      "Concept development",
      "Story development",
      "Scripts",
      "Visual direction",
    ],
  },
  {
    index: "03",
    title: "Strategy",
    description: "Making stories purposeful.",
    examples: [
      "Content strategy",
      "Brand storytelling",
      "Campaign strategy",
      "Audience development",
    ],
  },
  {
    index: "04",
    title: "Development",
    description: "Helping stories reach audiences.",
    examples: [
      "Website integration",
      "Social media packaging",
      "Digital experiences",
    ],
  },
];
