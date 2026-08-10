export const merchHero = {
  eyebrow: "Coming Soon",
  title: "Foundry Goods.",
  body:
    "Wearable and everyday pieces cast from the same studio that makes the work — a physical extension of the brand, not a webstore afterthought.",
};

export const merchCopy = {
  comingSoon: "Coming soon",
  notAvailable: "Not yet available for purchase — check back soon.",
};

export type MerchCategory = "Apparel" | "Accessories" | "Drinkware" | "Stationery";

export type MerchItem = {
  slug: string;
  name: string;
  category: MerchCategory;
  description: string;
  /** Falls back to the Slate placeholder (components/ui/Slate.tsx) when omitted. */
  image?: string;
};

export const merchItems: MerchItem[] = [
  {
    slug: "foundry-tee",
    name: "The Foundry Tee",
    category: "Apparel",
    description: "Heavyweight cotton, screen-printed in-house. The mark, not the noise.",
  },
  {
    slug: "heavyweight-hoodie",
    name: "Heavyweight Hoodie",
    category: "Apparel",
    description: "Garment-dyed fleece, built for long edit-bay nights.",
  },
  {
    slug: "foundry-cap",
    name: "Foundry Cap",
    category: "Apparel",
    description: "Low-profile and structured, embroidered — not printed.",
  },
  {
    slug: "studio-tote",
    name: "Studio Tote",
    category: "Accessories",
    description: "Canvas built to carry the same load as camera gear.",
  },
  {
    slug: "cast-mark-stickers",
    name: "Cast Mark Sticker Sheet",
    category: "Accessories",
    description: "A sheet of studio marks for laptops, cases and gear.",
  },
  {
    slug: "enamel-pin-set",
    name: "Enamel Pin Set",
    category: "Accessories",
    description: "Small marks for jackets, straps and lanyards.",
  },
  {
    slug: "studio-mug",
    name: "Studio Mug",
    category: "Drinkware",
    description: "Stoneware, glazed in studio colors. Holds the coffee that holds the deadline.",
  },
  {
    slug: "field-notebook",
    name: "Field Notebook",
    category: "Stationery",
    description: "Dot-grid pages for scripts, shot lists and half-formed ideas.",
  },
];
