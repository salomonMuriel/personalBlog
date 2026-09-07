import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import { SITE } from "./src/config";
import { rehypeImagenes } from "./src/utils/rehype-imagenes";
import { rehypeCuentas } from "./src/utils/rehype-cuentas";
import { routes } from "./src/i18n/ui";

/**
 * hreflang del sitemap. Las rutas no son paralelas (`/mentoria/` ↔
 * `/en/mentoring/`), así que la opción `i18n` del plugin no las puede
 * emparejar sola: se arman desde el mismo mapa que usa el sitio.
 */
const pares = Object.values(routes).map(r => ({
  es: new URL(r.es, SITE.website).href,
  en: new URL(r.en, SITE.website).href,
}));

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  // `server` only so that /keystatic (the CMS admin) can render on demand.
  // Every content page sets `export const prerender = true`, so the public
  // site is still fully static — see REBUILD-PLAN.md, Phase 3.
  output: "server",
  adapter: vercel(),
  integrations: [
    sitemap({
      // /keystatic is an admin surface, and the 410 routes exist only to be
      // crawled out of the index — neither belongs in the sitemap.
      filter: page =>
        !page.includes("/keystatic") &&
        !page.includes("/posts/") &&
        !page.includes("/tags/"),
      serialize(item) {
        const par = pares.find(p => p.es === item.url || p.en === item.url);
        if (par) {
          item.links = [
            { url: par.es, lang: "es-CO" },
            { url: par.en, lang: "en" },
          ];
        }
        return item;
      },
    }),
    mdx(),
    react(),
    keystatic(),
  ],
  markdown: {
    rehypePlugins: [rehypeImagenes, rehypeCuentas],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
