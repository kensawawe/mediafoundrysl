import type { Service } from "./services";

export const servicesSectionHeading = "Siks Dipatmɛnt Dɛn. Wan Flɔ.";

// Example service labels (Podcasts, Documentary Production, etc.) are kept
// in English across both languages — these read as standard business-service
// terms even in Krio-speaking professional contexts, and forcing a
// translation risked sounding stilted. Flag for review if you'd rather
// have them translated too.
export const services: Service[] = [
  {
    code: "PR",
    title: "Prɔdɔkshɔn",
    description: "De krieet ay-kwaliti vizhwal ɛn odio kɔntɛnt frɔm stat te fineʃ.",
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
    title: "Kriyetiv",
    description: "De divɛlɔp di aydiya dɛn ɛn kriyetiv dirɛkshɔn bihaynd ɛvri projɛkt.",
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
    title: "Stratiji",
    description:
      "De ɛp klayɛnt dɛn bil kampen dɛn we de rich di rayt odiens wit di rayt mɛsej.",
    examples: ["Content Architecture", "Advertising Campaign Strategy", "Distribution Planning"],
    image: "/3.jpg",
  },
  {
    code: "DV",
    title: "Divɛlɔpmɛnt",
    description: "De ɛkstɛnd kɔntɛnt pas prɔdɔkshɔn go insay digital ɛkspiriɛns.",
    examples: ["Website Builds", "Podcast Launch Services", "Personal Branding"],
    image: "/4.jpg",
  },
  {
    code: "DG",
    title: "Distribyushɔn Ɛn Grot",
    description: "De get fineʃ wok na frɔnt di rayt odiens, dɛn pruv se i wok.",
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
    title: "Risɛch Ɛn Insayt",
    description: "De dig go insay di odiens, kɔlcha, ɛn fakt dɛn we wan stori nid fɔ ol ɔp.",
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
