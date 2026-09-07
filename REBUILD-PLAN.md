# salomonmuriel.com — development plan

> ## ✅ Ejecutado el 2026-09-07. Las seis fases están hechas.
>
> Este documento queda como registro de decisiones. Para el estado actual del
> repositorio, lea `CLAUDE.md`.
>
> **Lo que quedó pendiente y no depende del código:**
>
> 1. **La lista de excepciones 301 desde Search Console.** La fase 0 pedía
>    sacar el export de backlinks y armar una lista de ≤10 URL de blog con
>    enlaces entrantes reales para redirigirlas en vez de retirarlas. No hay
>    acceso a GSC desde acá, así que **todo el blog quedó en 410**. Si hay
>    posts con enlaces que valga la pena conservar, agréguelos a
>    `vercel.json` y al caso de prueba en `scripts/check-redirects.mjs`.
> 2. **Submitir `sitemap-removed.xml`** en Search Console y quitar el
>    sitemap viejo. El archivo ya está en `/public` y anunciado en
>    `robots.txt`.
> 3. **Las variables de Keystatic en Vercel** (`.env.example`). Sin ellas
>    `/keystatic` funciona en local pero no puede hacer commits en
>    producción.
> 4. **Los 301 contra el deploy**: `node scripts/check-redirects.mjs https://www.salomonmuriel.com`.
>    En local se saltan porque los sirve `vercel.json`.
> 5. **Una foto en resolución de impresión.** El kit de `/charlas` ofrece la
>    única que existe, 800 × 800 px, y lo dice sin adornos.
> 6. **Testimonios reales.** La sección existe y está vacía a propósito.
>
> **Desviaciones del plan, y por qué:**
>
> - **React se quedó.** El plan pedía sacarlo; el admin de Keystatic es
>   React y no funciona sin él. Queda sólo para `/keystatic`: ninguna página
>   del sitio usa una isla.
> - **`output: "server"` se adelantó a la fase 1** (el plan lo ponía en la
>   3), porque las rutas 410 lo necesitan. Toda página de contenido lleva
>   `prerender = true`.
> - **La copia de la portada se movió a `src/data/landing.ts`**, en los dos
>   idiomas, en vez de quedar dentro de los componentes. Era la única manera
>   de que `/` y `/en/` no se desincronizaran.
> - **Las charlas se aplanaron** de `talks/<slug>/<slug>.md` a
>   `talks/<slug>.md`, y las imágenes de `/ahora` y `/sobre-mi` se movieron
>   a `/public`, para que Keystatic pueda leerlas y reescribirlas sin
>   romperlas. Fue eso o dejar el contenido real fuera del CMS.
> - **Todo el sitio se pasó a tuteo.** direction-36 está escrito de usted y
>   el plan dice no reescribir esa copia, pero Salomón nunca ustedea: la voz
>   del diseño no era la suya. Se reescribieron las ~130 construcciones del
>   español, incluidos los mensajes prellenados de WhatsApp.
> - **El pie usa `panelnota` y no el `#75746e` del diseño**: a 10 px ese gris
>   queda en 3,7:1 sobre el panel oscuro y no pasa contraste.
> - **Los formatos y las bios de `/charlas` se escribieron**, no se
>   extrajeron: ninguna de las 36 exploraciones tenía una página de charlas.
>   Todo sale de hechos ya documentados en `PRODUCT.md` y en las bios de las
>   direcciones 1–4, 9, 18, 23, 27 y 34.
>
> **Verificado:** `npm run build` limpio · las 10 rutas en 200 · los 410 y
> 404 según el mapa · Keystatic lee y reescribe el contenido real sin
> alterarlo · una edición de cupos en el CMS cambia el contador y el botón ·
> canonical y hreflang recíprocos en `<head>` y en el sitemap · JSON-LD
> válido · Lighthouse móvil 95+ en las cuatro categorías en las diez páginas
> · sin desborde horizontal a 375 px.

**Status:** design locked, ready to build. Written 2026-09-07.
**Stack decision: stay on Astro, add Keystatic.** No Next.js, no Payload, no database.

`design-directions/redesign-build-plan.md` is a 1,580-line plan for a Next.js + Payload rebuild. **That approach was abandoned.** Read it only for the parts that are stack-independent and still excellent: the redirect/410 analysis, the SEO and LLM-crawler sections, and the JSON-LD reference. Ignore its architecture, schemas and phasing.

---

## Context

The site is being rebuilt to sell **consulting**: custom-built software for traditional Colombian businesses under ~USD 2M/year whose processes run *chinomático* (they look automated; a person does them by hand).

After 36 design explorations the client chose **`design-directions/direction-36.html`** — a finished, self-contained 1,592-line static page in Spanish, built with Tailwind and vanilla JS. It is the visual and copy source of truth.

### Why this stack

The site is six pages of mostly-static content with two islands of interactivity — Astro's exact sweet spot. The repo is *already* Astro 6 + Tailwind 4 with working i18n routing, sitemap, RSS and OG generation. Keystatic satisfies the actual requirement — *publish About and Now edits without commits* — by making the commits for you.

Three things this buys, worth stating because they're the reason the estimate halved:

1. **No content migration.** Keystatic edits the MDX files Astro's content collections already read. The 7 talks, 8 now-updates and 3 pages stay exactly where they are.
2. **No database, no second deploy, no version coupling.** Payload allowlists specific Next *patch* versions; that tax is gone.
3. **The two interactive components stay vanilla JS.** They port to Astro `<script>` tags roughly 1:1 instead of being rewritten as React.

### Site map (final)

| Route | Content | Source |
|---|---|---|
| `/` | Consulting landing — direction-36 | Keystatic singleton |
| `/mentoria` | Mentorship | Keystatic |
| `/charlas` | Talks + organiser kit | Keystatic collection |
| `/sobre-mi` | About | Keystatic |
| `/ahora` | Now | Keystatic collection |
| `/en/*` | English secondary (5 pages) | parallel locale tree |

Spanish at root, English under `/en`. **No blog.** No `/ideas`, `/resources`, `/uses`, `/search`, `/tags`, no `/experimentos`.

---

## How to execute this

**Run the build in a fresh Claude Code session**, not as a subagent of the design conversation. That session carries 36 design directions and eight workflow briefs; a clean one starts from this document, which is self-contained.

```bash
cd ~/git/personalBlog
claude
> Read REBUILD-PLAN.md and start Phase 0.
```

One phase per session where practical. Each ends in a verifiable state.

---

## Phase 0 — Blog kill · ~1 day

First, because deindexing takes 4–12 weeks and that clock is outside our control.

- Confirm real counts before deleting (the old analysis found **7 talks and 485 post files**, not the 16/253 quoted early on).
- Pull Search Console's backlink/traffic export; build a ≤10-URL **301 exception list** for posts with real inbound links. Everything else gets **410**, not 301 — bulk redirects to unrelated pages become soft 404s.
- `git rm` the post files and `public/posts/`. Remove `scripts/sync-linkedin.mjs` and `.github/workflows/sync-linkedin.yml`.
- Add 410 rules + a temporary `/sitemap-removed.xml`.

**Done when:** old post URLs return 410, `sitemap-removed.xml` is submitted in GSC, the site still builds and deploys.

---

## Phase 1 — Strip and re-scope · ~1 day

- Delete routes: `ideas`, `resources`, `uses`, `search`, `tags`, `before`, `companies` (its content moves into the new pages), `experimentos/cumple-35` and `src/pages/api/cumple-35/`.
- Drop `fuse.js`, `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`, `@astrojs/react`, `react`, `react-dom` from `package.json` — none are needed once cumple-35 and search are gone. Archive the cumple-35 Neon data first if you want to keep it.
- **Locale flip**, done once, here: `astro.config.ts` `i18n.defaultLocale: 'es'`, `prefixDefaultLocale: false`. Spanish serves from `/`, English from `/en`. Remove the client-side language redirect in `src/pages/index.astro`.
- Rewrite `src/content.config.ts` for the surviving collections only: `talks`, `now`, `pages`.

**Done when:** `npm run build` is clean, the site is six pages, no dead imports.

---

## Phase 2 — Port direction-36 · ~3–4 days

**The core deliverable.** `design-directions/direction-36.html` is the **base you build from**, not a mockup to reinterpret. Open it first and work from it directly.

Everything you need is inside that one file:

- **Design tokens** — an inline `tailwind.config` (colours `papel` / `tinta` / `gris` / `rojo` / `rojo2` / `rojo3` / `linea`, the `arch` / `slab` / `mono` / `pen` font stacks, custom `maxWidth` and `borderRadius`). Move into the Tailwind 4 theme.
- **Styles** — a `<style>` block with CSS custom properties plus hand-written utilities the design depends on (`.grano`, `.rayas`, `.pintado`, `.hueco`, `.subraya`, `.casilla`, `.reng`, `.perfora`, `.cinta` / `.riel`, the `.rv` reveal). Port these; they carry the look.
- **Fonts** — one Google Fonts call for Archivo (variable), Alfa Slab One, IBM Plex Mono and Caveat. Move to FontSource, as the repo already does for DM Sans and Syne.
- **Copy** — Spanish, final and client-approved. Move into Keystatic; do not rewrite it.
- **Images** — `design-directions/assets/` (10 files, all present). Copy to `src/assets/`.

Port faithfully. Where you must deviate, deviate as little as possible and say so.

### Section → component map

| id | Component | Notes |
|---|---|---|
| header | `SiteNav.astro` | sticky; scroll state toggles border on `#nav` |
| hero | `Hero.astro` | h1, dictionary entry (above the fold), CTAs, spec line |
| `danos` | `Danos.astro` | |
| `chinometro` | **`Chinometro.astro`** | vanilla `<script>` |
| `cajitas` | **`TableroCajitas.astro`** | vanilla `<script>` |
| `porque` | `PorQue.astro` | |
| `programa` | `Programa.astro` | the timeline |
| `entrega` | `Entrega.astro` | "Qué le queda cuando yo me bajo" |
| `montado` | `Montado.astro` | company logos |
| `voces` | `Testimonios.astro` | Keystatic collection |
| `cupos` | `Cupos.astro` | **Keystatic singleton** — 2/4 and 3/5 must be editable |
| `preguntas` | `Faq.astro` | emits `FAQPage` JSON-LD |
| `contacto` | `Contacto.astro` | large "Escríbame" + numbered channels |

### The two interactive components

Keep both as plain `<script>` inside their `.astro` component. **No React, no islands framework** — they are self-contained DOM code and already work.

**Chinómetro** — drives `#aguja`, `#arco`, `#marcas`, `#puntaje`, `#salida`, `#wa`, `#marcadas`, `#conteo`, `#limpiar`, `#ver-titulo`, `#ver-texto`. Composes a prefilled `wa.me` message from the checked items — keep that, it qualifies the lead before the conversation starts. There's an `ESCALA` array of verdict thresholds; keep `#ver-texto`'s default synced to `ESCALA[0]`.

**Tablero de cajitas** — the connected-boxes diagram, the client's favourite section. Functions `caja`, `dibujar`, `estado`, `pintar`, `rotular`, `ruta`, plus `#btn-hoy` / `#btn-queda` and a `resize` listener. Two states: **HOY** (broken red lines, each labelled with the human acting as the cable, plus a duplicate box) and **CONECTADO**. Port the geometry as-is; do not redraw it. Boxes carry `data-a` / `data-b` / `data-r` — preserve them.

Also here: JSON-LD builders (`Person`, `ProfilePage`, `Service` for consulting, `FAQPage`), updated `sitemap`, `robots.txt` allowing GPTBot/ClaudeBot/PerplexityBot, `llms.txt`, and OG images via the existing Satori pipeline in `src/utils/generateOgImages.tsx`.

**Done when:** `/` is faithful to direction-36 at 375px and 1440px, both components work, Lighthouse ≥95 performance and a11y.

---

## Phase 3 — Keystatic · ~1–2 days

```bash
npm i @keystatic/core @keystatic/astro
```

**Verify first:** confirm `@keystatic/astro` supports **Astro 6** before committing to it. Its integration has historically tracked Astro 4/5. If it lags, see the fallback below — do not force it.

- Astro needs a server-rendered route for the admin. The repo already has `@astrojs/vercel`; switch `output` from `static` to `server` with `export const prerender = true` on content pages, so only `/keystatic` is dynamic.
- **Local mode** in dev (writes files directly); **GitHub mode** in production (GitHub App OAuth, commits on his behalf).
- Config in `keystatic.config.ts`, pointing at the *existing* content paths — `src/content/talks/{es,en}/`, `src/content/now/{es,en}/`, `src/content/pages/`. Schemas must match the Zod schemas in `src/content.config.ts` or builds break.
- Add: a `testimonios` collection, and a `cupos` singleton (consulting slots, mentee slots, last-updated date) so the counters are editable without a commit.

**Fallback if Keystatic doesn't support Astro 6:** [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — a git-backed, Decap-compatible editor that is framework-agnostic (a single HTML admin page), so Astro's version is irrelevant. Slightly less polished, zero coupling.

**Done when:** an edit at `/keystatic` in production opens a commit, the deploy runs, and the change appears.

---

## Phase 4 — Remaining pages · ~1–2 days

`/mentoria`, `/charlas`, `/sobre-mi`, `/ahora`, plus `/en` counterparts. All four are already linked from direction-36's header and footer.

`/charlas` is an **organiser kit**, not a chronological archive: topic pillars, formats, past stages, short and long bio, high-res photo, contact. Feature the four current talks; retire the three data-science ones to a plain text list.

`/mentoria` carries the honest hand-off to Ignia's Action Lab — individual 1:1 work vs. a cohort programme. It must not read as competing with Action Lab.

`/sobre-mi` and `/ahora` port from the existing `about` and `now` content, restyled to the direction-36 system.

---

## Phase 5 — Redirects + cutover · ~1 day

The locale flip already happened in Phase 1, so this is one redirect map. In `vercel.json`: 410s for the blog, tags and feeds; 301s for `/about` → `/sobre-mi`, `/now` → `/ahora`, `/companies` → `/`, `/talks` → `/charlas`, and the ≤10 backlink exceptions from Phase 0.

Add `scripts/check-redirects.ts` in CI. Validate canonical + hreflang. Rich Results Test on all six pages. In GSC: submit the new sitemap, remove the old.

---

## Phase 6 — Instrumentation + polish · ~1 day

Cal.com event types per offer; UTM capture on CTAs; GA4 Key Events per funnel. **WhatsApp is the primary consulting channel** — instrument `wa.me` clicks, including which chinómetro items were checked, since that's the qualification signal.

No leads database. Cal.com stores bookings; WhatsApp is the conversation. With 4 consulting and 5 mentee slots, a pipeline would be over-engineering — revisit only if volume demands it.

Then: Lighthouse CI, bundle budget, 404 page, a11y pass.

---

## Total: ~9–12 working days

Down from 17–21 for the Next + Payload route, mostly from dropping the framework migration and the 36-document content migration.

## Hard constraints — do not violate

- **No prices anywhere**, and no meta-commentary about not showing prices. Silence on money.
- **No blog**, no posts feed, no articles grid.
- **Spanish first**, natural Colombian Spanish. English is secondary.
- **Testimonials in direction-36 are invented placeholders.** Replace with real ones before launch or ship the section empty — never publish the fakes.
- **Ignia** appears only in: the built-things list, the capacity explanation, and the FAQ. Never the hero.
- The word "chinomático" is never explained or attributed.

## Risks

1. **`@keystatic/astro` vs Astro 6** (probability: medium · impact: medium). Verify in Phase 3 before building against it. Fallback is Sveltia CMS, which has no framework coupling at all.
2. **`output: 'server'` regressions** (low · medium). Switching from static changes build and caching behaviour. Mark every content page `prerender = true` and confirm the OG pipeline still runs at build time.
3. **Deindexing tail** (medium · low). 410s take weeks. Started in Phase 0 precisely so it finishes before launch.

## Verification

Per phase, as noted. End-to-end before launch: `npm run build` clean; all six routes return 200; every old URL returns its intended 410 or 301 (`scripts/check-redirects.ts`); a `/keystatic` edit reaches production without a manual commit; Rich Results Test passes; Lighthouse ≥95; no horizontal scroll at 375px.
