// Builds the site's static images:
//  - logo crops with a transparent background (from public/brand/logo-source.jpg)
//  - app icons
//  - product photos as WebP in public/products/ (only products used in data/mapping.json)
//
// Usage: node scripts/assets.mjs

import { existsSync, mkdirSync, readFileSync } from "node:fs";
import sharp from "sharp";

const LOGO = "public/brand/logo-source.jpg";

// Pixel boxes in the 1276x1280 source logo.
const SHIELD = { left: 280, top: 172, width: 726, height: 708 };
const FULL = { left: 228, top: 160, width: 830, height: 850 };

// "Colour to alpha" for white: turns the white background transparent and
// un-blends the soft edges so the logo also looks clean on navy.
async function whiteToAlpha(input) {
  const { data, info } = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const alpha = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (alpha < 0.04) {
      data[i + 3] = 0;
      continue;
    }
    data[i] = Math.round(255 - (255 - r) / alpha);
    data[i + 1] = Math.round(255 - (255 - g) / alpha);
    data[i + 2] = Math.round(255 - (255 - b) / alpha);
    data[i + 3] = Math.round(alpha * 255);
  }
  return sharp(data, { raw: info });
}

async function logos() {
  const shield = await whiteToAlpha(sharp(LOGO).extract(SHIELD));
  const shieldPng = await shield.png().toBuffer();
  await sharp(shieldPng).resize({ height: 160 }).png().toFile("public/brand/shield.png");

  const full = await whiteToAlpha(sharp(LOGO).extract(FULL));
  await full.resize({ width: 520 }).png().toFile("public/brand/logo.png");

  // Icons: shield centred on a square canvas.
  const icon = async (size, background, file) => {
    const inner = Math.round(size * 0.84);
    const mark = await sharp(shieldPng)
      .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background } })
      .composite([{ input: mark, gravity: "center" }])
      .png()
      .toFile(file);
  };
  await icon(256, { r: 0, g: 0, b: 0, alpha: 0 }, "app/icon.png");
  await icon(180, { r: 255, g: 255, b: 255, alpha: 1 }, "app/apple-icon.png");
  console.log("Logo and icons done.");
}

async function productImages() {
  const products = JSON.parse(readFileSync("data/products.json", "utf8"));
  const mapping = JSON.parse(readFileSync("data/mapping.json", "utf8"));
  const used = new Set(Object.values(mapping).filter(Array.isArray).flat());
  mkdirSync("public/products", { recursive: true });

  let done = 0;
  for (const p of products.filter((p) => used.has(p.slug) && p.image)) {
    const out = `public/products/${p.slug}.webp`;
    if (existsSync(out)) continue;
    const res = await fetch(p.image);
    if (!res.ok) {
      console.warn(`Image failed (${res.status}): ${p.slug}`);
      continue;
    }
    await sharp(Buffer.from(await res.arrayBuffer()))
      .flatten({ background: "#ffffff" })
      .resize(720, 720, { fit: "contain", background: "#ffffff" })
      .webp({ quality: 80 })
      .toFile(out);
    done++;
  }
  console.log(`Product images: ${done} new.`);
}

await logos();
await productImages();
