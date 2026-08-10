export const merchHero = {
  eyebrow: "Coming Soon",
  title: "Foundry Goods.",
  body:
    "Wearable and everyday pieces cast from the same studio that makes the work — a physical extension of the brand, not a webstore afterthought.",
};

export const merchCopy = {
  all: "All",
  addToCart: "Add to cart",
  addedToCart: "Added ✓",
  outOfStock: "Out of stock",
  selectSize: "Select size",
  selectSizePrompt: "Select a size to add this to your cart.",
  size: "Size",
  quantity: "Quantity",
  careInstructions: "Care Instructions",
  moreDetails: "More Details",
  returnsGuarantee: "Returns & Guarantee",
  returnsDefault:
    "The store isn't open for orders yet — a real returns policy will be published once it goes live.",
  breadcrumbHome: "Home",
  breadcrumbMerch: "Merch",
  yourCart: "Your Cart",
  emptyCart: "Your cart is empty.",
  remove: "Remove",
  subtotal: "Subtotal",
  checkout: "Checkout",
  checkoutComingSoon: "Checkout isn't open yet — this cart is a preview.",
  continueShopping: "Continue browsing",
};

/** New Leone amounts, whole units (no decimal display — matches everyday
 *  NLe pricing convention). Placeholder figures pending real pricing. */
export function formatPrice(amount: number) {
  return `NLe ${amount.toLocaleString("en-US")}`;
}

export type MerchCategory = "Apparel" | "Accessories" | "Drinkware" | "Stationery";

export const merchCategories: MerchCategory[] = ["Apparel", "Accessories", "Drinkware", "Stationery"];

export type MerchItem = {
  slug: string;
  name: string;
  category: MerchCategory;
  /** Full product-page description — the grid card itself stays minimal
   *  (image, name, price only), so this only renders on the product page. */
  description: string;
  /** New Leone amount. */
  price: number;
  stockQuantity: number;
  /** Angle/view labels for the gallery — real photography isn't shot yet,
   *  so each renders as a distinctly-labeled Slate placeholder rather than
   *  faking identical images. Structure (and the gallery UI itself) is
   *  ready to swap in real image URLs later without changing the shape. */
  images: string[];
  /** Omitted for items that don't need a size (mugs, notebooks, etc). */
  sizes?: string[];
  careInstructions?: string;
  details?: string;
};

export const merchItems: MerchItem[] = [
  {
    slug: "foundry-tee",
    name: "The Foundry Tee",
    category: "Apparel",
    description:
      "Heavyweight cotton, screen-printed in-house. The mark, not the noise — cut for everyday wear, built to outlast the season it launched in.",
    price: 450,
    stockQuantity: 40,
    images: ["Front", "Back", "Detail", "Lifestyle", "Flat Lay"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    careInstructions: "Machine wash cold, inside out. Tumble dry low. Do not iron the print.",
    details: "100% combed cotton, 180gsm. Screen-printed in Freetown.",
  },
  {
    slug: "heavyweight-hoodie",
    name: "Heavyweight Hoodie",
    category: "Apparel",
    description:
      "Garment-dyed fleece with a brushed interior, built for long edit-bay nights and the walk home after. Cut relaxed, not boxy.",
    price: 950,
    stockQuantity: 25,
    images: ["Front", "Back", "Detail", "Lifestyle", "Flat Lay"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    careInstructions: "Machine wash cold with like colors. Tumble dry low. Do not iron the print.",
    details: "80/20 cotton-poly fleece, 320gsm. Brushed interior, kangaroo pocket.",
  },
  {
    slug: "foundry-cap",
    name: "Foundry Cap",
    category: "Apparel",
    description:
      "A low-profile, structured six-panel cap. Embroidered — not printed — for a mark that holds up to weather and washing alike.",
    price: 350,
    stockQuantity: 30,
    images: ["Front", "Side", "Back", "Detail", "Lifestyle"],
    careInstructions: "Spot clean only. Do not machine wash or tumble dry — structure won't hold.",
    details: "Cotton twill, adjustable strap, one size fits most.",
  },
  {
    slug: "studio-tote",
    name: "Studio Tote",
    category: "Accessories",
    description:
      "Heavy canvas built to carry the same load as camera gear. Reinforced handles, a flat base, room for a laptop and the rest of the kit.",
    price: 300,
    stockQuantity: 35,
    images: ["Front", "Interior", "Detail", "Lifestyle", "Flat Lay"],
    careInstructions: "Spot clean or hand wash cold. Air dry.",
    details: "12oz cotton canvas, reinforced stitching, 40cm x 38cm.",
  },
  {
    slug: "cast-mark-stickers",
    name: "Cast Mark Sticker Sheet",
    category: "Accessories",
    description: "A sheet of studio marks sized for laptops, cases and gear. Matte vinyl, weatherproof, cut clean.",
    price: 90,
    stockQuantity: 60,
    images: ["Full Sheet", "Detail", "Applied — Laptop", "Applied — Case"],
    details: "Waterproof matte vinyl, UV-resistant. Individually die-cut, peel and apply.",
  },
  {
    slug: "enamel-pin-set",
    name: "Enamel Pin Set",
    category: "Accessories",
    description: "Three small marks in hard enamel, for jackets, straps and lanyards. Sold as a set.",
    price: 150,
    stockQuantity: 45,
    images: ["Full Set", "Detail", "Applied — Jacket", "Applied — Strap"],
    details: "Hard enamel with a butterfly clutch backing. Set of three pins.",
  },
  {
    slug: "studio-mug",
    name: "Studio Mug",
    category: "Drinkware",
    description:
      "Stoneware, glazed in studio colors, holds the coffee that holds the deadline. Dishwasher and microwave safe.",
    price: 250,
    stockQuantity: 30,
    images: ["Front", "Side", "Detail", "Lifestyle"],
    careInstructions: "Dishwasher and microwave safe. Glaze may dull slightly over years of daily use.",
    details: "350ml stoneware, glazed exterior and interior.",
  },
  {
    slug: "field-notebook",
    name: "Field Notebook",
    category: "Stationery",
    description:
      "Dot-grid pages bound in a durable cover, sized for scripts, shot lists and half-formed ideas. Lies flat when open.",
    price: 200,
    stockQuantity: 50,
    images: ["Cover", "Open — Pages", "Detail", "Lifestyle"],
    details: "80 dot-grid pages, 100gsm paper. Elastic closure, ribbon bookmark.",
  },
];
