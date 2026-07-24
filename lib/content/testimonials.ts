export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Same lockup used as the hover image on the corresponding Cast Wall card. */
  logo: string;
};

// Placeholder quotes for real past clients — swap {@link quote} for what they
// actually said before launch. Follows the same on-page "PLACEHOLDER"
// convention used by the Slate component for unfinished media.
export const testimonials: Testimonial[] = [
  {
    id: "rokel-commercial-bank",
    quote:
      "PLACEHOLDER — add a real quote from Rokel Commercial Bank about working with the studio.",
    name: "Rokel Commercial Bank",
    role: "PLACEHOLDER TITLE",
    logo: "/headerlogo.png",
  },
  {
    id: "the-feminist-cohort",
    quote:
      "PLACEHOLDER — add a real quote from The Feminist Cohort about working with the studio.",
    name: "The Feminist Cohort",
    role: "PLACEHOLDER TITLE",
    logo: "/femco%20logo.png",
  },
  {
    id: "slmda",
    quote:
      "PLACEHOLDER — add a real quote from Sierra Leone Medical & Dental Association about working with the studio.",
    name: "Sierra Leone Medical & Dental Association",
    role: "PLACEHOLDER TITLE",
    logo: "/fSLMDA-logo.png",
  },
  {
    id: "conex",
    quote:
      "PLACEHOLDER — add a real quote from Conex about working with the studio.",
    name: "Conex",
    role: "PLACEHOLDER TITLE",
    logo: "/conex%20logo.png",
  },
];
