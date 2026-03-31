# BestForMy

A programmatic SEO site for SaaS tool comparisons and recommendations. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Generates a fully static site in `/out` with sitemap and robots.txt.

## Page Templates

- **Category pages**: `/best/[category]/for/[industry]` — Top picks for a category + industry combo (50 pages: 5 categories x 10 industries)
- **Comparison pages**: `/compare/[slug]` — Side-by-side tool comparisons (8 comparisons)
- **Tool profile pages**: `/tool/[slug]` — Full review with pricing, features, pros/cons (17 tools)

## Data

Seed data lives in `/data`:
- `tools.json` — 17 SaaS tools across 5 categories
- `categories.json` — CRM, Project Management, Invoicing, Email Marketing, Accounting
- `industries.json` — 10 service industries
- `comparisons.json` — 8 tool-vs-tool comparisons

## SEO

- Dynamic meta titles and descriptions per page
- JSON-LD structured data (SoftwareApplication, FAQPage, ItemList, WebSite)
- Open Graph tags
- Auto-generated sitemap via next-sitemap
- robots.txt
- Canonical URLs
- Internal linking between tools, categories, and comparisons

## Tech Stack

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- next-sitemap
