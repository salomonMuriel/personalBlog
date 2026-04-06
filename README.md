# Salomón's Personal Website / Blog

Just my happy little corner of the internet.

Made with:

![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Started from [AstroPaper](https://github.com/satnaing/astro-paper) but has been so heavily customized over time that it bears little resemblance to the original template.

## What this site is

A personal website and bilingual blog (English/Spanish) that also serves as a consultancy landing page. Content includes blog posts synced from LinkedIn, conference talks, business ideas, "now" page updates, and static pages.

## Key features built on top of the original template

- **Bilingual (EN/ES)** — full i18n support with browser language detection, `[lang]` routing, and a language switcher
- **LinkedIn sync** — automated GitHub Action (`sync-linkedin.yml`) pulls posts daily via `scripts/sync-linkedin.mjs`, translates them with an LLM, and commits bilingual MDX entries
- **Astro 6 + Tailwind 4** — major version upgrades from the original template's Astro 4 + Tailwind 3
- **FontSource fonts** — DM Sans Variable (body) + Syne (headings), replacing the original monospace font
- **Consultancy homepage** — hero, CTA sections, Cal.com scheduling integration, and PDF proposal generation
- **Presentations** — Marp-based slide decks with PDF export via Puppeteer
- **Factory pattern for localized collections** — content collections share schemas via a factory utility
- **Resources as local content** — replaces the original GitHub-fetched resources list
- **Schema markup** — ProfilePage + Person structured data for SEO
- **Reading time estimates** — displayed on post cards and detail pages
- **Dark/light theme toggle** — custom palette (dark blue + coral)
- **Explore dropdown nav** — groups Ideas, Resources, Stack under a single nav item
- `pages` content collection for About, Uses, Resources static content (bilingual MDX)

## ✨ Feedback & Suggestions

If you have any suggestions/feedback, you can contact me via [my email](mailto:salomon.muriel@gmail.com).

## License

Licensed under the MIT License, Copyright © 2024.

Feel free to use the structure as long as you are not impersonating me somewhere. And if you are, please make me look nice!

---

Made with perrenque by [Salomón Muriel](https://www.salomonmuriel.com).
