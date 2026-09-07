# salomonmuriel.com — Rebuild Plan
### Next.js 16 (App Router) + React 19 + Payload CMS + shadcn/ui + Tailwind CSS 4

**Prepared:** 2026-09-06
**Replaces:** Astro 6.1.3 static site at `/Users/salomonmuriel/git/personalBlog`
**Deploy target:** Vercel + Neon Postgres

---

## 0. Compatibility verification (done first, before anything was planned around it)

I checked the npm registry and the Payload docs today rather than assuming. Results:

### 0.1 The stack is supported. Here is the proof.

| Package | Latest published | Verdict |
|---|---|---|
| `payload` | **3.88.0** (published 2026-09-02) | Use this. Stable. |
| `@payloadcms/next` | 3.88.0 | Peer: `next: ">=15.2.9 <15.3.0 \|\| >=15.3.9 <15.4.0 \|\| >=15.4.11 <15.5.0 \|\| >=16.2.6 <17.0.0"` |
| `@payloadcms/ui` | 3.88.0 | Peer: `react: "^19.0.1 \|\| ^19.1.2 \|\| ^19.2.1"`, same for `react-dom`, same `next` range |
| `next` | **16.3.4** | ✅ inside Payload's `>=16.2.6 <17.0.0` window |
| `react` / `react-dom` | **19.2.8** | ✅ satisfies Payload's React peer range |
| `tailwindcss` | **4.3.3** | ✅ |
| `shadcn` (CLI) | **4.21.0** | Only engine constraint is `node >=20.18.1`. No React/Tailwind peer pins. |

**Bottom line: Next 16 + React 19 + Payload 3.88 + Tailwind 4 + shadcn CLI v4 is a genuinely supported combination as of today.** This was *not* true six months ago — Payload's Next 16 support landed via PR #14456 after a Turbopack HMR blocker was fixed, and the supported floor is `16.2.6`. You are on the right side of that line by one minor version.

Sources checked: [Payload installation docs](https://payloadcms.com/docs/getting-started/installation), [Payload releases](https://github.com/payloadcms/payload/releases), [shadcn CLI v4 changelog (March 2026)](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4), [shadcn Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4), [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16), plus direct `npm view` on every package above.

### 0.2 The five caveats that are real

**(a) Payload's Next range is a *narrow allowlist*, not a caret.** Read it again:
```
">=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.2.6 <17.0.0"
```
Payload deliberately blacklists most Next patch releases. On the 16.x line the range is currently open-ended (`>=16.2.6`), which means Payload is *trusting* future 16.x patches. If Vercel ships a 16.4 that breaks Payload, you will find out in production. **Mitigation: pin `next` to an exact version (`"next": "16.3.4"`, no caret) and use a lockfile. Upgrade Next deliberately, never incidentally.**

**(b) Payload 4.0 exists but only as `canary` (`4.0.0-canary.31`) and `internal` tags.** Do not use it. There is no `4.x` on `latest`. Anyone telling you to "just use Payload 4 for Next 16" is wrong — 3.88 is the Next-16-capable line.

**(c) React version pinning.** `@payloadcms/ui`'s peer range technically collapses to `>=19.0.1 <20.0.0`, but the three-way disjunction is Payload signalling *tested* versions. React 19.2.8 is in the tested band. **Pin React exactly (`"react": "19.2.8"`), and do not adopt React 19.3 until Payload's peer range names it.**

**(d) Turbopack is the default build bundler in Next 16.** Payload's Next 16 support was gated on a Turbopack HMR fix, so dev is fine — but `next build --turbopack` with Payload's import-map generation is the newest, least-exercised path in this stack. **Mitigation: keep `next build --webpack` wired up as `npm run build:webpack` and switch to it the moment a Vercel build fails inexplicably.** Cost of the fallback: ~20-40% slower builds. Irrelevant at this site's size.

**(e) A real transitive-dependency collision with your existing repo.** `@payloadcms/db-postgres@3.88.0` bundles **exact-pinned** `drizzle-orm@0.45.2` and `drizzle-kit@0.31.7` as *dependencies* (not peers). Your repo currently has `drizzle-orm@^0.45.2` and `drizzle-kit@^0.31.10` at the top level for the cumple-35 feature. These will resolve to two nested copies. That works, but it means:
- Two Drizzle runtimes in the dependency graph (bundle bloat, confusing stack traces).
- `npx drizzle-kit` at the repo root may pick up the wrong version.
- **This is one more reason to get cumple-35 out of this codebase (see §1.6).**

### 0.3 What I would pin

```jsonc
// package.json — exact pins where the compatibility matrix is narrow
{
  "engines": { "node": ">=22.19.0" },      // Next 16 floor is 20.9; Payload's is 20.9. Use Node 22 LTS.
  "dependencies": {
    "next": "16.3.4",                       // EXACT — Payload allowlists Next patches
    "react": "19.2.8",                      // EXACT
    "react-dom": "19.2.8",                  // EXACT
    "payload": "3.88.0",                    // EXACT — all @payloadcms/* peer on "3.88.0" exactly
    "@payloadcms/next": "3.88.0",
    "@payloadcms/ui": "3.88.0",
    "@payloadcms/db-vercel-postgres": "3.88.0",
    "@payloadcms/richtext-lexical": "3.88.0",
    "@payloadcms/storage-vercel-blob": "3.88.0",
    "@payloadcms/plugin-seo": "3.88.0",
    "@payloadcms/plugin-redirects": "3.88.0",
    "graphql": "^16.11.0",                  // required peer of @payloadcms/next
    "sharp": "^0.34.5",                     // Payload image resizing + next/image
    "tailwindcss": "^4.3.3",
    "@tailwindcss/postcss": "^4.3.3",
    "tw-animate-css": "^1.4.0",             // replaces deprecated tailwindcss-animate
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "lucide-react": "^0.5xx.x",
    "@calcom/embed-react": "^1.5.x"
  },
  "devDependencies": {
    "shadcn": "^4.21.0",
    "typescript": "^5.9.x",
    "tsx": "^4.20.x",                        // for the migration script
    "gray-matter": "^4.0.3"
  }
}
```

Every `@payloadcms/*` package peer-depends on `payload` at the **exact** version string. Bump them as a set or not at all.

---

## 1. Target architecture

### 1.1 Folder layout — three root layouts, zero routing middleware

Next allows multiple root layouts as long as there is **no `app/layout.tsx`**. That is the single most important architectural decision here, because it is simultaneously (a) the CSS isolation mechanism between the marketing site and the Payload admin, and (b) the simplest possible way to get correct `<html lang>` for a two-locale site without a `[locale]` catch-all or a rewrite layer.

```
src/
├── app/
│   │                                    # ← NO app/layout.tsx. Deliberate.
│   ├── (es)/                            # Spanish = primary, NO url prefix
│   │   ├── layout.tsx                   # <html lang="es"> + imports globals.css
│   │   ├── page.tsx                     # /
│   │   ├── consultoria/page.tsx         # /consultoria
│   │   ├── mentoria/page.tsx            # /mentoria
│   │   ├── charlas/
│   │   │   ├── page.tsx                 # /charlas
│   │   │   └── [slug]/page.tsx          # /charlas/:slug
│   │   ├── sobre-mi/page.tsx            # /sobre-mi
│   │   ├── ahora/
│   │   │   ├── page.tsx                 # /ahora
│   │   │   └── archivo/page.tsx         # /ahora/archivo
│   │   ├── empresas/page.tsx            # /empresas
│   │   └── not-found.tsx
│   │
│   ├── (en)/                            # English = secondary, /en prefix
│   │   ├── layout.tsx                   # <html lang="en"> + imports globals.css
│   │   └── en/
│   │       ├── page.tsx                 # /en
│   │       ├── consulting/page.tsx
│   │       ├── mentorship/page.tsx
│   │       ├── talks/{page.tsx,[slug]/page.tsx}
│   │       ├── about/page.tsx
│   │       ├── now/{page.tsx,archive/page.tsx}
│   │       └── companies/page.tsx
│   │
│   ├── (payload)/                       # generated by create-payload-app; DO NOT hand-edit
│   │   ├── layout.tsx                   # Payload's own <html>. Imports @payloadcms/next/css ONLY.
│   │   ├── custom.scss                  # the ONLY place admin styling may live
│   │   ├── admin/[[...segments]]/{page.tsx,not-found.tsx}
│   │   └── api/
│   │       ├── [...slug]/route.ts
│   │       ├── graphql/route.ts
│   │       └── graphql-playground/route.ts
│   │
│   ├── (public-files)/                  # non-HTML public endpoints, no layout
│   │   ├── sitemap.ts                   # → /sitemap.xml
│   │   ├── robots.ts                    # → /robots.txt
│   │   ├── llms.txt/route.ts
│   │   └── sitemap-removed.xml/route.ts # TEMPORARY — see §4.4
│   │
│   └── api/
│       ├── revalidate/route.ts          # Payload afterChange → revalidatePath
│       ├── webhooks/cal/route.ts        # Cal.com BOOKING_CREATED → Leads collection
│       └── preview/route.ts             # Payload draft preview
│
├── collections/                          # Payload collections
│   ├── Talks.ts
│   ├── NowUpdates.ts
│   ├── Companies.ts
│   ├── Pages.ts
│   ├── Media.ts
│   ├── Leads.ts
│   └── Users.ts
├── globals/
│   ├── SiteSettings.ts
│   └── OfferPages.ts
├── components/
│   ├── ui/                               # shadcn — CLI-owned, do not hand-edit
│   ├── site/                             # SiteShell, Header, Footer, LocaleSwitcher, CalButton
│   ├── sections/                         # Hero, OfferGrid, Testimonials, TalkCard, ...
│   └── richtext/RenderLexical.tsx
├── lib/
│   ├── payload.ts                        # cached getPayload() singleton
│   ├── routes.ts                         # THE locale↔path map (single source of truth)
│   ├── seo.ts                            # metadata + JSON-LD builders
│   └── analytics.ts
├── styles/
│   └── globals.css                       # Tailwind 4 + shadcn tokens. Imported ONLY by (es)/(en) layouts.
├── payload.config.ts
└── payload-types.ts                      # generated — commit it
```

**Route group `(es)` produces `/`, `(en)/en/...` produces `/en/...`.** Route groups do not appear in URLs; the literal `en/` folder does. Result: no middleware, no rewrites, no `[locale]` param, everything statically generated, and `<html lang>` is correct by construction.

Cost: two ~25-line layout files. They both do nothing but `<SiteShell locale="es|en">{children}</SiteShell>`. At 7 sections × 2 locales, a routing abstraction would cost more than it saves.

Trade-off to accept knowingly: navigating between `/` and `/en` is a full document load, not a client transition. That is correct behaviour for a language switch anyway.

### 1.2 Where the admin lives

`/admin`, served from the `(payload)` route group, on the same Vercel deployment and the same domain. Not a subdomain, not a separate project.

Reasons:
- Payload 3's whole design premise is living inside your Next app. Splitting it means running two deployments against one database and losing the Local API (which is what makes build-time content fetching zero-latency).
- One domain = one cookie scope = draft preview works without CORS gymnastics.
- Add `X-Robots-Tag: noindex, nofollow` on `/admin/*` via `next.config.ts` headers, and exclude it from the sitemap.

### 1.3 Database — Neon, one instance, two schemas

You already have a Neon Postgres for cumple-35 using `pgSchema("cumple-35")`. Payload's Postgres adapters accept a `schemaName`. So:

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

db: vercelPostgresAdapter({
  pool: { connectionString: process.env.DATABASE_URI },
  schemaName: 'payload',        // ← isolates Payload's ~20 tables from `cumple-35`
  push: process.env.NODE_ENV === 'development',   // dev only; prod uses migrations
}),
```

One Neon project, one database, schemas `payload` and `cumple-35` side by side, zero collision. Payload runs `drizzle-kit`-generated migrations against its own schema only.

**Adapter choice: `@payloadcms/db-vercel-postgres`, not `@payloadcms/db-postgres`.** Reason: `db-postgres` uses `pg` with a TCP connection pool. On Vercel serverless, every cold function opens connections and Neon's connection ceiling gets hit under any concurrency. `db-vercel-postgres` uses the Vercel/Neon serverless driver (HTTP/WebSocket), which is connection-poolerless by design. If you hit a feature gap, the fallback is `db-postgres` pointed at the Neon **`-pooler`** host with `pool: { max: 1 }` — same schema, same migrations, one-line swap.

**Critical operational detail:** use the *pooled* connection string for `DATABASE_URI` at runtime and the *direct/unpooled* string for running migrations (`DATABASE_URI_UNPOOLED`). Neon's pooler does not support the session-level operations DDL needs.

### 1.4 Media storage — Vercel Blob

**Pick `@payloadcms/storage-vercel-blob`. Not S3.**

```ts
vercelBlobStorage({
  enabled: true,
  collections: { media: true },
  token: process.env.BLOB_READ_WRITE_TOKEN,
  clientUploads: true,   // ← mandatory: Vercel caps server request bodies at 4.5MB
}),
```

Why Blob over S3, specifically for this site:
1. **Zero configuration surface.** Linking a Blob store in the Vercel dashboard injects `BLOB_READ_WRITE_TOKEN` automatically. S3 means an IAM user, a bucket policy, a CORS policy, and a CloudFront distribution to get sane cache headers — four things that can be misconfigured, on a site where one person uploads a photo every few weeks.
2. **Scale is ~300MB.** Your `src/assets` is 258 files. Blob's pricing at this volume is trivial. S3's cost advantage only materialises at terabytes/high egress.
3. **`clientUploads: true` solves Vercel's 4.5MB body limit** for both adapters, so that is not a differentiator.

What you give up: portability. Blob URLs are `*.public.blob.vercel-storage.com` and are Vercel-specific. **Mitigation:** never hardcode a Blob URL in content — always render from the Media doc's `url` field, so migrating to S3 later is `payload migrate` + an `rsync` + a `UPDATE media SET url = ...`. Budget half a day if it ever happens.

`clientUploads: true` has one consequence worth knowing: the browser uploads directly to Blob, so a Content Security Policy must allow `connect-src https://*.vercel-storage.com`.

### 1.5 Environment variables

| Var | Scope | Notes |
|---|---|---|
| `DATABASE_URI` | server | Neon **pooled** connection string |
| `DATABASE_URI_UNPOOLED` | local/CI | direct string, migrations only |
| `PAYLOAD_SECRET` | server | 32+ random bytes. Rotating it invalidates all sessions. |
| `NEXT_PUBLIC_SERVER_URL` | both | `https://www.salomonmuriel.com` — used for canonicals, Payload `serverURL`, OG absolute URLs |
| `BLOB_READ_WRITE_TOKEN` | server | auto-injected by Vercel Blob integration |
| `REVALIDATE_SECRET` | server | shared secret for `/api/revalidate` |
| `PREVIEW_SECRET` | server | draft preview token |
| `CAL_WEBHOOK_SECRET` | server | verifies Cal.com `BOOKING_CREATED` signature |
| `NEXT_PUBLIC_GA_ID` | client | `G-061B5QE8B1` (existing — do not create a new property) |
| `GA_MEASUREMENT_PROTOCOL_SECRET` | server | server-side conversion backup |
| `NEXT_PUBLIC_CAL_USERNAME` | client | Cal.com handle |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | client | port from existing `PUBLIC_GOOGLE_SITE_VERIFICATION` |

Note the Astro→Next env prefix change: `PUBLIC_*` → `NEXT_PUBLIC_*`. Grep for it during migration.

### 1.6 cumple-35 — **drop it from this codebase**

Current footprint: 5 API routes under `src/pages/api/cumple-35/`, one page at `src/pages/experimentos/cumple-35/`, a Drizzle schema, 3 migrations, and a Vercel-wide `maxDuration: 300` (set globally in `astro.config.ts` because `@astrojs/vercel` bundles all SSR into one function — a hack that exists *only* for this feature).

It is a one-off RSVP microsite for a birthday that has already happened (the `now` entry dated 2026-01-29; today is 2026-09). It uses OpenAI `gpt-image-1.5` with 90-second generations.

**Recommendation: do not port it.**
- It forces a 300s serverless function config, an OpenAI key, and a second Drizzle version into a marketing site that should be 100% static.
- It has zero relationship to the three commercial offers.

**What to actually do (2 hours):**
1. `pg_dump` the `cumple-35` schema and the RSVP rows to a `.sql` file, commit it to a private archive repo or drop it in Drive. Export selfies from wherever they live.
2. Delete the routes, the schema, `drizzle.config.ts`, `drizzle/`, and the top-level `drizzle-orm`/`drizzle-kit` deps.
3. **Leave the `cumple-35` Postgres schema in Neon.** Deleting it buys nothing and losing the data is irreversible.
4. `301 /experimentos/cumple-35 → /` (it has near-zero backlinks; a redirect is kinder than a 410 for a URL people may still have in WhatsApp).

If he genuinely wants it live: keep the current Astro repo on a `archive/cumple-35` branch, deploy it as a **separate Vercel project** at `cumple.salomonmuriel.com`, and forget about it. That is 1 hour and it never touches the new site again.

---

## 2. Payload schemas

### 2.1 Localization strategy — built-in localized fields. Not separate docs.

**Decision: Payload's `localization` config with `localized: true` on translatable fields, one document per piece of content carrying both languages.**

Justification, in order of weight:
1. **hreflang correctness falls out for free.** One doc = one `id` = a guaranteed 1:1 `es`↔`en` pair. With separate locale documents you need a relationship field linking them, which someone will forget to set, which silently breaks hreflang. Given that a locale flip is the SEO-riskiest part of this project, "hreflang cannot get out of sync" is worth a lot.
2. **One editing surface.** He publishes a Now update once, tabs to English, translates, publishes. Two docs means two publish actions and drift.
3. **Publish state stays coupled.** Half-translated content can fall back rather than 404.
4. **Relationships are locale-agnostic.** A Talk → Company relation is one link, not two.

The cost, stated honestly:
- **`localized: true` is effectively irreversible on populated data.** Payload's docs: *"When converting an existing field to or from `localized: true` the data structure in the document will change for this field and so existing data for this field will be lost."* → **The schema must be finalised before the migration script runs. Non-negotiable. See Risk #2.**
- Payload adds a `_locales` table per localized collection. Slightly more complex SQL. Irrelevant at 30 documents.

Config:

```ts
// payload.config.ts
localization: {
  locales: [
    { code: 'es', label: 'Español (Colombia)' },
    { code: 'en', label: 'English' },
  ],
  defaultLocale: 'es',        // ← the flip, expressed in one line
  fallback: true,             // en falls back to es rather than rendering empty
},

// Admin UI chrome language (separate concern from content localization)
i18n: {
  supportedLanguages: { es, en },
  fallbackLanguage: 'es',
},
```

**`slug` is localized too.** That is what makes `/charlas/mentalidad-maker` and `/en/talks/makers-mindset` both work off one document.

### 2.2 `payload.config.ts`

```ts
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { es } from '@payloadcms/translations/languages/es'
import { en } from '@payloadcms/translations/languages/en'

import { Talks } from './collections/Talks'
import { NowUpdates } from './collections/NowUpdates'
import { Companies } from './collections/Companies'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Leads } from './collections/Leads'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { OfferPages } from './globals/OfferPages'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET!,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: '— salomonmuriel.com',
      icons: [{ rel: 'icon', url: '/favicon-32x32.png' }],
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 390,  height: 844 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),
  collections: [Talks, NowUpdates, Companies, Pages, Media, Leads, Users],
  globals: [SiteSettings, OfferPages],
  localization: {
    locales: [
      { code: 'es', label: 'Español (Colombia)' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  i18n: { supportedLanguages: { es, en }, fallbackLanguage: 'es' },
  db: vercelPostgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    schemaName: 'payload',
    push: process.env.NODE_ENV === 'development',
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
    seoPlugin({
      collections: ['talks', 'pages', 'now-updates'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} — Salomón Muriel`,
      generateDescription: ({ doc }) => doc.excerpt ?? '',
    }),
    redirectsPlugin({ collections: ['talks', 'pages'] }),
  ],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  sharp: (await import('sharp')).default,
})
```

### 2.3 Shared access + revalidation hook

```ts
// src/lib/access.ts
import type { Access } from 'payload'
export const anyone: Access = () => true
export const publishedOnly: Access = ({ req }) =>
  Boolean(req.user) || { _status: { equals: 'published' } }
export const authenticated: Access = ({ req }) => Boolean(req.user)
```

```ts
// src/lib/revalidate.ts
import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

// Both locale trees must be busted; they are separate static routes.
export const revalidateFor =
  (paths: (doc: any) => string[]): CollectionAfterChangeHook =>
  async ({ doc, req }) => {
    if (doc._status !== 'published') return doc
    for (const p of paths(doc)) revalidatePath(p)
    req.payload.logger.info(`revalidated: ${paths(doc).join(', ')}`)
    return doc
  }
```

### 2.4 `Media`

```ts
// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'filename', group: 'Sistema' },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    // Payload stores width/height on the doc → next/image gets them → CLS = 0.
    imageSizes: [
      { name: 'thumbnail', width: 400,  height: undefined, position: 'centre' },
      { name: 'card',      width: 800,  height: undefined },
      { name: 'hero',      width: 1600, height: undefined },
      { name: 'og',        width: 1200, height: 630, fit: 'cover' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    // alt is localized: a Spanish page needs Spanish alt text.
    { name: 'alt', type: 'text', required: true, localized: true,
      admin: { description: 'Texto alternativo. Obligatorio por accesibilidad y SEO.' } },
    { name: 'credit', type: 'text' },
  ],
}
```

### 2.5 `Talks` — 7 talks × 2 locales

> **Count correction:** the brief says 16 talks. The repo has **7 talk slugs** (`src/content/talks/{en,es}/` = 14 markdown files). Similarly the brief says 253 blog posts; the repo has **243 English + 242 Spanish = 485 markdown files**. Confirm before the migration script is written — the SEO plan in §4 is sized off the real numbers.

```ts
// src/collections/Talks.ts
import type { CollectionConfig } from 'payload'
import { anyone, authenticated, publishedOnly } from '../lib/access'
import { revalidateFor } from '../lib/revalidate'
import { esPath, enPath } from '../lib/routes'

export const Talks: CollectionConfig = {
  slug: 'talks',
  labels: { singular: 'Charla', plural: 'Charlas' },
  access: { read: publishedOnly, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 20 },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventName', 'date', '_status'],
    group: 'Contenido',
    livePreview: { url: ({ data, locale }) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?path=${
        locale.code === 'es' ? `/charlas/${data.slug}` : `/en/talks/${data.slug}`
      }&secret=${process.env.PREVIEW_SECRET}` },
  },
  hooks: {
    afterChange: [revalidateFor((doc) => ['/charlas', '/en/talks', esPath('talks', doc.slug), enPath('talks', doc.slug), '/', '/en'])],
    afterDelete: [/* same, as afterDelete hook */],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, index: true, localized: true,
      admin: { position: 'sidebar', description: 'URL. es → /charlas/<slug>, en → /en/talks/<slug>' } },
    { name: 'excerpt', type: 'textarea', required: true, localized: true, maxLength: 200 },
    { name: 'date', type: 'date', required: true, admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },

    // ── Event context: powers schema.org Event, and matters for credibility ──
    { type: 'group', name: 'event', label: 'Evento', fields: [
      { name: 'name', type: 'text', localized: true, admin: { description: 'p.ej. ConfNodo 2025, Universidad EAFIT' } },
      { name: 'organizerUrl', type: 'text' },
      { name: 'city', type: 'text', defaultValue: 'Bogotá' },
      { name: 'country', type: 'text', defaultValue: 'CO' },
      { name: 'audienceSize', type: 'number' },
    ]},

    // ── Presentation artefact. Replaces marp/pdf/embed_html/embed_pdf/youtube flags. ──
    { type: 'group', name: 'presentation', label: 'Presentación', fields: [
      { name: 'kind', type: 'select', defaultValue: 'none', options: [
        { label: 'Ninguna', value: 'none' },
        { label: 'PDF embebido', value: 'pdf' },
        { label: 'HTML interactivo (Marp)', value: 'html' },
        { label: 'YouTube', value: 'youtube' },
      ]},
      // Multi-file Marp HTML bundles use relative asset paths and would break in
      // Blob. They stay as static files under public/talks/<slug>/.
      { name: 'staticDir', type: 'text',
        admin: { condition: (_, s) => ['pdf','html'].includes(s?.kind),
                 description: 'Carpeta en /public/talks/. p.ej. "confnodo"' } },
      { name: 'youtubeId', type: 'text', admin: { condition: (_, s) => s?.kind === 'youtube' } },
    ]},

    { name: 'topics', type: 'select', hasMany: true, options: [
      'adopcion-tecnologica','emprendimiento','mentalidad','balance-vida-trabajo','ia','datos',
    ].map(v => ({ label: v, value: v })) },

    { name: 'body', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
  ],
}
```

### 2.6 `NowUpdates` — 8 updates × 2 locales

```ts
export const NowUpdates: CollectionConfig = {
  slug: 'now-updates',
  labels: { singular: 'Actualización Now', plural: 'Actualizaciones Now' },
  access: { read: publishedOnly, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: { autosave: { interval: 800 } } },
  defaultSort: '-date',
  admin: { useAsTitle: 'header', defaultColumns: ['date','header','_status'], group: 'Contenido' },
  hooks: { afterChange: [revalidateFor(() => ['/ahora','/ahora/archivo','/en/now','/en/now/archive','/','/en'])] },
  fields: [
    // Old frontmatter `date: 20240423` (a number!) normalises to a real date here.
    { name: 'date', type: 'date', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'header', type: 'text', required: true, localized: true,
      admin: { description: 'p.ej. "23 de abril de 2024, desde mi casa en Bogotá 🏠"' } },
    { name: 'body', type: 'richText', required: true, localized: true },
  ],
}
```

The `/ahora` page renders `find({ collection:'now-updates', sort:'-date', limit:1 })`; `/ahora/archivo` renders the rest. That replaces the current `now` + `before` split with one collection — a strict simplification.

### 2.7 `Companies`

```ts
export const Companies: CollectionConfig = {
  slug: 'companies',
  labels: { singular: 'Empresa', plural: 'Empresas' },
  access: { read: publishedOnly, create: authenticated, update: authenticated, delete: authenticated },
  defaultSort: 'order',
  admin: { useAsTitle: 'name', defaultColumns: ['name','status','yearFounded'], group: 'Contenido' },
  hooks: { afterChange: [revalidateFor(() => ['/empresas','/en/companies','/','/en'])] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'status', type: 'select', required: true, options: [
      { label: 'Activa',     value: 'active'   },
      { label: 'Adquirida',  value: 'acquired' },
      { label: 'Cerrada',    value: 'closed'   },
    ]},
    { name: 'role', type: 'text', localized: true, defaultValue: 'Co-fundador' },
    { name: 'yearFounded', type: 'number', required: true },
    { name: 'yearEnded', type: 'number' },
    { name: 'outcome', type: 'text', localized: true, admin: { description: 'p.ej. "Adquirida por RED Atlas"' } },
    { name: 'oneLiner', type: 'textarea', required: true, localized: true, maxLength: 180 },
    { name: 'description', type: 'richText', localized: true },
    { name: 'metrics', type: 'array', localized: true, maxRows: 3, fields: [
      { name: 'value', type: 'text', required: true },   // "100.000+"
      { name: 'label', type: 'text', required: true },   // "avalúos automatizados"
    ]},
    { name: 'url', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
```

### 2.8 `Pages` — flexible blocks for the three offer landing pages

The three commercial offers are the whole point of the redesign, so they must be editable without a deploy. Layout-builder blocks, not free richtext:

```ts
import { Hero, ValueProps, OfferDetail, Testimonials, FAQ, CTA, LogoWall } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  access: { read: publishedOnly, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: { autosave: { interval: 800 } } },
  admin: { useAsTitle: 'title', group: 'Contenido' },
  hooks: { afterChange: [revalidateFor((doc) => [esPath('page', doc.slug), enPath('page', doc.slug)])] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    // NOT localized: the path map in lib/routes.ts owns the URL per locale.
    // One canonical key keeps the es/en pair joined for hreflang.
    { name: 'key', type: 'select', required: true, unique: true, index: true,
      admin: { position: 'sidebar' },
      options: ['home','consulting','mentorship','talks-index','about','companies-index']
        .map(v => ({ label: v, value: v })) },
    { name: 'layout', type: 'blocks', localized: true,
      blocks: [Hero, ValueProps, OfferDetail, Testimonials, LogoWall, FAQ, CTA] },
    // FAQ entries here double as FAQPage JSON-LD — see §5.
  ],
}
```

Example block:

```ts
// src/blocks/OfferDetail.ts
export const OfferDetail: Block = {
  slug: 'offerDetail',
  labels: { singular: 'Detalle de oferta', plural: 'Detalles de oferta' },
  fields: [
    { name: 'offer', type: 'select', required: true, options: [
      { label: 'Consultoría', value: 'consulting' },
      { label: 'Mentoría',    value: 'mentorship' },
      { label: 'Charlas',     value: 'speaking'   },
    ]},
    { name: 'headline', type: 'text', required: true },
    { name: 'forWho', type: 'textarea', required: true },
    { name: 'deliverables', type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'format', type: 'text' },                 // "6 sesiones / 3 meses"
    { name: 'priceFrom', type: 'number' },
    { name: 'priceCurrency', type: 'select', defaultValue: 'COP', options: ['COP','USD'].map(v=>({label:v,value:v})) },
    { name: 'showPrice', type: 'checkbox', defaultValue: false },
    // Drives BOTH the Cal.com namespace AND the GA4 `offer` event param.
    { name: 'calEventSlug', type: 'text', required: true },  // e.g. "consultoria-15"
  ],
}
```

### 2.9 `Leads` — the collection that earns Payload its keep

```ts
export const Leads: CollectionConfig = {
  slug: 'leads',
  access: { read: authenticated, create: anyone, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'email', defaultColumns: ['email','offer','source','status','createdAt'], group: 'Negocio' },
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'name', type: 'text' },
    { name: 'offer', type: 'select', required: true, options: ['consulting','mentorship','speaking'].map(v=>({label:v,value:v})) },
    { name: 'source', type: 'group', fields: [
      { name: 'utmSource', type: 'text' }, { name: 'utmMedium', type: 'text' },
      { name: 'utmCampaign', type: 'text' }, { name: 'referrer', type: 'text' },
      { name: 'landingPath', type: 'text' }, { name: 'locale', type: 'text' },
    ]},
    { name: 'calBookingUid', type: 'text', index: true },
    { name: 'status', type: 'select', defaultValue: 'new', options: [
      'new','booked','showed','no-show','proposal','won','lost',
    ].map(v=>({label:v,value:v})) },
    { name: 'notes', type: 'textarea' },
  ],
}
```

### 2.10 Globals

```ts
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: anyone, update: authenticated },
  fields: [
    { name: 'tagline', type: 'text', localized: true },
    { name: 'metaDescription', type: 'textarea', localized: true },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
    { name: 'profilePhoto', type: 'upload', relationTo: 'media' },
    // Person JSON-LD source of truth — see §5. Do not hardcode in components.
    { name: 'person', type: 'group', fields: [
      { name: 'name', type: 'text', defaultValue: 'Salomón Muriel' },
      { name: 'alternateName', type: 'text', defaultValue: 'Luis Salomón Muriel Urbina' },
      { name: 'jobTitle', type: 'text', localized: true },
      { name: 'birthDate', type: 'date' },     // powers the computed age on /sobre-mi
      { name: 'sameAs', type: 'array', fields: [{ name: 'url', type: 'text' }] },
      { name: 'knowsAbout', type: 'array', localized: true, fields: [{ name: 'topic', type: 'text' }] },
    ]},
    { name: 'socials', type: 'array', fields: [
      { name: 'platform', type: 'text' }, { name: 'url', type: 'text' }, { name: 'label', type: 'text', localized: true },
    ]},
    { name: 'calUsername', type: 'text' },
  ],
}
```

---

## 3. shadcn/ui + Tailwind 4 alongside Payload's SCSS admin

This is the question with the most ways to get it wrong, so here is the mechanism, then the policy.

### 3.1 The isolation mechanism: separate root layouts, separate stylesheet graphs

There is exactly one rule, and it is enforced by Next's own CSS handling:

> **`src/styles/globals.css` is imported by `(es)/layout.tsx` and `(en)/layout.tsx`. It is never, under any circumstance, imported by anything reachable from `(payload)/`.**

Because `(payload)` is its own root layout with its own `<html>`, Next builds a separate CSS graph for it. Tailwind's preflight physically cannot reach the admin. This is stronger than any scoping selector, and it is free.

```css
/* src/styles/globals.css — the ONLY Tailwind entry point for the marketing site */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.99 0.004 95);
  --foreground: oklch(0.21 0.02 260);
  --primary:    oklch(0.66 0.19 32);    /* coral — carried over from the current palette */
  --accent:     oklch(0.42 0.09 255);   /* dark blue */
  --radius: 0.625rem;
  /* ...full shadcn token set, oklch per shadcn's Tailwind 4 docs... */
}
.dark { /* ...dark overrides... */ }

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary:    var(--primary);
  --radius-lg: var(--radius);
  --font-sans:    var(--font-dm-sans);
  --font-display: var(--font-syne);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground font-sans antialiased; }
}
```

```jsonc
// components.json — shadcn CLI v4
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": { "config": "", "css": "src/styles/globals.css", "baseColor": "neutral", "cssVariables": true },
  "iconLibrary": "lucide",
  "aliases": { "components": "@/components", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" }
}
```

`"config": ""` is correct for Tailwind 4 — there is no `tailwind.config.js`; the theme lives in CSS via `@theme`.

```js
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } }
```

### 3.2 The one real leak vector, and how to close it

Route-group separation handles 95% of the risk. The remaining 5% is this: **a custom Payload admin component that imports a shadcn component.** The moment you write `admin.components.Field: './components/MyPicker'` and that file imports something that pulls `globals.css`, Tailwind preflight is injected into the admin's import map and resets Payload's BEM styles globally. This is a known Payload issue (payloadcms/payload#12792).

**Policy, written down so it does not get violated in six months:**

```
RULE: Nothing under src/components/ui/ (shadcn) may be imported by any file
      referenced from payload.config.ts admin.components.*
      Admin custom components use plain CSS Modules or Payload's own @payloadcms/ui primitives.
```

Enforce it mechanically with an ESLint boundary rule:

```js
// eslint.config.js
{
  files: ['src/components/admin/**/*.{ts,tsx}', 'src/collections/**/*.tsx'],
  rules: {
    'no-restricted-imports': ['error', { patterns: [
      { group: ['@/components/ui/*', '@/styles/globals.css', '**/globals.css'],
        message: 'Tailwind/shadcn must not enter the Payload admin bundle. Use @payloadcms/ui or a CSS Module.' },
    ]}],
  },
}
```

### 3.3 Should the admin be themed? **No. Leave it stock.**

Do the 20-minute version and stop:

1. `admin.meta` — title suffix, favicon (already in the config above).
2. `admin.components.graphics.Logo` / `.Icon` — two tiny React components, no Tailwind, inline SVG.
3. Six CSS variables in `(payload)/custom.scss` to make the brand colour match:

```scss
// src/app/(payload)/custom.scss
// Payload wraps all its CSS in @layer payload-default, so plain declarations here
// win on specificity without !important.
:root {
  --theme-elevation-1000: 18 22 38;
  --color-success-500: 34 197 94;
}
html[data-theme='light'] { --theme-success-500: 34 197 94; }
html[data-theme='dark']  { --theme-bg: 12 15 26; }
```

**Why not more:** he is the only user. Payload's admin is already a good admin. Its class names are BEM but they are *not a public API* — every hour of theming becomes an upgrade tax on every `payload` bump, and `@payloadcms/*` packages must be bumped as an exact-version set. That tax is paid forever; the benefit is that one person sees a coral button instead of a blue one. Spend those hours on `/consultoria` instead.

**If he insists on Tailwind utilities inside the admin** (e.g. for a custom dashboard widget), here is the Tailwind 4-correct way — import the layers but *not* preflight:

```scss
// (payload)/custom.scss — utilities without the reset
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
// NOTE: tailwindcss/preflight.css is deliberately NOT imported.
```

(Tailwind 4 splits the old `@tailwind base/components/utilities` into importable `theme.css`, `preflight.css`, `utilities.css`. Skipping `preflight.css` is the v4 equivalent of the old `corePlugins: { preflight: false }`.)

### 3.4 Preventing leakage in the other direction

Payload's SCSS reaching the marketing site is the easier half — it only ships via `(payload)/layout.tsx`'s `@payloadcms/next/css` import, which the site's route groups never touch. Two things to still verify:
- Do not import anything from `@payloadcms/ui` into a site component. Use `payload-types.ts` for types (types are erased, safe) and never the runtime.
- Add a CI guard: `next build` then `grep -rL "payload" .next/static/css/*.css` — i.e. assert no site stylesheet contains Payload's `@layer payload-default`.

---

## 4. Content migration, URLs, and killing the blog

### 4.1 The locale flip

| | Now | After |
|---|---|---|
| Default locale | `en` | **`es`** |
| Root `/` | JS redirect shim | **Spanish home, HTTP 200, statically rendered** |
| Spanish URLs | `/es/*` | `/*` |
| English URLs | `/en/*` | `/en/*` (**unchanged prefix**) |
| `x-default` | `/en/` | **`/`** |

The English prefix does not move. That is a deliberate gift: roughly half your existing URL structure survives untouched, and only the Spanish tree needs redirecting. Path *segments* do get localised (`/es/about` → `/sobre-mi`), because a Colombian buyer reading `/consultoria` converts better than one reading `/consulting`, and the segment is a genuine relevance signal for Spanish queries.

`src/lib/routes.ts` is the single source of truth:

```ts
export const ROUTES = {
  home:            { es: '/',            en: '/en' },
  consulting:      { es: '/consultoria', en: '/en/consulting' },
  mentorship:      { es: '/mentoria',    en: '/en/mentorship' },
  talksIndex:      { es: '/charlas',     en: '/en/talks' },
  talk:  (s: string) => ({ es: `/charlas/${s}`, en: `/en/talks/${s}` }),
  about:           { es: '/sobre-mi',    en: '/en/about' },
  now:             { es: '/ahora',       en: '/en/now' },
  nowArchive:      { es: '/ahora/archivo', en: '/en/now/archive' },
  companies:       { es: '/empresas',    en: '/en/companies' },
} as const
```

Everything — nav, hreflang, sitemap, the locale switcher, and Payload's `livePreview.url` — reads from this object. There is no second place a URL is written.

### 4.2 Full old → new route table

**Trailing slashes:** Astro emitted trailing slashes; Next defaults to `trailingSlash: false` and issues an automatic **308** from `/foo/` → `/foo`. Keep the default and let Next handle the entire trailing-slash class for free. Do not add manual rules for it.

| Old URL | New | Status | Rationale |
|---|---|---|---|
| `/` | Spanish home | **200** | was a client-side redirect shim; now real content |
| `/en/` | `/en` | 308 (auto) | trailing slash |
| `/en/about` | same | 200 | |
| `/en/now` | same | 200 | |
| `/en/before` | `/en/now/archive` | **301** | |
| `/en/talks` · `/en/talks/:slug` | same | 200 | |
| `/en/companies` | same | 200 | |
| `/es/` | `/` | **301** | locale flip |
| `/es/about` | `/sobre-mi` | 301 | |
| `/es/now` | `/ahora` | 301 | |
| `/es/before` | `/ahora/archivo` | 301 | |
| `/es/talks` | `/charlas` | 301 | |
| `/es/talks/:slug` | `/charlas/:slug` | 301 | slugs are unchanged by the migration |
| `/es/companies` | `/empresas` | 301 | |
| **`/en/posts` · `/en/posts/:slug`** (243) | — | **410 Gone** | see §4.3 |
| **`/es/posts` · `/es/posts/:slug`** (242) | — | **410 Gone** | |
| **`/en/tags/*` · `/es/tags/*`** (~37 tags × 2, paginated) | — | **410 Gone** | |
| **`/posts/:slug.png`** (484 OG PNGs) | — | **410 Gone** | |
| `/rss.xml` · `/es/rss.xml` | — | **410 Gone** | blog-only feeds |
| `/en/ideas` · `/es/ideas/*` (8 × 2) | — | **410 Gone** | section cut; see §4.6 |
| `/en/uses` · `/es/uses` | — | 410 | section cut |
| `/en/resources` · `/es/resources` | — | 410 | section cut |
| `/en/search` · `/es/search` | `/` · `/en` | 301 | search is gone with the blog; a nav URL, redirect it |
| `/experimentos/cumple-35` | `/` | 301 | past event, some WhatsApp shares still live |
| `/sitemap-index.xml` | `/sitemap.xml` | 301 | Next's `sitemap.ts` emits `/sitemap.xml` |
| `/llms.txt` · `/robots.txt` | same | 200 | |

**Implementation.** Next's `next.config.ts` `redirects()` can only emit 3xx. 410 needs a response, so use `proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`, Node runtime only) with a **narrow matcher** so static pages stay pure CDN hits:

```ts
// src/proxy.ts   (Next 16: was middleware.ts; export is `proxy`, not `middleware`)
import { NextResponse, type NextRequest } from 'next/server'

const GONE = [
  /^\/(en|es)\/posts(\/|$)/,
  /^\/(en|es)\/tags(\/|$)/,
  /^\/(en|es)\/ideas(\/|$)/,
  /^\/(en|es)\/(uses|resources)\/?$/,
  /^\/posts\/.+\.png$/,
  /^\/(es\/)?rss\.xml$/,
]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (GONE.some((re) => re.test(pathname))) {
    return new NextResponse(
      '<!doctype html><meta charset=utf-8><title>410 Gone</title>' +
      '<p>Este contenido fue retirado permanentemente. / This content was permanently removed.' +
      '<p><a href="/">salomonmuriel.com</a>',
      { status: 410, headers: { 'content-type': 'text/html; charset=utf-8',
                                'cache-control': 'public, max-age=3600' } },
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/en/:path*', '/es/:path*', '/posts/:path*', '/rss.xml'],
}
```

All 3xx redirects go in `next.config.ts` `redirects()` so they are served at the Vercel edge without invoking a function.

**Ship a test, not a hope.** `scripts/check-redirects.ts` asserts the status of ~60 representative old URLs against a Vercel preview deployment, run in CI before promotion. Getting a matcher wrong here 410s the live site; a 40-line script removes that entire risk class.

### 4.3 410 vs 301 for the 485 blog URLs — and why 301 is the wrong answer

**Use 410 Gone for every blog URL, tag URL, feed, and OG PNG. Do not bulk-redirect them anywhere.**

The reasoning, not the ritual:

- **A 301 to a topically unrelated page is treated by Google as a soft 404.** Redirecting `/en/posts/fall-in-love-with-the-problem` to `/consultoria` does not preserve equity, because equity transfer through a redirect is conditional on the destination being an equivalent replacement. Google will classify it as a soft 404, drop it, and you have paid a redirect's latency plus a report full of "Soft 404" errors that look like a site health problem to anyone who later audits it.
- **Bulk-redirecting hundreds of URLs to the homepage is the classic version of this mistake** and periodically triggers quality-signal suspicion. Never do it.
- **410 is an unambiguous statement of intent** and Google processes it marginally faster than a 404, with no ambiguity about whether it might come back.
- **The equity being "lost" is close to zero anyway.** These are LinkedIn posts converted to MDX. LinkedIn is the higher-authority original; your copies are functionally duplicate, thin, and ranking for almost nothing but long-tail branded queries.

**The one exception — do this before cutover, it takes 30 minutes:**
1. Search Console → *Links* → *Top linked pages* → export.
2. GA4 → landing pages, last 12 months, organic only → export.
3. Intersect. Take any blog URL with either a real external backlink or >200 organic sessions/year.
4. **Cap that list at ~10 URLs** and 301 *those specific ones* to the single most topically relevant new page (a talk, `/consultoria`, or `/sobre-mi`). Anything below the bar gets a 410.

Realistically that list will have 0-5 entries.

### 4.4 Search Console handling — the actual sequence

1. **Do not use the Removals tool.** It is a ~6-month temporary hide from search results; it does not deindex, and it expires. Wrong instrument.
2. **Publish a temporary "sunset sitemap"** at `/sitemap-removed.xml` listing all 485 dead URLs with a fresh `<lastmod>`, and submit it in Search Console. This is the one genuine accelerant: it invites Googlebot to recrawl exactly those URLs, discover the 410s, and drop them, rather than waiting for its own slow recrawl schedule. Delete the sitemap and remove the submission after ~6 weeks.
3. **Submit the new `/sitemap.xml`** containing only the ~30 live URLs. Remove the old `/sitemap-index.xml` submission.
4. **Expect the Pages report to show a large spike under "Not found (404)".** 410s are reported there. This is the expected, correct outcome of an intentional removal. It is **not** a penalty and requires no action. Write this down somewhere he will find it in November when the graph looks alarming.
5. **URL Inspection → Request Indexing** on the ~8 money pages (`/`, `/consultoria`, `/mentoria`, `/charlas`, `/sobre-mi`, `/empresas`, `/en`, `/en/consulting`) on cutover day.
6. **Bing Webmaster Tools has a real prefix-based Block URLs tool** (unlike Google's). Block `/en/posts/`, `/es/posts/`, `/en/tags/`, `/es/tags/`.
7. **Timeline:** the bulk drops out of the index in 4-12 weeks; a long tail can persist up to 6 months. There is no way to make this instant and no reason to want one.

### 4.5 The 484 pre-generated OG PNGs — **delete them with the posts**

They live in `public/posts/` (~484 files) and exist solely to be referenced by `<meta property="og:image">` on blog pages that will 410. Once the page is gone, nothing requests the image.

Concern: "won't old LinkedIn/WhatsApp shares break?" **No.** LinkedIn re-hosts scraped OG images on its own CDN at share time; existing posts keep their thumbnails. WhatsApp caches previews client-side. A re-scrape would hit the 410 on the page itself before it ever asked for the image.

So: `git rm -r public/posts/` in the same commit as the content deletion, and 410 `/posts/*.png` via the proxy matcher for any straggler crawler. Bonus: ~50MB out of the repo, and the `jampack --exclude 'posts/**'` build hack disappears.

### 4.6 The blog judgment call

The client decided; my job is the consequence. But the brief asks for a judgment call, so here it is, once:

**Kill it, and do not build a replacement.** "LinkedIn is my blog" is a coherent distribution strategy for someone selling consulting to a referral network — LinkedIn has the audience and the algorithm, and a self-hosted mirror of LinkedIn posts is a duplicate-content liability that competes with the original. Nothing about the three commercial offers depends on a post archive.

**But leave the door open at near-zero cost:** define a `notes` collection in `payload.config.ts` from day one, with zero documents and no route generated. If in a year he wants long-form essays that are *not* LinkedIn reposts, adding `/notas/[slug]` is one afternoon rather than a re-architecture. Defining an unused collection costs one file and one empty table.

**Meanwhile, `/charlas/[slug]` does the job a blog would.** Talk pages have a date, a body, an event, a deck, and real substance — they are the site's long-form, indexable, LLM-quotable surface. Invest the writing effort there.

**Sections I would also cut, and why** (the brief's section list omits them, so this is an explicit call, not an oversight):
- **`/ideas`** (8 × 2 docs) — cut from the public site. A page of unexecuted business ideas actively undercuts a "hire me to execute" positioning. Migrate the content into Payload as an unpublished collection so it is not lost.
- **`/uses`, `/resources`** — cut. Personal-blog furniture, zero relationship to the three offers.
- **`/search`** — cut. It existed to search the blog. Fuse.js over 12 pages is theatre.
- **`/tags`** — cut with the blog.

That takes the site from ~500 indexed URLs to ~30. That is the point.

### 4.7 The migration script

Scope: **7 talks × 2 locales, 8 now updates × 2 locales, 3 pages × 2 locales.** ~36 documents. The 485 blog files are deleted, not migrated.

Use Payload's **Local API** (`getPayload`), not REST — no HTTP, no auth, no server needed.

```ts
// scripts/migrate-to-payload.ts   — run: pnpm tsx scripts/migrate-to-payload.ts --dry-run
import { getPayload } from 'payload'
import config from '../src/payload.config'
import matter from 'gray-matter'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical'
// ↑ verify these export names against 3.88 before writing the whole script.
//   The markdown↔Lexical converters live in @payloadcms/richtext-lexical.

const DRY = process.argv.includes('--dry-run')
const payload = await getPayload({ config })
const editorConfig = await editorConfigFactory.default({ config: payload.config })

// ── PASS 1: upload every referenced image, build oldPath → mediaId ───────────
const mediaMap = new Map<string, number>()
async function uploadAll() {
  for (const file of await readdir('src/assets/images', { recursive: true })) {
    const abs = path.resolve('src/assets/images', file as string)
    if (!/\.(png|jpe?g|webp|svg|gif)$/i.test(abs)) continue
    if (DRY) { mediaMap.set(`@assets/images/${file}`, -1); continue }
    const doc = await payload.create({
      collection: 'media',
      filePath: abs,
      data: { alt: path.basename(abs, path.extname(abs)).replace(/[-_]/g, ' ') },
    })
    mediaMap.set(`@assets/images/${file}`, doc.id)
  }
}

// ── PASS 2: markdown → Lexical, rewriting @assets/ image refs to upload nodes ─
async function toLexical(markdown: string) {
  // Strip MDX-only syntax that Markdown→Lexical cannot represent.
  const cleaned = markdown
    .replace(/^export\s+const\s+.*$/gm, '')          // about-*.mdx has `export const today = ...`
    .replace(/^import\s+.*$/gm, '')
    .replace(/<[A-Z][\w.]*[^>]*\/>/g, '')            // stray JSX components
    .replace(/\{[^}]*\}/g, (m) => (m.includes('\n') ? '' : m))

  const root = await convertMarkdownToLexical({ editorConfig, markdown: cleaned })

  // Replace image nodes whose src starts with @assets/ with Payload upload nodes.
  walk(root, (node) => {
    if (node.type === 'upload' || node.type === 'image') {
      const id = mediaMap.get(node.src ?? node.fields?.src)
      if (id) Object.assign(node, {
        type: 'upload', relationTo: 'media', value: { id }, fields: null, version: 3,
      })
    }
  })
  return root
}

// ── Talks: create in `es`, then update the `en` locale on the SAME doc ───────
async function migrateTalks() {
  for (const slug of await readdir('src/content/talks/es')) {
    const es = matter(await readFile(`src/content/talks/es/${slug}/${slug}.md`, 'utf8'))
    const en = matter(await readFile(`src/content/talks/en/${slug}/${slug}.md`, 'utf8'))

    const kind = es.data.embed_html ? 'html'
               : es.data.pdf        ? 'pdf'
               : es.data.youtube    ? 'youtube' : 'none'

    const existing = await payload.find({
      collection: 'talks', locale: 'es', where: { slug: { equals: slug } }, limit: 1,
    })

    const base = {
      slug,
      title: es.data.title,
      excerpt: es.data.description,
      date: new Date(es.data.pubDatetime).toISOString(),
      featured: Boolean(es.data.featured),
      presentation: { kind, staticDir: kind === 'none' ? null : slug, youtubeId: es.data.youtube ?? null },
      body: await toLexical(es.content),
      _status: 'published' as const,
    }

    const doc = existing.docs[0]
      ? await payload.update({ collection: 'talks', id: existing.docs[0].id, locale: 'es', data: base })
      : await payload.create({ collection: 'talks', locale: 'es', data: base })

    // Second write: only the localized fields, on the `en` locale.
    await payload.update({
      collection: 'talks', id: doc.id, locale: 'en',
      data: { slug, title: en.data.title, excerpt: en.data.description, body: await toLexical(en.content) },
    })
  }
}
```

**Frontmatter mapping:**

| Old | New |
|---|---|
| `talks.pubDatetime` | `date` |
| `talks.description` | `excerpt` (localized) |
| `talks.marp` / `pdf` / `embed_pdf` / `embed_html` / `youtube` | collapsed into `presentation.kind` + `presentation.staticDir` / `youtubeId` |
| `talks.tags[]` | `topics[]` — remap the 37 blog-era tags to the 6 controlled values by hand; do not import free tags |
| `talks.ogImage` / `canonicalURL` | `meta.image` / `meta.canonical` (plugin-seo) |
| `now.date: 20240423` (number!) | `date: 2024-04-23T00:00:00Z` — `new Date(String(n).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))` |
| `now.header` | `header` (localized) |
| `now.title: "Now"` | dropped — constant, belongs in the route |
| `pages/about-{en,es}.mdx` | `pages` doc `key: 'about'`, one `richText` block per locale |

**Things that will not survive Markdown→Lexical, and their fixes:**
- `about-es.mdx` computes an age from `export const birthday = new Date("1991-01-01")`. Lexical has no expressions. **Fix:** `SiteSettings.person.birthDate` + an `<Age/>` React component rendered by the page, not by richtext.
- `astro-embed` components (YouTube/Tweet embeds). **Fix:** a Lexical block node (`{ type: 'block', blockType: 'embed' }`) rendered by `RenderLexical.tsx`. Three occurrences; do them by hand.
- Shiki-highlighted code fences → Lexical `code` nodes; highlight client-side with `shiki` in the renderer, or drop highlighting (these are marketing pages, not tutorials — I would drop it).

**Safety rails:**
- `--dry-run` writes a JSON dump of what *would* be created to `/tmp/migration-preview.json`. Read it before the real run.
- Run against a **Neon branch** first (`neonctl branches create --name payload-migration-test`). Point `DATABASE_URI` at the branch, run, inspect in `/admin`, then delete the branch. Zero risk to anything.
- Idempotent: upsert on `slug`. Re-runnable.
- `talks` and `pages` bodies get a manual read-through afterwards — 36 documents is small enough to proofread, and richtext conversion always produces a few surprises.

### 4.8 Canonical + hreflang + sitemap

```tsx
// src/lib/seo.ts
export function alternates(key: keyof typeof ROUTES, slug?: string) {
  const r = typeof ROUTES[key] === 'function' ? (ROUTES[key] as any)(slug) : ROUTES[key]
  const abs = (p: string) => new URL(p, process.env.NEXT_PUBLIC_SERVER_URL!).toString()
  return {
    canonical: abs(r.es),          // per-page: set to the CURRENT locale's own URL
    languages: {
      'es-CO':     abs(r.es),
      'es':        abs(r.es),
      'en':        abs(r.en),
      'x-default': abs(r.es),      // ← Spanish is now x-default
    },
  }
}
```

Rules that must hold, because they are the ones people break:
- Each page's `canonical` is **its own** URL, never the other locale's.
- hreflang is **reciprocal** — the Spanish page points at the English one and vice versa. Deriving both from `ROUTES` makes this structurally impossible to break, which is the whole reason `ROUTES` exists.
- `x-default` → `/` (Spanish).
- Region code `es-CO` alongside generic `es`. The buyer is Colombian; `es-419` (the current `LOCALE.langTag`) is technically fine but `es-CO` is the stronger geo signal for the primary market. Emit both `es` and `es-CO`.

```ts
// src/app/(public-files)/sitemap.ts  → /sitemap.xml
import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { ROUTES } from '@/lib/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const talks = await payload.find({ collection: 'talks', locale: 'all', limit: 100, depth: 0 })
  const abs = (p: string) => new URL(p, process.env.NEXT_PUBLIC_SERVER_URL!).toString()

  const statics = (['home','consulting','mentorship','talksIndex','about','now','nowArchive','companies'] as const)
    .flatMap((k) => {
      const r = ROUTES[k]
      return [{ url: abs(r.es), priority: k === 'home' ? 1 : 0.8,
                alternates: { languages: { es: abs(r.es), en: abs(r.en) } } }]
    })

  const talkUrls = talks.docs.map((t: any) => ({
    url: abs(`/charlas/${t.slug.es}`),
    lastModified: t.updatedAt,
    alternates: { languages: { es: abs(`/charlas/${t.slug.es}`), en: abs(`/en/talks/${t.slug.en}`) } },
  }))

  return [...statics, ...talkUrls]   // ~30 URLs. Down from ~1,000.
}
```

Next's `MetadataRoute.Sitemap` emits `xhtml:link` hreflang entries from `alternates.languages` natively — no hand-rolled XML.

**RSS: delete it.** Both feeds existed only for the blog. `/rss.xml` and `/es/rss.xml` → 410. Do not ship an empty feed.

**robots.txt** — port the existing one (it is already good) to `app/(public-files)/robots.ts`, with the additions in §5.

### 4.9 OG images — `ImageResponse`, no pre-generation

Delete `src/utils/generateOgImages.tsx`, `src/utils/og-templates/`, `scripts/generate-og-images.mjs`, the `og:*` npm scripts, and the `satori` + `@resvg/resvg-js` dependencies. All of that machinery existed because 484 Satori renders at build time would have blown up the build.

At ~30 pages, that constraint evaporates. Use the file convention:

```tsx
// src/app/(es)/charlas/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { getPayloadClient } from '@/lib/payload'

export const alt = 'Charla — Salomón Muriel'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params                       // Next 16: params is async
  const payload = await getPayloadClient()
  const { docs: [talk] } = await payload.find({
    collection: 'talks', locale: 'es', where: { slug: { equals: slug } }, limit: 1,
  })
  const syne = await fetch(new URL('../../../../assets/fonts/og/syne-700.woff', import.meta.url))
    .then((r) => r.arrayBuffer())

  return new ImageResponse(
    (
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between',
                    width:'100%', height:'100%', padding:80,
                    background:'linear-gradient(135deg,#0c0f1a,#1b2340)', color:'#fff' }}>
        <div style={{ fontSize:26, opacity:.7, letterSpacing:2 }}>CHARLA</div>
        <div style={{ fontSize:68, fontFamily:'Syne', lineHeight:1.1 }}>{talk.title}</div>
        <div style={{ fontSize:30, opacity:.85 }}>Salomón Muriel · salomonmuriel.com</div>
      </div>
    ),
    { ...size, fonts: [{ name:'Syne', data: syne, weight:700, style:'normal' }] },
  )
}
```

Because the route is statically generated, these render **once at build** and ship as immutable static files. `next/og` uses Satori + resvg-wasm internally — same renderer, zero maintenance, no `optimizeDeps.exclude` workaround for the native `@resvg/resvg-js` binary.

The existing fonts at `src/assets/fonts/og/{dm-sans-400.woff,syne-700.woff}` carry over unchanged.

---

## 5. LLM / AI-crawler optimisation — what works and what is cargo cult

### 5.1 What actually moves the needle, in descending order

**1. Server-rendered HTML containing the real content.** RSC + full static generation gives you this by construction. Every crawler — search or LLM — gets complete content in the initial HTML response with no JS execution. This is the whole ballgame and you get it for free by not using client components for content. **The corollary that people miss: keep the Cal.com embed lazy.** If the CTA is a client-rendered widget the crawler sees an empty div where your conversion path is.

**2. `robots.txt` that distinguishes training crawlers from retrieval crawlers.** This is the highest-leverage *deliberate* action, and your current robots.txt half-does it. The distinction:
- **Retrieval / citation** bots fetch a page *because a user asked a question right now*, and the page can be cited in the answer with a link: `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`. **Allow all of these unconditionally** — this is the actual "get recommended by ChatGPT" mechanism.
- **Training** bots ingest for model training with no citation path: `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `meta-externalagent`, `Bytespider`, `Amazonbot`, `cohere-ai`. Allowing these is a philosophical choice with a weak, slow, indirect payoff (being *in* the model's weights for "who is a good fractional CTO in Bogotá"). Given a personal brand whose whole business is being known, **allow them too** — but understand you are choosing that, not gaining a ranking.

```ts
// src/app/(public-files)/robots.ts
import type { MetadataRoute } from 'next'
const base = process.env.NEXT_PUBLIC_SERVER_URL!

export default function robots(): MetadataRoute.Robots {
  const retrieval = ['OAI-SearchBot','ChatGPT-User','Claude-SearchBot','Claude-User',
                     'PerplexityBot','Perplexity-User','Googlebot','Bingbot','Applebot','DuckDuckBot']
  const training  = ['GPTBot','ClaudeBot','anthropic-ai','Google-Extended','Applebot-Extended',
                     'meta-externalagent','Bytespider','Amazonbot','cohere-ai','Diffbot','Timpibot','CCBot']
  return {
    rules: [
      { userAgent: '*',        allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: retrieval,  allow: '/', disallow: ['/admin/'] },
      { userAgent: training,   allow: '/', disallow: ['/admin/'] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
```

**3. JSON-LD `Person` with a stable `@id` and complete `sameAs`.** This is what feeds entity resolution — how Google's Knowledge Graph and, downstream, LLMs decide that "Salomón Muriel", "Luis Salomón Muriel Urbina", the LinkedIn profile, and the GitHub account are one entity. Your current `Layout.astro` already does this well; the migration must not weaken it. **Two rules: never change `@id` (keep it `https://www.salomonmuriel.com/#person`), and never shorten `sameAs`.**

**4. Repeating the same facts verbatim across About, `llms.txt`, and JSON-LD.** "Founded 5 companies, 2 acquired, based in Bogotá, builds Ignia" stated identically in three machine-readable places reduces model uncertainty far more than any markup trick. Your existing `public/llms.txt` is genuinely good and already does this — port it.

**5. Question-shaped `<h2>`s with short factual answers directly beneath**, plus a `FAQPage` block on each offer page. This is the format retrieval systems chunk and quote most reliably. It is also just good landing-page copy. The `FAQ` block in `Pages` (§2.8) emits both the rendered accordion and the JSON-LD from one source.

**6. Off-site citations.** Being referenced by conference sites, podcast show notes, university pages, and press is *the* dominant factor in whether an LLM knows who you are. Nothing on this site changes that. Out of scope, but say it out loud so the effort goes where it pays: **one conference speaker-page backlink is worth more than every on-page tweak in this section combined.**

### 5.2 What is cargo cult — do not spend time here

- **`llms.txt` itself.** No major provider (OpenAI, Anthropic, Google, Perplexity) has confirmed consuming it. It is a proposal with real adoption among *publishers* and essentially none among *consumers*. **You already have one; port it and stop.** Do not build tooling to generate it, do not build `/llms-full.txt`, do not maintain it as a second content system. It costs an hour, it might matter later, it does nothing today.
- **Per-page `.md` mirrors or a `/api/content` markdown endpoint.** Genuinely useful for documentation sites with thousands of pages where HTML-to-text conversion is lossy. For **12 marketing pages of clean semantic HTML, the payoff is zero.** Skip it. This is the single most over-recommended "AI SEO" tactic right now.
- **`<meta name="keywords">`.** Dead since ~2009.
- **Schema types that do not exist** (`AIContent`, `LLMOptimized`, etc.) — invented in blog posts, ignored by everything.
- **Cramming every schema.org type onto every page.** Invalid or over-nested JSON-LD gets discarded wholesale. Fewer, correct, validated blocks beat more.

### 5.3 The JSON-LD set, per route

One `Person` node with a stable `@id`, referenced by everything else. Emitted from `SiteSettings` so it is editable, never hardcoded.

```ts
// src/lib/schema.ts
const ID = { person: `${BASE}/#person`, site: `${BASE}/#website` }

export const person = (s: SiteSettings, locale: Locale) => ({
  '@type': 'Person',
  '@id': ID.person,                     // ← NEVER change this string
  name: s.person.name,
  alternateName: s.person.alternateName,
  jobTitle: s.person.jobTitle,
  url: BASE,
  image: s.person.photo?.url,
  homeLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' } },
  knowsLanguage: ['es','en'],
  knowsAbout: s.person.knowsAbout.map((k) => k.topic),
  sameAs: s.person.sameAs.map((x) => x.url),   // LinkedIn, GitHub, ... — keep complete
})
```

| Route | Types | Notes |
|---|---|---|
| `/` , `/en` | `ProfilePage` + `Person` + `WebSite` | `WebSite.inLanguage: ['es','en']`. **No `SearchAction`** — search is gone; claiming it is a lie. |
| `/consultoria` | `Service` | `serviceType: 'Consultoría en estrategia 0-a-1 y desarrollo tecnológico a medida'`, `provider: {'@id': ID.person}`, `areaServed: {'@type':'Country','name':'Colombia'}`, `hasOfferCatalog` with the deliverables, `offers.priceCurrency: 'COP'` |
| `/mentoria` | `Service` | **Not `Course`.** `Course` describes structured educational content with instances and a syllabus; 1:1 mentorship for operating founders is a service. Use `serviceType: 'Mentoría para emprendedores'`. **Only** switch to `Course` + `CourseInstance` if a cohort with real start dates ever launches — then it becomes correct and eligible for course rich results. |
| `/charlas` (index) | `Service` + `CollectionPage` + `ItemList` | Two jobs on one page: `Service` (`serviceType: 'Conferencista'`) is the *commercial offer*; `ItemList` of past talks is the *evidence*. |
| `/charlas/[slug]` | `PresentationDigitalDocument` (+ `Event` when applicable) | The deck is a `PresentationDigitalDocument` with `author: {'@id': ID.person}`. **Add `Event` only when there is a real named event with a real date** — `eventStatus: 'EventScheduled'`, `eventAttendanceMode`, `startDate`, `location`, `performer: {'@id': ID.person}`, `organizer`. That is exactly what the `event` group in the Talks schema (§2.5) exists to supply. Do not fabricate `Event` for a talk with no venue. |
| `/sobre-mi`, `/en/about` | `AboutPage` + `Person` | |
| `/empresas` | `ItemList` of `Organization`, and `Person.founder` / `alumniOf` back-references | This is a strong entity signal — it links the Person node to five named orgs. |
| Offer pages with FAQs | `+ FAQPage` | Generated from the `FAQ` block. |
| `/ahora` | `WebPage` | `Article` would be a stretch. Now-updates are not articles. |

Validate every page with [validator.schema.org](https://validator.schema.org) and Search Console's Rich Results Test **before** cutover, not after.

### 5.4 Semantic HTML — the free 80%

`<header>` / `<nav>` / `<main>` / `<article>` / `<section aria-labelledby>` / `<footer>`; exactly one `<h1>` per page; no heading-level skips; `<time datetime>` on every date; descriptive link text (never "click here" / "read more"); `alt` on every image (which is why `Media.alt` is `required: true` **and** localized). This costs nothing at authoring time and is what every extractor actually parses.

---

## 6. Rendering + performance

### 6.1 Per-route strategy

| Route | Strategy | Why |
|---|---|---|
| All `(es)` and `(en)` pages | **SSG** (`export const dynamic = 'force-static'`) | Content changes weekly at most. Every anonymous request should be a CDN hit with zero function invocation and zero DB read. |
| `/charlas/[slug]`, `/en/talks/[slug]` | SSG via `generateStaticParams` | ~7 pages per locale |
| `opengraph-image.tsx` | Static (build-time) | ~30 renders |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | `force-static` | |
| `/admin/*` | `force-dynamic` | inherently. `noindex` header. |
| `/api/payload/*`, `/api/revalidate`, `/api/webhooks/cal` | dynamic | |
| `/api/preview` | dynamic + `draftMode()` | |

**No time-based ISR.** With publish-webhook revalidation, a `revalidate: 3600` only adds staleness windows and pointless rebuilds. The single exception: `revalidate: 86400` on `/ahora` as a dead-man's-switch in case a hook silently fails.

### 6.2 Revalidate-on-publish

Payload runs inside Next, so `afterChange` hooks can call `revalidatePath` directly — no HTTP round-trip, no shared secret, no webhook endpoint.

```ts
// already wired in §2.3 via revalidateFor()
hooks: { afterChange: [revalidateFor((doc) => ['/charlas', '/en/talks', `/charlas/${doc.slug}`, ...])] }
```

**Next 16 gotcha:** `revalidateTag()` changed signature — it now takes a cache profile as a second argument (`revalidateTag(tag, profile)`), and the single-argument form is deprecated under Cache Components. **`revalidatePath()` is unchanged.** Use `revalidatePath` and sidestep the whole question. If tag-based invalidation is wanted later, verify the exact signature against the installed version first.

Both locale trees must be invalidated on every change — they are separate static routes. That is why `revalidateFor` takes an array and every collection lists both.

`/api/revalidate` still exists as a manual escape hatch (secret-protected) for "the site is stale and I do not know why".

### 6.3 Build time

| Stage | Estimate |
|---|---|
| `pnpm install` (cold) | 40-60s |
| Payload import-map + type generation | 20-35s |
| `next build` (Turbopack), ~30 routes | 30-50s |
| 30 `ImageResponse` OG renders | 10-15s |
| **Total on Vercel** | **~2 minutes** |

Slower than Astro's 35s, mostly due to Payload's build-time codegen. Irrelevant for a site that deploys a few times a week. **Content edits do not trigger builds at all** — that is the point of the revalidation hook, and it is the single biggest workflow improvement over the current setup, where every LinkedIn sync was a commit and a full rebuild.

### 6.4 Core Web Vitals guardrails

| Metric | Target | How |
|---|---|---|
| **LCP** | < 1.8s | Hero via `next/image` with `priority`, explicit `sizes`, AVIF+WebP. Static HTML from CDN. `next/font/google` for DM Sans + Syne with `display: 'swap'` and `preload` (self-hosted, replaces `@fontsource-variable/*`). |
| **CLS** | < 0.05 | Payload stores `width`/`height` on every Media doc → always pass them to `next/image`. Reserve height for the Cal.com embed container before it loads. |
| **INP** | < 200ms | **Cal.com loads on first interaction only** — the current site already does this correctly (`scripts/cal-embed.ts`); preserve the behaviour with `@calcom/embed-react` behind a click handler. GA4 via `next/script strategy="afterInteractive"`. |
| **JS budget** | ≤ 120KB gzipped on `(es)`/`(en)` | Server Components by default. `'use client'` only on: locale switcher, mobile nav, theme toggle, Cal button, FAQ accordion. **Payload admin's ~1MB bundle can never reach the site — guaranteed structurally by route-group separation, not by discipline.** |

Enforce with `@next/bundle-analyzer` plus a Lighthouse CI check on preview deployments, failing the PR under a 95 performance score. Add `@vercel/speed-insights` for field data (Vercel Analytics measures real users; Lighthouse only measures lab conditions).

---

## 7. Analytics and conversion instrumentation

### 7.1 The three funnels must be distinguishable at every step

Three offers, three funnels, one `offer` dimension threaded through everything:

```
consulting  | mentorship | speaking
```

That literal string appears in: the Cal.com event-type slug, the Cal embed namespace, every GA4 event parameter, and the `Leads.offer` field. One vocabulary, four systems, no reconciliation work later.

**Cal.com setup — three separate event types:**

| Offer | Cal event type | Duration |
|---|---|---|
| Consultoría | `salomonmuriel/consultoria-15` | 15 min |
| Mentoría | `salomonmuriel/mentoria-15` | 15 min |
| Charlas | `salomonmuriel/charla-15` | 15 min |

Separate event types (not one generic "intro call") are what make the funnel legible without any tagging cleverness: the booking record itself carries the offer.

### 7.2 Client-side tracking

```tsx
// src/components/site/CalButton.tsx
'use client'
import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { track } from '@/lib/analytics'

export function CalButton({ offer, calEventSlug, surface, locale, children }: Props) {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: offer })
      cal('ui', { theme: 'auto', hideEventTypeDetails: false })
      cal('on', { action: 'bookingSuccessful', callback: (e: any) => {
        track('generate_lead', {
          offer, surface, locale,
          cal_booking_uid: e.detail?.data?.booking?.uid,
          value: OFFER_VALUE[offer],     // consulting 500, mentorship 200, speaking 300 (relative)
          currency: 'USD',
        })
      }})
      cal('on', { action: 'linkReady',  callback: () => track('cal_embed_open', { offer, surface, locale }) })
    })()
  }, [offer, surface, locale])

  return (
    <button data-cal-namespace={offer}
            data-cal-link={`${process.env.NEXT_PUBLIC_CAL_USERNAME}/${calEventSlug}`}
            data-cal-config={JSON.stringify({ theme: 'auto', metadata: getAttribution() })}
            onClick={() => track('cta_click', { offer, surface, locale })}>
      {children}
    </button>
  )
}
```

**Attribution capture** — on first landing, stash `utm_*`, `gclid`, `document.referrer`, and the landing path in `sessionStorage`; pass them into Cal's `metadata` on booking. That is how the `Leads` record learns where a booking came from, which client-side GA4 alone cannot tell you reliably.

### 7.3 Server-side backup — the reason this actually works

Ad blockers, Safari ITP, and iOS Mail privacy eat a meaningful fraction of client-side conversion events. Since bookings are the only conversion that matters, do not rely on the browser:

```ts
// src/app/api/webhooks/cal/route.ts
export async function POST(req: Request) {
  const raw = await req.text()
  if (!verifyCalSignature(raw, req.headers.get('x-cal-signature-256'), process.env.CAL_WEBHOOK_SECRET!))
    return new Response('bad signature', { status: 401 })

  const { triggerEvent, payload: p } = JSON.parse(raw)
  if (triggerEvent !== 'BOOKING_CREATED') return Response.json({ ok: true })

  const offer = OFFER_BY_EVENT_SLUG[p.eventType.slug] ?? 'unknown'
  const payload = await getPayloadClient()

  await payload.create({ collection: 'leads', data: {
    email: p.attendees[0].email,
    name:  p.attendees[0].name,
    offer,
    calBookingUid: p.uid,
    status: 'booked',
    source: { ...pickUtm(p.metadata), landingPath: p.metadata?.landingPath, locale: p.metadata?.locale },
  }})

  // GA4 Measurement Protocol — survives ad blockers
  await sendGa4Event('generate_lead', { offer, transaction_id: p.uid })
  return Response.json({ ok: true })
}
```

Now `Leads` is the source of truth for outcomes, and it lives in the same admin he already opens to publish content. **This is the strongest argument for Payload on this project** — not the 36 content documents.

### 7.4 What to measure

| Stage | Event | Segment by |
|---|---|---|
| Reached an offer page | `page_view` | `offer` (derived from path), `locale` |
| Clicked a CTA | `cta_click` | `offer`, `surface` (hero / sticky / footer / inline) |
| Opened the Cal embed | `cal_embed_open` | `offer` |
| Booked | `generate_lead` ← **Key Event** | `offer`, `source` |
| Showed up | `Leads.status = 'showed'` | manual in admin |
| Became a client | `Leads.status = 'won'` | manual in admin |

Mark `generate_lead` as a **Key Event** in GA4 with a per-offer `value`, so GA4's built-in reports separate the three offers without a custom exploration.

**The two ratios that actually inform decisions:**
1. **`cta_click` → `generate_lead`.** If this is low, the booking flow is the problem (embed friction, too few slots, timezone confusion) — not the copy.
2. **`booked` → `showed`.** If this is low, the page is attracting the wrong people — a qualification/copy problem, not a UX one.

Everything else is vanity. **Explicitly stop reporting total sessions as a success metric** — it is about to fall off a cliff for reasons that have nothing to do with the business (see §4.3), and watching it will produce exactly the wrong conclusions.

**Legal note:** Colombia's Ley 1581 de 2012 (Habeas Data) expects notice and consent for personal-data collection. A minimal consent banner gating GA4 (not the site) plus a `/privacidad` page is the correct, cheap posture. Half a day.

---

## 8. Phased delivery — looks first, internals second

The client's instinct is right and I would sequence it that way regardless: the redesign is what he can judge, and the CMS is invisible until it works.

### The one thing to do out of order: **kill the blog on day one, on Astro.**

Deindexing takes 4-12 weeks and the clock is entirely outside your control. If the 410s go live at the *end* of the project, Search Console is still churning in December. If they go live in week 1 — as a `git rm` plus six lines in `vercel.json`, on the *current* Astro site, before any redesign work — the index is clean by the time the new site launches.

**Do the blog kill first. Do not do the locale flip twice.** The Spanish-primary flip touches every URL and every hreflang tag; doing it on Astro and again on Next means writing and testing two redirect maps. Do it once, at the Next cutover.

| Phase | Work | Effort | Ships on |
|---|---|---|---|
| **0. Decisions + blog kill** | Confirm content counts (7 not 16 talks; 485 not 253 post files). Pull the Search Console backlink/traffic export and build the ≤10-URL 301 exception list. `git rm` 485 posts + `public/posts/`. Add 410 rules + `/sitemap-removed.xml` to the Astro site. Archive cumple-35 data, delete its routes. | **1 day** | **Astro (live)** |
| **1. Design system + new look** | Design tokens (oklch), type scale (DM Sans / Syne), component inventory. Build the new nav, home, and the three offer pages — `/consultoria`, `/mentoria`, `/charlas` — as Astro pages using the tokens. **This is the client-facing deliverable and it lands in week 2.** | **4-6 days** | **Astro (live)** |
| **2. Next 16 skeleton** | `create-next-app` → Next 16.3.4 / React 19.2.8 / Tailwind 4.3.3, `shadcn init`, three root layouts, `lib/routes.ts`, port the Phase-1 designs to React/shadcn with hardcoded content. `next/font`, `next/image`, JSON-LD builders, `sitemap.ts`, `robots.ts`, OG `ImageResponse`. **Locale flip lives here.** | **4-5 days** | preview |
| **3. Payload** | `create-payload-app` into the repo, Neon `payload` schema, Vercel Blob, all collections + globals + blocks, access control, drafts + live preview, admin logo/meta (**stock theme**), the ESLint boundary rule, revalidation hooks. | **3-4 days** | preview |
| **4. Migration + cutover** | Migration script → Neon branch → proofread 36 docs → production. `proxy.ts` 410 map, `next.config.ts` 301 map, `scripts/check-redirects.ts` in CI. hreflang + canonical validation. Rich Results Test on all 8 money pages. **Point production at Next.** GSC: new sitemap, remove old, request indexing. | **2 days** | **production** |
| **5. Conversion instrumentation** | Three Cal event types, `CalButton`, attribution capture, GA4 Key Events + per-offer value, Cal webhook → `Leads` + Measurement Protocol, consent banner + `/privacidad`. | **1.5 days** | production |
| **6. Polish** | Lighthouse CI, bundle budget, `llms.txt` port, FAQ blocks + `FAQPage`, `Person` schema audit against the old `Layout.astro`, 404s, a11y pass. | **1.5 days** | production |

**Total: 17-21 working days (~4 weeks).** Phases 0-1 (5-7 days) put the new look in front of him on the live site before any Next code exists — which is both what he asked for and the correct de-risking order, since design feedback is the thing most likely to cause rework.

**What can ship on Astro as an interim, precisely:**
- ✅ The full visual redesign — Tailwind 4 is already in this repo, so the token layer and every component port over to React essentially 1:1.
- ✅ The three offer landing pages with real copy and Cal.com CTAs. **This is the revenue-relevant part and it does not need Payload at all.**
- ✅ The blog kill and all its 410s.
- ✅ New nav / IA.
- ❌ **Do not** do the locale flip on Astro. One redirect map, written once.
- ❌ **Do not** attempt a Payload-shaped content model on Astro. Wasted work.

If budget or appetite runs out after Phase 1, he has a redesigned, correctly-positioned, converting site with a clean index — and content he still edits via commits. That is a legitimate stopping point, which is a good property for a plan to have.

---

## 9. Is Payload the right call at this scale?

**Said once, plainly: for the content volume alone, yes, this is over-engineering.**

The footprint is 7 talks, 8 now-updates, 3 pages, and a media library — about **36 documents**. Payload brings a Postgres dependency, ~15 npm packages that must be version-locked as an exact set, a ~2-minute build, a second root layout, an admin surface to secure, and a permanent upgrade tax on a site that is currently a zero-dependency static build. Judged purely as "a place to keep 36 documents", it is a lot of machinery.

**The genuinely lighter alternative, for the record: [Keystatic](https://keystatic.com).** Git-backed, no database, free, first-class Next App Router support, and a real editing UI at `/keystatic` with GitHub OAuth. From the client's chair it satisfies the actual requirement — *"publish blog posts, About edits and Now updates from a UI without commits"* — because Keystatic makes the commits for him. It would remove Neon, the Postgres adapter, Blob storage, and roughly 4 days of Phase 3.

**Why I would still build Payload, and it is not just deference:**

1. **The `Leads` collection.** The moment Cal.com bookings need to land somewhere queryable with a status pipeline and UTM attribution (§7.3), a git-backed CMS is the wrong tool and you need a database anyway. Once you need the database, Payload's marginal cost drops sharply. **This is the real justification** — the site is becoming a lead-generation instrument for three commercial offers, not a brochure.
2. **The database already exists.** Neon is provisioned and paid for.
3. **Localization.** Payload's field-level localization with `defaultLocale: 'es'` and automatic fallback is materially better than maintaining parallel file trees — which is exactly the pain the current `src/content/{blog,talks,now}/{en,es}/` structure exhibits.
4. **Drafts + autosave + live preview + versions.** Genuinely useful for iterating on offer-page copy, which is where conversion actually gets won.
5. **Content edits stop triggering builds.** Today a typo fix is a commit and a full rebuild.

**Decision: build Payload. But scope it honestly.** Do not build a plugin ecosystem, do not theme the admin, do not add roles/permissions for a single-user site, do not build a preview environment beyond Payload's built-in live preview. Payload is here to be a database with a good editing UI and a place to put leads. Nothing more.

---

## 10. Risks — the five most likely to go wrong

### 1. Payload ↔ Next 16 version drift (probability: high · impact: high)
Payload's Next peer range is an explicit allowlist that blacklists most patch versions, and the 16.x branch is barely three minor versions old. A routine `npm update`, a Dependabot PR, or Vercel resolving a newer patch will break the build — or worse, break the admin at runtime while the site still compiles.
**Mitigation:** exact-pin `next`, `react`, `react-dom`, and every `@payloadcms/*` package. Commit the lockfile. Add `"overrides"` for `react`/`react-dom` to prevent transitive drift. Set Vercel's Node version explicitly to 22.x. **Never bump Next and Payload in the same PR.** Keep `next build --webpack` wired as a one-line escape hatch from Turbopack.

### 2. `localized: true` is irreversible on populated data (probability: medium · impact: high)
Payload's own docs: converting a field to or from `localized` **destroys existing data for that field**. Discovering in week 4 that `Talks.slug` should have been localized (or that `Companies.name` should not have been) means re-running the migration or hand-repairing documents.
**Mitigation:** finalise the entire localization surface in Phase 3 *before* Phase 4's migration runs. Run the migration into a **Neon branch** first, inspect every document in the admin, delete the branch, then run for real. The 36-document scale makes a full proofread genuinely feasible — do it.

### 3. A redirect/410 matcher mistake takes the site down (probability: medium · impact: critical)
One over-broad regex in `proxy.ts` returns 410 for the whole site. Or the 485 blog 410s silently do not fire, and Google keeps 485 dead URLs indexed for months. Both are invisible without testing, and one of them is a total outage.
**Mitigation:** `scripts/check-redirects.ts` asserting the exact status of ~60 representative URLs (old ES, old EN, blog, tags, OG PNGs, and — critically — every *live* page asserting 200), run against the Vercel **preview** deployment as a required CI check before promotion. This is 40 lines of code that eliminates the highest-impact risk in the project.

### 4. A previously-static site starts hitting the database on every request (probability: medium · impact: medium)
The easiest way to get this wrong: one page misses `dynamic = 'force-static'`, or a component calls `getPayload()` inside a client boundary, and suddenly every anonymous visitor triggers a cold Lambda and a Neon query. Latency triples, Neon compute burns, LCP misses target.
**Mitigation:** `export const dynamic = 'force-static'` on every site page as a lint-enforced convention. After every build, assert the route manifest shows `○ (Static)` for all `(es)`/`(en)` routes — a 10-line CI check on `.next/routes-manifest.json`. Payload is only ever called at build time or from the admin. Load-test `/` once after cutover and confirm zero function invocations in Vercel's dashboard.

### 5. Branded search and the Person entity degrade during the locale flip (probability: low-medium · impact: high)
This is the one loss that would actually hurt. Total organic traffic is *supposed* to fall — 485 pages are being deleted on purpose. But `salomonmuriel.com` ranking #1 for "Salomón Muriel", and the Knowledge Graph entity built from `Person` + `sameAs`, are the site's real SEO assets. Changing the root's language, rewriting every canonical, and flipping `x-default` all at once is exactly the manoeuvre that can shake them loose.
**Mitigation:** never change the domain. Keep `Person.@id` byte-identical to the current value. Keep `sameAs` complete and unchanged. Ensure `/` and `/sobre-mi` are the strongest, most complete pages on the site from day one. **Baseline "branded impressions" and "average position for `salomon muriel`" in Search Console the week before cutover, and watch those two numbers weekly for 8 weeks — not total sessions.** If branded position slips more than one place, investigate immediately.

### Honourable mentions
- **Admin theming scope creep.** "Just make the buttons coral" becomes three days. The §3.3 policy exists to be pointed at.
- **Markdown → Lexical conversion surprises.** MDX expressions, `astro-embed` components, and Shiki fences do not survive. 36 documents is small enough to read every one.
- **`clientUploads: true` + CSP.** Direct-to-Blob uploads need `connect-src https://*.vercel-storage.com`. Easy to miss until an upload silently fails in production.
- **Content-count mismatch.** The brief says 16 talks / 253 posts; the repo has 7 talk slugs / 485 post files. Reconcile in Phase 0 — the SEO plan is sized off the real numbers.

---

## Appendix — files deleted from the current repo

```
src/content/blog/                      # 485 files
public/posts/                          # 484 pre-generated OG PNGs
src/pages/[lang]/posts/                #
src/pages/[lang]/tags/                 #
src/pages/[lang]/ideas/                # section cut
src/pages/[lang]/{uses,resources,search}.astro
src/pages/{rss.xml.ts,es/rss.xml.ts}
src/pages/posts/[slug].png.ts
src/utils/{generateOgImages.tsx,og-templates/,getPosts.ts,getUniqueTags.ts}
scripts/{sync-linkedin.mjs,generate-og-images.mjs,generate-cumple-og.mjs}
.github/workflows/sync-linkedin.yml
src/pages/api/cumple-35/               # archived, then deleted
src/pages/experimentos/
src/lib/cumple-35/
drizzle/ , drizzle.config.ts
```

Dependencies dropped: `astro`, `@astrojs/*`, `astro-embed`, `astro-remote`, `astro-seo-schema`, `@divriots/jampack`, `satori`, `@resvg/resvg-js`, `fuse.js`, `remark-*`, `github-slugger`, `@fontsource*`, `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`, `puppeteer`, `pdf-lib`, `@marp-team/marp-core`.

Kept: `public/talks/` (Marp HTML + PDF bundles — relative asset paths, must stay static), `src/assets/fonts/og/`, favicons, `public/llms.txt`, `public/salomon.jpg`.
