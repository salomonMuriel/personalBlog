# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog built with Astro, showcasing blog posts, talks, ideas, and professional information. The site features multiple content types (blog posts, talks, ideas, "now" updates) with a custom content structure and special pages for consultancy services.

## Development Commands

```bash
# Development server (with host flag for network access)
npm run dev

# Production build (includes jampack optimization)
npm run build

# Preview production build
npm run preview

# Code quality
npm run format        # Auto-format with Prettier
npm run format:check  # Check formatting
npm run lint         # ESLint check

# Astro utilities
npm run sync         # Sync Astro content collections
```

## Content Architecture

### Content Collections

The site uses Astro's content collections system with multiple content types defined in `src/content/`:

- **blog/** - Blog posts with frontmatter (title, description, pubDatetime, tags, featured, draft)
- **now/** - "Now" page updates with dates (latest shown on homepage)
- **talks/** - Conference/speaking engagements
- **ideas/** - Business/project ideas

### Content Schema

Blog posts require the following frontmatter (defined in `src/content/config.ts`):
- `title`: string
- `description`: string
- `pubDatetime`: Date
- `modDatetime`: Date (optional)
- `author`: string (defaults to site author)
- `tags`: string[] (defaults to ["others"])
- `featured`: boolean (optional, shows in featured section)
- `draft`: boolean (optional, excludes from production)
- `ogImage`: image or string (optional, must be ≥1200x630px)
- `canonicalURL`: string (optional)

### Content Filtering

Posts are filtered by `src/utils/postFilter.ts`:
- Excludes drafts in production (`import.meta.env.PROD`)
- Excludes scheduled posts (based on `SITE.scheduledPostMargin` - 15 minutes)

## Site Configuration

Site-wide settings in `src/config.ts`:

```typescript
SITE.website          // Deployed domain
SITE.author           // Default author name
SITE.desc            // Site description
SITE.postPerPage     // Pagination limit (currently 3)
SITE.scheduledPostMargin  // Future post margin (15 min)
```

Social links configured in `SOCIALS` array (LinkedIn, WhatsApp, GitHub, etc.)

## Key Architecture Patterns

### Page Structure
- **Dynamic routes**: Use `[slug]` pattern (e.g., `/posts/[slug]/`, `/talks/[slug]/`)
- **Pagination**: Handled via `[page].astro` routes with `getPagination` utility
- **Tag filtering**: `/tags/[tag]/[page].astro` for browsing by tag

### Layouts Hierarchy
- `Layout.astro` - Base layout with SEO, meta tags, Google Analytics, Cal.com integration
- Specialized layouts: `PostDetails.astro`, `TalkLayout.astro`, `IdeasLayout.astro`, `NowLayout.astro`
- `Main.astro` - Wrapper layout for common page structure

### Styling System
- TailwindCSS with custom theme extensions
- CSS custom properties for theming (`--color-text-base`, `--color-accent`, etc.)
- Custom fonts: Baloo 2 Variable (body), Play (headings) via FontSource
- Typography plugin enabled for markdown content

### Special Features
- **Schema markup** for SEO (ProfilePage, Person schema in `Layout.astro`)
- **Cal.com integration** for scheduling calls (embedded in layout)
- **Custom animations** for twin babies images on homepage (slide-in/out)
- **View transitions** enabled via Astro's ViewTransitions
- **RSS feed** generation at `/rss.xml`
- **Sitemap** generation enabled
- **OG image** generation for posts at `/posts/[slug]/index.png`

## Markdown Processing

Configured in `astro.config.ts`:
- **remark-toc** - Table of contents generation
- **remark-collapse** - Collapsible TOC sections (triggered by "Table of contents" heading)
- **Syntax highlighting** - One Dark Pro theme with word wrap
- **MDX support** - Enabled for component usage in markdown

## Utility Functions

Key utilities in `src/utils/`:
- `getSortedPosts()` - Filters and sorts posts by modified/published date
- `getPostsByTag()` - Filters posts by tag
- `getUniqueTags()` - Extracts all unique tags from posts
- `slugify()` - Converts strings to URL-safe slugs
- `getPagination()` - Handles pagination logic

## Special Pages

- **Homepage** (`/`) - Hero section, consultancy CTAs, latest "now" update, featured/recent posts
- **/now** - Current life updates (latest from "now" collection)
- **/before** - Previous "now" updates archive
- **/talks** - Speaking engagements
- **/ideas** - Business/project ideas
- **/companies** - Company information/portfolio
- **/resources** - Curated resources
- **/search** - Client-side search using Fuse.js

## Build Optimization

Production builds include:
1. Astro build
2. Jampack optimization (automated post-processing)
3. PurgeCSS for unused CSS removal
