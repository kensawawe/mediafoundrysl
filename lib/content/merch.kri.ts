import type { MerchItem } from "./merch";

export const merchHero = {
  eyebrow: "De Kam Sun",
  title: "Foundry Gudz.",
  body:
    "Wɛarabul ɛn ɛvride tin dɛn we kyas frɔm di sem studio we mek di wok — wan fizikal ɛkstɛnshɔn fɔ di brand, nɔ wan webstɔ afta-tot.",
};

export const merchCopy = {
  comingSoon: "De kam sun",
  notAvailable: "I nɔ de yet fɔ bay — chɛk bak sun.",
};

// Product names are proper nouns and stay in English; only category and
// description translate.
export const merchItems: MerchItem[] = [
  {
    slug: "foundry-tee",
    name: "The Foundry Tee",
    category: "Apparel",
    description: "Ɛvi kɔtɔn, skrin-prin insay studio. Di mak, nɔ di noyz.",
  },
  {
    slug: "heavyweight-hoodie",
    name: "Heavyweight Hoodie",
    category: "Apparel",
    description: "Garmɛnt-day flis, bil fɔ lɔng edit-be nyt dɛn.",
  },
  {
    slug: "foundry-cap",
    name: "Foundry Cap",
    category: "Apparel",
    description: "Lo-profayl ɛn strɔktɔ, ɛmbrɔyda — nɔ prin.",
  },
  {
    slug: "studio-tote",
    name: "Studio Tote",
    category: "Accessories",
    description: "Kanvas bil fɔ kyari di sem lod lɛk kamra gia.",
  },
  {
    slug: "cast-mark-stickers",
    name: "Cast Mark Sticker Sheet",
    category: "Accessories",
    description: "Wan shit ɔf studio mak dɛn fɔ laptɔp, kes, ɛn gia.",
  },
  {
    slug: "enamel-pin-set",
    name: "Enamel Pin Set",
    category: "Accessories",
    description: "Smɔl mak dɛn fɔ jaket, strap, ɛn lanyad.",
  },
  {
    slug: "studio-mug",
    name: "Studio Mug",
    category: "Drinkware",
    description: "Stonwea, glez na studio kɔlɔ dɛn. I ol di kɔfi we ol di dedlayn.",
  },
  {
    slug: "field-notebook",
    name: "Field Notebook",
    category: "Stationery",
    description: "Dɔt-grid pej dɛn fɔ skrip, shɔt lis, ɛn af-fɔm aydiya dɛn.",
  },
];
