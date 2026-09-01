export const servicesSectionEyebrow = "What we do";
export const servicesSectionHeading = "Six departments. One floor.";
export const servicesSectionSubheading =
  "No outsourcing, no handoffs — strategy, design, and production, all under one roof.";

export type Service = {
  /** Department code, foundry-floor shorthand rather than a sequence number —
   *  these four run in parallel, not in order. */
  code: string;
  title: string;
  description: string;
  examples: string[];
  /** Falls back to the Slate placeholder (components/ui/Slate.tsx) when omitted. */
  image?: string;
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
    image: "/1.jpg",
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
    image: "/2.jpg",
  },
  {
    code: "ST",
    title: "Strategy",
    description:
      "Helping clients build campaigns that reach the right audience with the right message.",
    examples: ["Content Architecture", "Advertising Campaign Strategy", "Distribution Planning"],
    image: "/3.jpg",
  },
  {
    code: "DV",
    title: "Development",
    description: "Extending content beyond production into digital experiences.",
    examples: ["Website Builds", "Podcast Launch Services", "Personal Branding"],
    image: "/4.jpg",
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
    image: "/5.jpg",
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
    image: "/6.jpg",
  },
];
