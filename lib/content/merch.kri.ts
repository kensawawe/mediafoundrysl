import type { MerchItem } from "./merch";

export const merchHero = {
  eyebrow: "De Kam Sun",
  title: "Foundry Gudz.",
  body:
    "Wɛarabul ɛn ɛvride tin dɛn we kyas frɔm di sem studio we mek di wok — wan fizikal ɛkstɛnshɔn fɔ di brand, nɔ wan webstɔ afta-tot.",
};

export const merchCopy = {
  all: "Ɔl",
  addToCart: "Ad to kat",
  addedToCart: "Ad ✓",
  outOfStock: "I dɔn dɔn",
  selectSize: "Pik sayz",
  selectSizePrompt: "Pik wan sayz fɔ ad dis to yu kat.",
  size: "Sayz",
  quantity: "Kwantiti",
  careInstructions: "Kea Instrɔkshɔn",
  moreDetails: "Mɔ Ditel",
  returnsGuarantee: "Ritɔn Ɛn Gyarantii",
  returnsDefault:
    "Di stɔ nɔ dɔn opin fɔ ɔda yet — wan rial ritɔn polisi go pɔblish wɛn i opin.",
  breadcrumbHome: "Om",
  breadcrumbMerch: "Merch",
  yourCart: "Yu Kat",
  emptyCart: "Yu kat nɔ gɛt natin.",
  remove: "Rimuv",
  subtotal: "Sɔbtotal",
  checkout: "Chɛkaut",
  checkoutComingSoon: "Chɛkaut nɔ dɔn opin yet — dis kat na jɔs privyu.",
  continueShopping: "Kɔntinyu brawz",
};

// Product names, care/details copy stay descriptive; names are proper
// nouns and stay in English, matching the work/journal convention.
export const merchItems: MerchItem[] = [
  {
    slug: "foundry-tee",
    name: "The Foundry Tee",
    category: "Apparel",
    description:
      "Ɛvi kɔtɔn, skrin-prin insay studio. Di mak, nɔ di noyz — kɔt fɔ ɛvride wea, bil fɔ las pas di sizin we i lɔnch.",
    price: 450,
    stockQuantity: 40,
    images: ["Front", "Back", "Detail", "Lifestyle", "Flat Lay"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    careInstructions: "Mashin wash kol, insay-aut. Tɔmbul dray lo. Nɔ ayɔn di prin.",
    details: "100% kɔmb kɔtɔn, 180gsm. Skrin-prin na Fritɔn.",
  },
  {
    slug: "heavyweight-hoodie",
    name: "Heavyweight Hoodie",
    category: "Apparel",
    description:
      "Garmɛnt-day flis wit brɔsh insay, bil fɔ lɔng edit-be nyt dɛn ɛn di wɔk go os afta. Kɔt rileks, nɔ bɔksi.",
    price: 950,
    stockQuantity: 25,
    images: ["Front", "Back", "Detail", "Lifestyle", "Flat Lay"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    careInstructions: "Mashin wash kol wit sem kɔlɔ dɛn. Tɔmbul dray lo. Nɔ ayɔn di prin.",
    details: "80/20 kɔtɔn-poli flis, 320gsm. Brɔsh insay, kanguru pɔket.",
  },
  {
    slug: "foundry-cap",
    name: "Foundry Cap",
    category: "Apparel",
    description:
      "Wan lo-profayl, strɔktɔ siks-panɛl kap. Ɛmbrɔyda — nɔ prin — fɔ wan mak we ol ɔp to wɛda ɛn wash.",
    price: 350,
    stockQuantity: 30,
    images: ["Front", "Side", "Back", "Detail", "Lifestyle"],
    careInstructions: "Spɔt klin ɔnli. Nɔ mashin wash ɔ tɔmbul dray — strɔkchɔ nɔ go ol.",
    details: "Kɔtɔn twil, adjɔstabul strap, wan sayz fit ɔlmost ɛvribɔdi.",
  },
  {
    slug: "studio-tote",
    name: "Studio Tote",
    category: "Accessories",
    description:
      "Ɛvi kanvas bil fɔ kyari di sem lod lɛk kamra gia. Rinfɔs andul dɛn, wan flat bes, rum fɔ laptɔp ɛn di rɛst ɔf di kit.",
    price: 300,
    stockQuantity: 35,
    images: ["Front", "Interior", "Detail", "Lifestyle", "Flat Lay"],
    careInstructions: "Spɔt klin ɔ an wash kol. Ea dray.",
    details: "12oz kɔtɔn kanvas, rinfɔs stich, 40cm x 38cm.",
  },
  {
    slug: "cast-mark-stickers",
    name: "Cast Mark Sticker Sheet",
    category: "Accessories",
    description: "Wan shit ɔf studio mak dɛn fɔ laptɔp, kes, ɛn gia. Mat vinil, wɛda-pruf, kɔt klin.",
    price: 90,
    stockQuantity: 60,
    images: ["Full Sheet", "Detail", "Applied — Laptop", "Applied — Case"],
    details: "Wɔtapruf mat vinil, UV-rizistant. Wan-wan day-kɔt, pil ɛn put.",
  },
  {
    slug: "enamel-pin-set",
    name: "Enamel Pin Set",
    category: "Accessories",
    description: "Tri smɔl mak dɛn na ad enamel, fɔ jaket, strap, ɛn lanyad. Dɛn sɛl am as wan sɛt.",
    price: 150,
    stockQuantity: 45,
    images: ["Full Set", "Detail", "Applied — Jacket", "Applied — Strap"],
    details: "Ad enamel wit bataflay klɔch bakin. Sɛt ɔf tri pin.",
  },
  {
    slug: "studio-mug",
    name: "Studio Mug",
    category: "Drinkware",
    description:
      "Stonwea, glez na studio kɔlɔ dɛn, i ol di kɔfi we ol di dedlayn. Dishwasha ɛn maykrowev sef.",
    price: 250,
    stockQuantity: 30,
    images: ["Front", "Side", "Detail", "Lifestyle"],
    careInstructions: "Dishwasha ɛn maykrowev sef. Di glez fɔ dal small small pas plɛnti ia we yu de yus am.",
    details: "350ml stonwea, glez awtsayd ɛn insay.",
  },
  {
    slug: "field-notebook",
    name: "Field Notebook",
    category: "Stationery",
    description:
      "Dɔt-grid pej dɛn we bayn insay wan strɔng kɔva, sayz fɔ skrip, shɔt lis, ɛn af-fɔm aydiya dɛn. I de lay flat wɛn opin.",
    price: 200,
    stockQuantity: 50,
    images: ["Cover", "Open — Pages", "Detail", "Lifestyle"],
    details: "80 dɔt-grid pej, 100gsm pepa. Ilastik klozha, ribin bukmak.",
  },
];
