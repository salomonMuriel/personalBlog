# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and bilingual blog (English/Spanish) built with Astro 6 + Tailwind 4, serving as both a content site and consultancy landing page. Features blog posts (synced from LinkedIn), conference talks, business ideas, "now" updates, and static pages. Started from the AstroPaper template but has been heavily customized — the codebase diverges significantly from the original.

## Development Commands

```bash
# Development server (with host flag for network access)
npm run dev

# Production build (includes jampack optimization)
npm run build

# Quiet build (suppresses verbose output — useful in Claude context)
npm run build:quiet

# Preview production build
npm run preview

# Code quality
npm run format        # Auto-format with Prettier
npm run format:check  # Check formatting
npm run lint          # ESLint check

# Astro utilities
npm run sync          # Sync Astro content collections

# LinkedIn sync
npm run sync-linkedin           # Pull latest LinkedIn posts and convert to MDX
npm run sync-linkedin:backfill  # Backfill all historical posts

# PDF generation (for proposals/presentations)
npm run generate-pdf
```

## Content Architecture

### Content Collections

Defined in `src/content.config.ts` using a factory pattern for bilingual schemas. Collections live in `src/content/`:

- **blog/en/ + blog/es/** - Blog posts (bilingual MDX), exposed as `blog-en` and `blog-es` collections
- **now/en/ + now/es/** - "Now" page updates (latest shown on homepage), exposed as `now-en` and `now-es`
- **talks/en/ + talks/es/** - Conference/speaking engagements, exposed as `talks-en` and `talks-es`
- **ideas/en/ + ideas/es/** - Business/project ideas, exposed as `ideas-en` and `ideas-es`
- **pages/** - Static page content (About, Uses, Resources) as bilingual MDX using lang-suffixed filenames (e.g. `about-en.mdx`, `about-es.mdx`), single `pages` collection

The factory function `localizedCollection()` creates `en`/`es` collection pairs automatically. Language separation is done by collection, not by a `lang` frontmatter field.

### Content Schema

Blog posts require the following frontmatter:
- `title`: string
- `description`: string
- `pubDatetime`: Date
- `modDatetime`: Date (optional)
- `author`: string (defaults to site author)
- `tags`: string[] (defaults to ["others"])
- `featured`: boolean (optional)
- `draft`: boolean (optional, excludes from production)
- `ogImage`: string (optional, URL or path to image ≥1200x630px recommended)
- `canonicalURL`: string (optional)

### Content Filtering

Posts are filtered by `src/utils/getPosts.ts`:
- Excludes drafts
- Language filtering is implicit — callers pass the appropriate lang-specific collection (e.g. `getLocalizedCollection(lang, "blog")` from `src/i18n/utils.ts`)

## Bilingual (i18n) System

- **Routing**: `src/pages/[lang]/` handles all bilingual routes; `src/pages/es/` provides Spanish-specific overrides where needed
- **Root**: English served at `/` with client-side Spanish detection that soft-redirects to `/es/` for Spanish browsers
- **Translation strings**: `src/i18n/ui.ts` (string map) + `src/i18n/utils.ts` (helpers)
- **Language switcher**: `src/components/LanguageSwitcher.astro`
- **Config**: `LOCALE.langTag` in `src/config.ts` sets supported BCP 47 tags

## LinkedIn Sync

- **Script**: `scripts/sync-linkedin.mjs` — fetches posts via LinkedIn API, translates with an LLM (OpenRouter), writes bilingual MDX pairs to `src/content/blog/`
- **GitHub Action**: `.github/workflows/sync-linkedin.yml` — runs daily, commits new posts automatically
- **Backfill**: Run with `--backfill` flag to process historical posts; `--no-translate` to skip LLM translation; `--download-images-only` to pre-download media

## Site Configuration

Site-wide settings in `src/config.ts`:

```typescript
SITE.website    // Deployed domain
SITE.author     // Default author name
SITE.desc       // Site description
SITE.postPerPage  // Pagination limit (currently 3)

LOCALE.lang     // Default html lang (e.g. "en")
LOCALE.langTag  // Supported BCP 47 language tags (e.g. ["en-EN", "es-419"])
```

Social links configured in `SOCIALS` array (LinkedIn, WhatsApp, GitHub, etc.)

## Key Architecture Patterns

### Page Structure
- **Dynamic routes**: `[lang]` prefix for all bilingual pages (e.g., `/[lang]/posts/[slug]/`)
- **Pagination**: only tags pages use `[page].astro` at `/[lang]/tags/[tag]/[page].astro`
- **Tag filtering**: `/[lang]/tags/[tag]/index.astro` and `/[lang]/tags/[tag]/[page].astro`

### Layouts Hierarchy
- `Layout.astro` - Base layout: SEO, meta tags, Google Analytics, Cal.com integration, schema markup
- Specialized layouts: `PostDetails.astro`, `TalkLayout.astro`, `IdeasLayout.astro`, `NowLayout.astro`, `AboutLayout.astro`, `UsesLayout.astro`, `ResourcesLayout.astro`, `BeforeLayout.astro`
- `Main.astro` - Wrapper for common page structure

### Styling System
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- CSS custom properties for theming (`--color-text-base`, `--color-accent`, etc.)
- Custom fonts via FontSource: DM Sans Variable (body), Syne (headings)
- Typography plugin for markdown content
- Dark/light theme toggle with custom dark-blue + coral palette

### Special Features
- **Schema markup** — ProfilePage + Person structured data (`Layout.astro`)
- **Cal.com integration** — lazy-loaded scheduling widget
- **LinkedIn sync** — automated daily post import with LLM translation
- **Presentations** — Marp-based slides with PDF export via Puppeteer
- **Reading time** — estimated on all post cards and detail pages
- **View transitions** — Astro's ViewTransitions enabled
- **RSS feed** — at `/rss.xml` (and `/es/rss.xml`)
- **Sitemap** — auto-generated
- **OG images** — site-level OG image at `/og.png`; posts fall back to `/posts/${title-slug}.png` (referenced in meta but not dynamically generated per post)
- **Explore dropdown** — nav groups Ideas, Resources, Stack

## Utility Functions

Key utilities in `src/utils/`:
- `getPosts.ts` — default export `getPosts(posts, options?)`: filters drafts, sorts by date, optional tag filter
- `getUniqueTags.ts` — extracts unique tags from a post collection
- `getReadingTime.ts` — estimates reading time
- `slugify.ts` — URL-safe slugs (`slugifyStr`, `slugifyAll`)
- `generateOgImages.tsx` — `generateOgImageForPost()` and `generateOgImageForSite()` via Satori

## Special Pages

- **Homepage** (`/`) — Hero, consultancy CTAs, Cal.com, latest "now" update, featured/recent posts. English at root, Spanish detection redirects to `/es/`
- **/now** — Current life updates (latest from "now" collection)
- **/before** — Previous "now" updates archive
- **/talks** — Speaking engagements
- **/ideas** — Business/project ideas
- **/companies** — Company portfolio
- **/resources** — Curated resources (local MDX content collection)
- **/about** — About page (bilingual MDX from `pages/` collection)
- **/uses** — Stack/tools page (bilingual MDX)
- **/search** — Client-side search using Fuse.js

## Build Optimization

Production builds:
1. `astro build`
2. Jampack post-processing (`@divriots/jampack`) — image optimization, asset compression
3. No PurgeCSS (removed; Tailwind 4 handles unused styles)
