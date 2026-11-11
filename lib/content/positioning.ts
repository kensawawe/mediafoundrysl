// The Media Foundry's positioning: a creative communications and media
// production company. Three connected pillars (Strategy → Production →
// Storytelling), two audiences under one offer, and a four-step process.
// English only — Krio is switched off site-wide.

export type Pillar = {
  id: "strategy" | "production" | "storytelling";
  number: string;
  name: string;
  /** The short, active headline that names what the pillar does. */
  headline: string;
  /** One-line summary for the homepage blocks. */
  summary: string;
  /** Fuller explanation for the What We Do page. */
  body: string[];
  /** A handful of capabilities for the homepage. */
  highlights: string[];
  /** The full (still deliberately short) list for the What We Do page. */
  capabilities: string[];
  /** The client situations this pillar answers, for the What We Do page. */
  whenToCall: string;
  image: string;
  imageAlt: string;
  /** The lettered illustration used on the homepage's hover-to-grow tiles. */
  illustration: string;
};

export const pillars: Pillar[] = [
  {
    id: "strategy",
    number: "01",
    name: "Strategy",
    headline: "Find the message.",
    summary: "Understand the challenge, define the audience and develop the creative direction.",
    body: [
      "Good communication begins with understanding.",
      "We work with organisations and brands to understand their objectives, audiences, challenges and opportunities. We use that understanding to define the message, develop the creative direction and decide the most effective way to communicate.",
      "We think before we create, so that every film, photograph and campaign has a reason to exist.",
    ],
    highlights: ["Strategic communications", "Messaging and positioning", "Creative direction", "Story development"],
    capabilities: [
      "Strategic communications",
      "Brand positioning and messaging",
      "Communication planning",
      "Campaign strategy",
      "Creative direction",
      "Audience and contextual research",
      "Story development",
      "Content strategy",
    ],
    whenToCall:
      "When you know something needs to be communicated, but not yet what to say, who it is for or how it should be told.",
    image: "/stills/freetown-sprawl.jpg",
    imageAlt: "Aerial view across Freetown towards the hills",
    illustration: "/3.jpg",
  },
  {
    id: "production",
    number: "02",
    name: "Production",
    headline: "Create the work.",
    summary: "Turn ideas and messages into compelling films, photography and audio-visual content.",
    body: [
      "We turn ideas, messages and stories into compelling visual and audio experiences.",
      "From documentaries and corporate films to photography, interviews and campaign content, we produce media that helps organisations communicate clearly and connect with their audiences.",
      "One team carries the work from the shoot to the final edit, so the idea survives the process.",
    ],
    highlights: ["Documentary production", "Brand and corporate films", "Photography", "Podcasts and interviews"],
    capabilities: [
      "Documentary production",
      "Institutional and impact films",
      "Corporate and brand films",
      "Campaign videos",
      "Commercial photography",
      "Event and project documentation",
      "Interviews and testimonials",
      "Podcast and multicamera video production",
      "Post-production and editing",
    ],
    whenToCall:
      "When you need a film, a set of photographs or a series produced to a professional standard, with a clear purpose behind every frame.",
    image: "/stills/freetown-night.jpg",
    imageAlt: "Freetown at night from above, traffic circling a roundabout",
    illustration: "/1.jpg",
  },
  {
    id: "storytelling",
    number: "03",
    name: "Storytelling",
    headline: "Make it matter.",
    summary: "Shape narratives that connect people with the work, ideas and organisations behind them.",
    body: [
      "The strongest stories do more than communicate information. They create understanding, build connections and give people a reason to care.",
      "Storytelling is the editorial discipline that connects strategy with production. We find the people, moments and details that make an organisation, a programme or an idea relatable and memorable.",
      "A story might be told through a documentary, a photograph, an interview, an article or a campaign. The medium follows the story.",
    ],
    highlights: ["Institutional storytelling", "Human-interest stories", "Impact storytelling", "Scriptwriting"],
    capabilities: [
      "Institutional storytelling",
      "Human-interest stories",
      "Impact and development storytelling",
      "Documentary storytelling",
      "Editorial and campaign content",
      "Social impact communications",
      "Narrative development and scriptwriting",
    ],
    whenToCall:
      "When your work is important but hard to explain, and people need to feel why it matters, not just read about it.",
    image: "/stills/freetown-city.jpg",
    imageAlt: "A busy Freetown neighbourhood seen from above",
    illustration: "/storytelling.jpg",
  },
];

export const pillarsSection = {
  eyebrow: "What we do",
  heading: "Everything your brand needs, one team, no handoffs.",
  subheading: "We do what most agencies split across several vendors under one roof, so nothing gets lost in transit.",
  intro:
    "From the first question to the final frame, we bring strategic thinking and creative production together to tell stories that matter.",
  link: "How we work",
};

export type Audience = {
  name: string;
  body: string;
  work: string[];
  image: string;
  imageAlt: string;
};

export const audiencesSection = {
  eyebrow: "Who we work with",
  heading: "Organisations and brands with something worth saying.",
};

export const audiences: Audience[] = [
  {
    name: "Organisations and institutions",
    body: "We work with organisations doing meaningful work, helping them document their programmes, communicate their impact and connect with the people their work serves.",
    work: [
      "Development and impact films",
      "Institutional storytelling",
      "Programme documentation",
      "Human-interest stories",
      "Campaign films",
      "Interviews and testimonials",
    ],
    image: "/stills/freetown-estuary.jpg",
    imageAlt: "An estuary and neighbourhood on the edge of Freetown",
  },
  {
    name: "Brands and businesses",
    body: "We help businesses communicate their identity, products and ideas through thoughtful creative direction and professional media production.",
    work: [
      "Brand films",
      "Corporate photography",
      "Commercial campaigns",
      "Product films",
      "Customer stories",
      "Visual content production",
    ],
    image: "/stills/freetown-coast.jpg",
    imageAlt: "Freetown's coastline at sunset",
  },
];

export type ProcessStep = { number: string; name: string; body: string };

export const processSection = {
  eyebrow: "How we work",
  heading: "From the first question to the final frame.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    name: "Discover",
    body: "We listen, ask questions and understand the organisation, the audience, the challenge and the story.",
  },
  {
    number: "02",
    name: "Define",
    body: "We develop the message, determine the creative direction and establish the approach.",
  },
  {
    number: "03",
    name: "Create",
    body: "We produce the films, photography, campaigns and other creative materials required.",
  },
  {
    number: "04",
    name: "Deliver",
    body: "We refine the work, deliver the final assets and help you put the story to use.",
  },
];

// The What We Do page (/services).
export const servicesPage = {
  title: "What we do.",
  intro:
    "We are a creative communications and media production company. We work with organisations and brands to find the message, create the work and make it matter.",
  flowLabel: "One connected process",
  whenLabel: "When to call us",
  capabilitiesLabel: "Capabilities",
  discuss: "Discuss a project",
  combineHeading: "Commission one pillar, or all three.",
  combineIntro:
    "Every project is shaped around what you need to communicate. Some begin with strategy, some with a camera.",
  combineExamples: [
    {
      title: "A single production",
      body: "An organisation engages us to produce a documentary about one of its programmes.",
    },
    {
      title: "A full campaign",
      body: "An institution needs strategic communications support, then a campaign built and produced around it.",
    },
    {
      title: "A brand package",
      body: "A business commissions a brand film and a set of supporting photographs from the same shoot.",
    },
  ],
  supportingHeading: "Alongside the core work",
  supportingBody:
    "Graphic design supports our campaigns, visual identities and communication materials. When a project needs a website, media buying or social media management, we bring in trusted specialist collaborators and keep the story consistent across them.",
};
