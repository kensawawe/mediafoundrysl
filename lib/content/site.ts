export const site = {
  name: "The Media Foundry",
  shortName: "Media Foundry",
  tagline: "A creative communications and media production company.",
  description:
    "The Media Foundry is a creative communications and media production company in Freetown, Sierra Leone, helping organisations and brands tell meaningful stories through strategy, film and visual media.",
  url: "https://themediafoundrysl.com",
  email: "collab@themediafoundrysl.com",
  /** WhatsApp number in international format, digits only (e.g. "23276123456").
   *  Leave empty to hide the WhatsApp option on the Contact page. */
  whatsapp: "",
  location: "Freetown, Sierra Leone",
  // `platform` is a stable, never-translated id used to pick the right
  // icon; `label` is the display text. Social platform names are proper
  // nouns and stay in English in both languages.
  social: [
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/the_media_foundry/" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/the-media-foundry-sl/" },
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61574995861393" },
  ],
  formspreeEndpoint: "https://formspree.io/f/xzdnajwo",
};

export const startAProjectLabel = "Start a project";

export const navLinks = [
  { label: "What We Do", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

/** Secondary links that live in the footer rather than the main navigation. */
export const footerExtraLinks = [{ label: "Careers", href: "/careers" }];

export const footerCopy = {
  contact: "Contact",
  ctaLine1: "Have something worth saying?",
  ctaLine2: "Let's tell its story.",
  emailLabel: "Email",
  startProjectHeading: "Start a project",
  startProjectBody:
    "Whether you are documenting meaningful work, launching a campaign or building a brand, we'd like to hear what you have in mind.",
  letsTalk: "Let's talk",
};
