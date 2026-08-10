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
  {
    slug: "foundry-crewneck",
    name: "Foundry Crewneck",
    category: "Apparel",
    description:
      "Mid-weight fleece crewneck, brushed inside. Sits between the tee and the hoodie — for the days that need a little more.",
    price: 700,
    stockQuantity: 28,
    images: ["Front", "Back", "Detail", "Lifestyle", "Flat Lay"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    careInstructions: "Machine wash cold with like colors. Tumble dry low.",
    details: "80/20 cotton-poly fleece, 280gsm. Ribbed cuffs and hem.",
  },
  {
    slug: "foundry-long-sleeve-tee",
    name: "Foundry Long Sleeve",
    category: "Apparel",
    description:
      "The same heavyweight cotton as the tee, cut long for the season the studio actually shoots in.",
    price: 500,
    stockQuantity: 35,
    images: ["Front", "Back", "Detail", "Lifestyle", "Flat Lay"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    careInstructions: "Machine wash cold, inside out. Tumble dry low. Do not iron the print.",
    details: "100% combed cotton, 180gsm. Screen-printed in Freetown.",
  },
  {
    slug: "foundry-track-jacket",
    name: "Foundry Track Jacket",
    category: "Apparel",
    description: "A lightweight zip jacket built for set — layers over anything, packs down to nothing.",
    price: 850,
    stockQuantity: 20,
    images: ["Front", "Back", "Detail", "Lifestyle", "Flat Lay"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    careInstructions: "Machine wash cold. Hang dry — do not tumble dry.",
    details: "Ripstop shell, mesh lining, full zip. Water-resistant finish.",
  },
  {
    slug: "foundry-beanie",
    name: "Foundry Beanie",
    category: "Apparel",
    description: "Ribbed knit, embroidered mark. One size, built for Freetown's two real seasons.",
    price: 250,
    stockQuantity: 40,
    images: ["Front", "Side", "Detail", "Lifestyle"],
    careInstructions: "Hand wash cold. Lay flat to dry.",
    details: "Acrylic-wool blend, ribbed knit, embroidered mark.",
  },
  {
    slug: "studio-laptop-sleeve",
    name: "Studio Laptop Sleeve",
    category: "Accessories",
    description: "Padded neoprene sized for a 14-inch machine, with room for a cable or two.",
    price: 320,
    stockQuantity: 30,
    images: ["Front", "Interior", "Detail", "Lifestyle"],
    details: "Padded neoprene, fits up to 14-inch laptops. Zip closure.",
  },
  {
    slug: "cast-mark-keychain",
    name: "Cast Mark Keychain",
    category: "Accessories",
    description: "A small cast-metal version of the studio mark, for keys, bags or a camera strap.",
    price: 120,
    stockQuantity: 55,
    images: ["Detail", "Applied — Bag", "Applied — Keys"],
    details: "Cast zinc alloy, antique finish, split ring.",
  },
  {
    slug: "foundry-camera-strap",
    name: "Foundry Camera Strap",
    category: "Accessories",
    description: "Webbing strap built to the same spec the crew actually shoots with, not a display piece.",
    price: 280,
    stockQuantity: 25,
    images: ["Full", "Detail", "Applied — Camera"],
    details: "Nylon webbing, leather ends, quick-release buckles.",
  },
  {
    slug: "studio-pouch",
    name: "Studio Pouch",
    category: "Accessories",
    description: "Canvas zip pouch for cables, cards, and the small things that go missing first.",
    price: 180,
    stockQuantity: 35,
    images: ["Front", "Interior", "Detail", "Lifestyle"],
    details: "12oz cotton canvas, water-resistant zip, 18cm x 12cm.",
  },
  {
    slug: "studio-travel-tumbler",
    name: "Studio Travel Tumbler",
    category: "Drinkware",
    description: "Insulated stainless steel, keeps coffee hot through a full morning shoot.",
    price: 320,
    stockQuantity: 25,
    images: ["Front", "Detail", "Lifestyle"],
    careInstructions: "Hand wash only. Do not microwave.",
    details: "473ml double-wall stainless steel, leak-proof lid.",
  },
  {
    slug: "foundry-water-bottle",
    name: "Foundry Water Bottle",
    category: "Drinkware",
    description: "Double-walled stainless steel, 750ml, sized for a full day out of the studio.",
    price: 280,
    stockQuantity: 30,
    images: ["Front", "Detail", "Lifestyle"],
    careInstructions: "Hand wash only. Do not microwave.",
    details: "750ml double-wall stainless steel, powder-coated finish.",
  },
  {
    slug: "foundry-desk-pad",
    name: "Foundry Desk Pad",
    category: "Stationery",
    description: "A large-format desk pad for notes, sketches and the ideas that don't fit a notebook page.",
    price: 220,
    stockQuantity: 30,
    images: ["Full", "Detail", "Lifestyle"],
    details: "50 tear-away sheets, 40cm x 30cm, kraft backing.",
  },
  {
    slug: "foundry-postcard-set",
    name: "Foundry Postcard Set",
    category: "Stationery",
    description: "A set of ten postcards pulled from the studio's own frame grabs.",
    price: 80,
    stockQuantity: 45,
    images: ["Full Set", "Detail", "Lifestyle"],
    details: "Set of 10, 300gsm matte card stock, 10cm x 15cm.",
  },
];
