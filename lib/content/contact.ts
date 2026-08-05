// Plain string[], not `as const` — the Krio list holds different literal
// values, and both must share the same type for useTranslated.
export const projectTypes: string[] = [
  "Brand Identity",
  "Campaign",
  "Film & Production",
  "Digital",
  "Something else",
];

export const contactPageCopy = {
  heading: "Start a project.",
  intro:
    "Brand, campaign, film or something in between — walk us through it and we'll follow up within two working days.",
  createPrompt: "What are you looking to create?",
  descriptionLabel: "Project description",
  descriptionPlaceholder: "Tell us what you have in mind…",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  companyLabel: "Company",
  companyOptional: "Optional",
  emailLabel: "Email",
  sending: "Sending…",
  submit: "Start a conversation",
  success: "Sent — we'll be in touch.",
  error: "Something went wrong — email us directly.",
};
