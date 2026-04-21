import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  output: "static",
  adapter: vercel({
    // @astrojs/vercel bundles all SSR routes into a single function and does
    // NOT honor per-file `export const maxDuration`. Must be set globally
    // here. OpenAI gpt-image-1.5 edits/generations used by
    // /api/cumple-35/pixelize and /api/cumple-35/mascot can take 30-90s;
    // without this, Vercel's gateway returns 504. Requires a plan that
    // permits this duration (Hobby caps at 60, Pro at 300).
    maxDuration: 300,
  }),
  integrations: [
    sitemap({
      filter: page => page !== "https://www.salomonmuriel.com/",
    }),
    mdx(),
    // purgecss removed — Tailwind v4 has built-in CSS tree-shaking,
    // making purgecss redundant. It was also stripping valid TW v4 styles.
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
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
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  experimental: {
    queuedRendering: {
      enabled: true,
    },
  },
});
