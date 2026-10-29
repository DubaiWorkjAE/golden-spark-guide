// Pulls products from the public WooCommerce Store API on gsdetectors.com
// and writes data/products.json. Specs come only from the product's own
// attributes on the site. Nothing is guessed: missing values stay null.
//
// Usage: node scripts/scrape.mjs

import { mkdirSync, writeFileSync } from "node:fs";

const API = "https://gsdetectors.com/wp-json/wc/store/v1/products";
const ACCESSORIES_CATEGORY_ID = 111; // "Accessories" and its child categories

// Site categories that name a brand. Used only when the product has no brand set.
const BRAND_CATEGORIES = {
  97: "Minelab",
  123: "Garrett",
  103: "Garrett",
  109: "Garrett",
  99: "GER Detect",
  125: "Nokta Makro",
  101: "OKM",
  300: "XP",
  105: "Fisher",
  114: "Blackdog",
  301: "Groundtech",
  102: "TeroVido",
  107: "Quest",
  312: "Thermo",
  282: "Presidium",
  119: "KS Analysis",
};

const ENTITIES = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };

function decode(text = "") {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .trim();
}

function attribute(product, name) {
  const clean = (s) => decode(s).replace(/\s+/g, " ").toLowerCase();
  const attr = product.attributes?.find((a) => clean(a.name) === clean(name));
  if (!attr?.terms?.length) return null;
  return attr.terms.map((t) => decode(t.name)).join(" / ");
}

// "1 feet" -> "1 ft", "25m" -> "25 m". Only formatting, the number is never changed.
function formatLength(value) {
  if (!value) return null;
  return value
    .replace(/(\d)\s*(feet|foot|ft)\b/gi, "$1 ft")
    .replace(/(\d)\s*m\b/gi, "$1 m");
}

function capitalise(value) {
  return value ? value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : null;
}

function price(product) {
  const p = product.prices;
  if (!p) return null;
  const raw = product.type === "variable" ? p.price_range?.min_amount ?? p.price : p.price;
  const amount = Number(raw) / 10 ** (p.currency_minor_unit ?? 2);
  return amount > 0 ? amount : null;
}

function brand(product) {
  if (product.brands?.length) return decode(product.brands[0].name);
  const hit = product.categories?.find((c) => BRAND_CATEGORIES[c.id]);
  return hit ? BRAND_CATEGORIES[hit.id] : null;
}

async function fetchAll() {
  const all = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${API}?per_page=100&page=${page}`);
    if (!res.ok) throw new Error(`Store API ${res.status} on page ${page}`);
    const batch = await res.json();
    if (!batch.length) break;
    all.push(...batch);
  }
  return all;
}

const raw = await fetchAll();
mkdirSync("data/raw", { recursive: true });
writeFileSync("data/raw/wc-products.json", JSON.stringify(raw, null, 1));

const isAccessory = (p) =>
  p.categories?.some((c) => c.id === ACCESSORIES_CATEGORY_ID || c.parent === ACCESSORIES_CATEGORY_ID);

const products = raw
  .filter((p) => !isAccessory(p))
  .map((p) => ({
    slug: p.slug,
    name: decode(p.name),
    brand: brand(p),
    category: p.categories?.map((c) => decode(c.name)) ?? [],
    price: price(p),
    depth: formatLength(attribute(p, "Depth")),
    frontRange: formatLength(attribute(p, "Front Range")),
    madeIn: attribute(p, "Made In"),
    warranty: capitalise(attribute(p, "Warranty")),
    technology: attribute(p, "System Device"),
    targets: attribute(p, "Targets"),
    image: p.images?.[0]?.src ?? null,
    url: p.permalink,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

writeFileSync("data/products.json", JSON.stringify(products, null, 2) + "\n");
console.log(`Saved ${products.length} products (${raw.length - products.length} accessories skipped).`);
