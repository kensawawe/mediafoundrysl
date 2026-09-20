export const trustedByLabel = "Trusted by organizations across Sierra Leone";
export const whatClientsSay = "What clients say";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  /** Same lockup used as the hover image on the corresponding Cast Wall card. */
  logo: string;
};

// Real client quotes, attributed to the organisation rather than an individual.
export const testimonials: Testimonial[] = [
  {
    id: "rokel-commercial-bank",
    quote:
      "They captured the heart behind our tribute with remarkable sensitivity and craftsmanship, making a film that honored a legacy while also reflecting the highest standard of storytelling. We all loved it.",
    name: "Rokel Commercial Bank",
    logo: "/headerlogo.png",
  },
  {
    id: "the-feminist-cohort",
    quote:
      "Across every one of the many projects we've trusted them with, The Media Foundry brought passion, originality, and professionalism, turning our ideas into content that informed, inspired, and connected well with people.",
    name: "The Feminist Cohort",
    logo: "/femco%20logo.png",
  },
  {
    id: "slmda",
    quote:
      "The Media Foundry has an exceptional ability to preserve not just the moments, but also the meaning. They are professional, reliable, and have an eye for detail that made every event they covered feel timeless.",
    name: "Sierra Leone Medical & Dental Association",
    logo: "/fSLMDA-logo.png",
  },
  {
    id: "conex",
    quote:
      "The Media Foundry didn't just produce videos, they translated our purpose into stories that resonated across our global network. Their creativity, care, and commitment to excellence made them an invaluable partner.",
    name: "Conex",
    logo: "/conex%20logo.png",
  },
  {
    id: "rotary",
    quote:
      "Working with The Media Foundry felt like working with a team that truly believed in our mission. They consistently delivered thoughtful, engaging stories with creativity and excellence.",
    name: "Rotary",
    logo: "/rot%20png.png",
  },
];
