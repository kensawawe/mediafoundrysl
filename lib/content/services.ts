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
    code: "PR",
    title: "Production",
    description: "Creating high-quality visual and audio content from start to finish.",
    examples: [
      "Podcasts (Audio & Video)",
      "Documentary Production",
      "Testimonial Videos",
      "Product Advertisements",
      "Brand Campaign Videos",
    ],
  },
  {
    code: "CR",
    title: "Creative",
    description: "Developing the ideas and creative direction behind every project.",
    examples: [
      "Concept Development",
      "Creative Direction",
      "Scriptwriting",
      "Campaign Design",
      "Graphic Design",
    ],
  },
  {
    code: "ST",
    title: "Strategy",
    description:
      "Helping clients build campaigns that reach the right audience with the right message.",
    examples: ["Content Architecture", "Advertising Campaign Strategy", "Distribution Planning"],
  },
  {
    code: "DV",
    title: "Development",
    description: "Extending content beyond production into digital experiences.",
    examples: ["Website Builds", "Podcast Launch Services", "Personal Branding"],
  },
  {
    code: "DG",
    title: "Distribution & Growth",
    description: "Getting finished work in front of the right audience, then proving it worked.",
    examples: [
      "Social Media Strategy",
      "Paid Media Campaigns",
      "Community Management",
      "Performance Tracking",
      "Content Repurposing",
    ],
  },
  {
    code: "RI",
    title: "Research & Insights",
    description: "Digging into the audience, culture and facts a story needs to hold up.",
    examples: [
      "Audience Insights",
      "Cultural Research",
      "Community Interviews",
      "Impact Measurement",
      "Story Discovery",
    ],
  },
];
