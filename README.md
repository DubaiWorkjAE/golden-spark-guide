# Golden Spark Detectors — Product Guide

A one-page guide that helps customers pick the right detector technology before they ask for a price.
Built with Next.js + Tailwind. Every push to `main` on GitHub publishes the site on Vercel automatically.

## Edit the content (no coding needed)

| What | File |
|---|---|
| Which products show in each section | `data/mapping.json` (product slugs, in order) |
| Titles, callouts, facts, explanations | `data/sections.json` (`showReviewBadges: false` hides the draft labels) |
| Videos (9:16, Cloudinary or direct .mp4 links) | `data/videos.json` |
| Phone numbers, address, WhatsApp number | `lib/site.ts` |

## Refresh product data from gsdetectors.com

```bash
npm run scrape   # updates data/products.json
npm run assets   # downloads new product photos as WebP
```

## Run locally

```bash
npm install
npm run dev
```
