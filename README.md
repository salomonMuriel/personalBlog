# salomonmuriel.com

Salomón Muriel's consulting practice: custom software for traditional
Colombian companies whose operation only *looks* automated.

Made with:

![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## What this site is

Five pages in two languages — Spanish at the root, English under `/en/` —
built to do one thing: get the visitor to start a WhatsApp conversation.

| Spanish | English |
|---|---|
| `/` | `/en/` |
| `/mentoria/` | `/en/mentoring/` |
| `/charlas/` | `/en/talks/` |
| `/sobre-mi/` | `/en/about/` |
| `/ahora/` | `/en/now/` |

It started life as [AstroPaper](https://github.com/satnaing/astro-paper),
then as a bilingual blog. In 2026 it was rebuilt from scratch as a
consulting site. The blog, the tag pages, the feeds and the ideas and
resources sections are gone and return HTTP 410 on purpose, so Google drops
them instead of parking them as soft 404s. The old `/es/` tree is gone too,
but the URLs that had real inbound links — `/es/about`, `/es/now`,
`/es/talks`, `/about`, `/now`, … — are 301'd to their new homes in
`vercel.json`; only what falls through those rules reaches the 410. What
Salomón writes now goes on LinkedIn. `REBUILD-PLAN.md` is the record of
that decision.

## How it's built

- **Astro 6 + Tailwind 4**, deployed on Vercel from `main`.
- **Static output**, even though the adapter runs in `server` mode: every
  content page sets `prerender = true`. The server mode exists so
  `/keystatic` — the CMS admin — can render on demand.
- **Keystatic** edits the same MDX/MD files Astro reads. No database, no
  second copy of the content. Locally it writes files; in production it
  opens a commit on GitHub.
- **Two vanilla-JS interactive pieces** on the homepage: a ten-checkbox
  self-diagnostic that scores how manual your operation is and hands you a
  pre-written WhatsApp message, and an animated HOY → CONECTADO diagram.
  No React islands anywhere — React is installed only because Keystatic's
  admin needs it.
- **The design system lives in CSS**: tokens in the `@theme` block of
  `src/styles/base.css`, plus a set of hand-written utilities that carry the
  paper-and-ink look. Fonts are Archivo (variable width axis), Alfa Slab
  One, IBM Plex Mono and Caveat, all self-hosted and preloaded.
- **Analytics are conversion-only**: GA4 loads on idle and every contact
  click reports which section it came from.
- **Performance budget**: 95+ on all four Lighthouse categories, on all ten
  pages, on mobile.

## Running it

Node ≥ 22.19.

```bash
npm install
npm run dev              # dev server, --host
npm run build            # astro build
npm run preview          # preview the build
npm run lint             # eslint
npm run format           # prettier

npm run check:redirects  # verifies the 200 / 301 / 410 / 404 map
node scripts/shots.mjs   # screenshots at 375 and 1440 px, flags overflow
```

The CMS is at `/keystatic` once the dev server is up. See `.env.example` for
what production needs, and `CLAUDE.md` for the parts of this repo that are
easy to break.

## ✨ Feedback & Suggestions

If you have any suggestions/feedback, you can contact me via
[my email](mailto:salomon.muriel@gmail.com).

## License

Licensed under the MIT License, Copyright © 2024.

Feel free to use the structure as long as you are not impersonating me
somewhere. And if you are, please make me look nice!

---

Made with perrenque by [Salomón Muriel](https://www.salomonmuriel.com).
