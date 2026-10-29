import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import productsJson from "@/data/products.json";
import mappingJson from "@/data/mapping.json";
import sectionsJson from "@/data/sections.json";
import videosJson from "@/data/videos.json";

export type Product = {
  slug: string;
  name: string;
  brand: string | null;
  category: string[];
  price: number | null;
  depth: string | null;
  frontRange: string | null;
  madeIn: string | null;
  warranty: string | null;
  technology: string | null;
  targets: string | null;
  image: string | null;
  url: string;
};

export type Video = { src: string; poster?: string } | null;

export type SectionText = {
  anchor: string;
  title: string;
  callout: string;
  finds: string;
  bestFor: string;
  explanation: string;
  neutral?: boolean;
  review?: string;
};

export type Group = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: string[];
  video: boolean;
};

type VideoMap = { sections: Record<string, Video>; products: Record<string, Video> };

const root = process.cwd();
const products = productsJson as Product[];
const bySlug = new Map(products.map((p) => [p.slug, p]));
const mapping = mappingJson as unknown as Record<string, string[] | string>;

// Local preview videos (data/videos.local.json) win over the shared file, but
// that file is never uploaded, so the live site only uses data/videos.json.
function loadVideos(): VideoMap {
  const shared = videosJson as unknown as VideoMap;
  const localFile = path.join(root, "data", "videos.local.json");
  if (!existsSync(localFile)) return shared;
  const local = JSON.parse(readFileSync(localFile, "utf8")) as VideoMap;
  return {
    sections: { ...shared.sections, ...local.sections },
    products: { ...shared.products, ...local.products },
  };
}

const videos = loadVideos();

// Cloudinary links get automatic quality/format and a poster frame.
function withCloudinary(video: Video): Video {
  if (!video?.src.includes("res.cloudinary.com") || video.src.includes("/upload/q_auto")) return video;
  const src = video.src.replace("/upload/", "/upload/q_auto,f_auto,w_720/");
  const poster =
    video.poster ?? video.src.replace("/upload/", "/upload/so_1,w_540,q_auto,f_auto/").replace(/\.\w+$/, ".jpg");
  return { src, poster };
}

export function productImage(product: Product) {
  const local = `/products/${product.slug}.webp`;
  return existsSync(path.join(root, "public", local)) ? local : null;
}

export function productsFor(sectionId: string): Product[] {
  const slugs = mapping[sectionId];
  if (!Array.isArray(slugs)) return [];
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
}

export function sectionVideo(sectionId: string): Video {
  return withCloudinary(videos.sections[sectionId] ?? null);
}

export function productVideo(slug: string): Video {
  return withCloudinary(videos.products[slug] ?? null);
}

// "2 ft" -> 0.61 so depths in feet and metres can be compared. Display keeps the original text.
function metres(depth: string) {
  const n = parseFloat(depth);
  if (Number.isNaN(n)) return null;
  return /ft/.test(depth) ? n * 0.3048 : n;
}

export function depthRange(items: Product[]) {
  const depths = items
    .map((p) => p.depth)
    .filter((d): d is string => Boolean(d))
    .map((d) => ({ d, m: metres(d) }))
    .filter((x): x is { d: string; m: number } => x.m !== null)
    .sort((a, b) => a.m - b.m);
  if (!depths.length) return null;
  const low = depths[0].d;
  const high = depths[depths.length - 1].d;
  return low === high ? low : `${low} to ${high}`;
}

export const content = sectionsJson as unknown as {
  showReviewBadges: boolean;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; text: string; href: string; icon: string }[];
    trust: string[];
  };
  groups: Group[];
  sections: Record<string, SectionText>;
};
