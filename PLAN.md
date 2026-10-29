# Golden Spark Detectors — Product Guide: Plan + Text Wireframe

Status: Gate 1 answered · **Gate 2 (data sample) waiting for your OK**

## Decisions (your answers, Gate 1)

| Topic | Decision |
|---|---|
| Price on cards | No price shown. Button/label: **"Learn more on WhatsApp"** (price stays in the data, hidden) |
| Look & feel | Readable, premium, Apple-like: lots of white space, big tight headlines, light grey/white sections, navy for dark "pro" sections, gold only as accent |
| Fonts | **Inter** for everything (same as your reference site, closest free font to Apple's SF). Logo keeps its own serif. Arabic later: IBM Plex Sans Arabic |
| Colors | Logo colors below: confirmed |
| Scope | Example first: **3 products per section**, no accessories. You pick the final list after the example |
| Discontinued | None confirmed, nothing removed |
| Video hosting | **Cloudinary**: your reference site uses it (`q_auto,f_auto` auto-compresses for each phone). You upload in the Cloudinary website and paste the link into `data/videos.json` |
| Long-range locators, trust facts | Not answered. Default: long-range goes in Specialty with "manufacturer states…" wording. Trust strip uses only facts from your site (Deira shop, WhatsApp help, warranty per product) |

---

## 1. What I found

| Item | Finding |
|---|---|
| Logo | Saved as `public/brand/logo-source.jpg` (1276×1280 JPG). An SVG or transparent PNG would look sharper, if you have one. |
| gsdetectors.com | WordPress + WooCommerce. It has a public product feed with **147 products** and fields for name, brand, category, price (AED), images, "Made In" and "Warranty". I will use this feed instead of copying page HTML. |
| Site fonts | Be Vietnam Pro (body and headings). The site does **not** use navy/gold; those come only from the logo. |
| Phones | EN +971 52 244 8875 (WhatsApp) · AR +971 55 426 8455 · info@gsdetectors.com |
| Address | Golden Spark Detectors, Shop No 2, Essam Lootah Building, Eyal Nassar, Deira, Dubai, UAE. PO Box 171133 |
| Tools on this PC | Node 24 ✓, ffmpeg ✓, **Git missing** (needed for GitHub) |

### Your 3 sample videos
All three are 1080×1920 (true 9:16) and 27–41 sec long, but 34–52 MB each. That is too heavy for 4G, so they will be compressed (see §5).

| File | What it actually shows | Goes to |
|---|---|---|
| Jhaji T5s 261026.mp4 | GER Detect **Titan 500 Smart** (long-range locator) | Long-range locators (see question 4) |
| Luggage yReels271026.mp4 | **X-ray luggage scanner** | Specialty → Security |
| ProspectoryReels 261026.mp4 | Elvatech **ProSpector 3 XRF analyzer** (metal/gold tester). The filename says "Prospectory", but this is **not** a gold-prospecting detector. | Specialty → XRF gold testers |

So none of the 4 technology families has a video yet. All four will show "Video coming soon" for now.

---

## 2. Brand (proposed: please confirm)

Colors were sampled from the logo pixels:

| Token | Hex | Source | Use |
|---|---|---|---|
| `navy` | `#282C55` | shield average | main dark background, headings on light |
| `navy-deep` | `#262948` | shield centre | hero, footer |
| `navy-light` | `#282E65` | shield edge | hover, borders on dark |
| `gold` | `#F1C854` | G/S monogram | buttons and accents on navy |
| `gold-soft` | `#E2B95E` | wordmark | highlights |
| `gold-deep` | `#98702B` | shield border shadow | gold text on white |
| `cream` | `#FAF7F0` | *my pick, not from the logo* | light section background |
| WhatsApp | `#25D366` | WhatsApp brand | WhatsApp buttons only |

Contrast checks: gold on navy is 8.3:1 (passes AAA). Navy on white is 13:1. gold-deep on white is 5.7:1 (passes AA).

**Fonts (my recommendation):**
- Headings: **Playfair Display** 700. It is a bold serif like your logo wordmark.
- Body, cards and buttons: **Be Vietnam Pro**. It is already on your site and easy to read on small phones.
- Arabic (phase 2): pick later, for example Noto Kufi Arabic or Cairo.

---

## 3. Text wireframe (mobile first)

```
┌──────────────────────────────────────────┐
│ STICKY NAV                               │
│ [logo]                 [WhatsApp] [☰]    │  mobile
│ [logo] Detectors · Gold · Scanners ·     │  desktop
│        Security & Testing · Contact  [WA]│
└──────────────────────────────────────────┘

1) HERO  (navy-deep background)
   H1: Which detector is right for you?
   Sub: Pick what you want to find. We show you the right technology.
   ┌─────────────┬─────────────┐   2×2 on mobile, 4 across on desktop
   │ BEGINNER    │ GOLD NUGGETS│   each card: icon + 1 line + "→"
   │ Coins,      │ Small gold  │   tap = smooth scroll to section
   │ jewelry     │ in hard     │
   │             │ ground      │
   ├─────────────┼─────────────┤
   │ MINING &    │ SECURITY &  │
   │ DEEP TARGETS│ TESTING     │
   │ Veins, big  │ Gates, X-ray│
   │ deposits    │ gold testers│
   └─────────────┴─────────────┘
   Trust strip: [shop in Deira] [warranty] [WhatsApp help] [ ? ]
                → you tell me which facts are true (question 6)

2) HOW DETECTION WORKS  (#how) — 4 blocks, same pattern each:

   a) Basic metal detectors        (coins, jewelry, relics)
   b) Gold nugget detectors        (small nuggets, mineralized soil)
   c) Ground scanners (3D)         (imaging, voids)
   d) Mineral scanning / GPR       (veins, large deposits)

   ── one block ──────────────────────────────────────
   MOBILE                         DESKTOP
   Title                          ┌───────────────┬────────┐
   Callout box (gold left bar):   │ Title         │ ┌────┐ │
   "If you are a SERIOUS GOLD     │ Callout       │ │9:16│ │
    PROSPECTOR looking for small  │ • Finds       │ │vid │ │
    nuggets in mineralized        │ • Depth*      │ │    │ │
    ground..."                    │ • Best for    │ └────┘ │
   [ 9:16 video, full width ]     │ Explanation   │ ≤320px │
   • What it finds: …             └───────────────┴────────┘
   • Typical depth: … (manufacturer claim)
   • Best for: …
   Explanation (2–3 lines)  ← marked NEEDS YOUR REVIEW
   Product row → swipe on mobile, 3–4 visible on desktop
   [ Not sure? Ask us on WhatsApp ]
   ─────────────────────────────────────────────────

3) BY CUSTOMER LEVEL  (#level)
   3 cards: Beginner / Serious nugget prospector / Mining operation
   Each card: callout ("If you are a BEGINNER and want to start…")
            + up to 3 top picks + "See all →" (links to its block in §2)
   (Short on purpose, so the same products don't show twice. See question 5.)

4) SPECIALTY  (#specialty) — smaller blocks, same pattern
   • Security: handhelds, walk-through gates, X-ray luggage scanner,
     under-vehicle mirror                          [video: Luggage]
   • XRF gold testers / gold purity testers        [video: ProSpector 3]
   • Water detectors          (neutral wording: "manufacturer states…")
   • Gem & diamond testers
   • Mining equipment
   • Long-range locators?     (neutral wording)    [video: Titan 500 Smart]

5) PRODUCT CARD (the same everywhere)
   ┌───────────────────────┐
   │ [image, square, WebP] │
   │ NOKTA                 │ brand
   │ Gold Finder 2000      │ name
   │ Made in Turkey ·      │
   │ Warranty 2 years      │
   │ Max depth: 2 ft       │ ← hidden if not on product page
   │ (manufacturer claim)  │
   │ Price: Ask on WhatsApp│ ← see question 1
   │ [▶ Watch video]       │ ← opens inline 9:16 player;
   │                       │   "Video coming soon" if none
   │ [WhatsApp: Ask now]   │ ← wa.me/971522448875 + product name
   └───────────────────────┘
   Prefilled message: "Hello Golden Spark, I'm interested in the
   {Product name}. Please send price and details."

6) FOOTER (navy-deep)
   Logo · address · EN phone · AR phone · email · WhatsApp · map link
   Small print: "Depth and detection figures are manufacturer claims.
   Results depend on ground, target and conditions."

   FLOATING WhatsApp button: bottom-right (moves to bottom-left in RTL)
```

---

## 4. Data

- `scripts/scrape.mjs` reads the WooCommerce product feed and writes `data/products.json`:
  `slug, name, brand, category, price, depth, madeIn, warranty, image, url`
- **Depth:** taken only when the product page states it. Otherwise it is `null` and the card hides it. I never guess specs.
- **Price:** saved in the JSON. Whether it shows on the page depends on question 1.
- **Images:** downloaded once, converted to WebP (2 sizes) and stored in `public/products/`. This is fast and doesn't depend on your WordPress server.
- `data/mapping.json`: section → list of product slugs. I'll draft it from the site categories, and you can edit it.
- `data/sections.json`: titles, callouts, 3-line facts and explanations. Every text drafted from product pages is marked `"review": "NEEDS MY REVIEW"`.
- Excluded: discontinued products (question 3). Accessories are excluded in v1 unless you want them.

## 5. Videos

- `scripts/video.mjs` (ffmpeg) does this for each video:
  - compress to 720×1280 H.264 with fast start (estimated 5–10 MB, to confirm on your files)
  - make a 9:16 WebP poster
- Upload to **Vercel Blob**, then save the URL in `data/videos.json` (`slug or technology → {src, poster}`).
- No .mp4 files in the repo.
- Player behaviour:
  - poster only until tapped, then plays inline (`playsinline`), muted by default with a sound button
  - pauses when scrolled away (IntersectionObserver)
  - never autoplays with sound
  - shows a "Video coming soon" placeholder when there is no video

## 6. Tech and deploy

- Next.js (App Router) + Tailwind, statically generated, with `next/font` and `next/image`.
- No database, no shop and no cart.
- **GitHub:** you create the account (I can't create accounts). **Vercel:** sign up with "Continue with GitHub".
- **Git:** not installed on this PC. With your OK I'll install it at Gate 3 (`winget install Git.Git`).
- **Note:** Vercel's free Hobby plan is for **non-commercial use only**. It's fine for previews, but a business site should move to the paid Pro plan before public launch.

## 7. Build order (recommended)

1. Gate 2: scrape all products and show you 10 sample rows plus the draft mapping.
2. Gate 3: skeleton with the hero, the **Gold nugget block** (5 real products, placeholder video) and the **Security block** (your Luggage video, compressed), then a Vercel preview.
   - Gold = what most customers ask about. Security = proves the real video pipeline end to end.
3. Gate 4: all sections and products, remaining videos, polish.
