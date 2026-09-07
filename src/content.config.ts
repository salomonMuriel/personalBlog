import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ── Schemas ──────────────────────────────────────────────
// These must stay in sync with keystatic.config.ts, or a CMS edit will
// break the build.

const talksSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  draft: z.boolean().optional(),
  featured: z.boolean().optional(),
  // Retired talks stay listed as plain text instead of getting a page.
  retired: z.boolean().optional(),
  tags: z.array(z.string()).default([]),
  youtube: z.string().optional(),
  marp: z.boolean().optional(),
  pdf: z.boolean().optional(),
  embed_html: z.boolean().optional(),
  embed_pdf: z.boolean().optional(),
});

const nowSchema = z.object({
  header: z.string(),
  date: z.coerce.date(),
});

const pagesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const testimoniosSchema = z.object({
  // Nothing here is published until a real client says yes — the design's
  // three quotes were placeholders and were never shipped.
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  initials: z.string().max(3),
  order: z.number().default(0),
  draft: z.boolean().default(true),
});

// ── Factory: one collection per (type, lang) pair ────────

function localizedCollection<S extends z.ZodTypeAny>(base: string, schema: S) {
  const make = (lang: string) =>
    defineCollection({
      loader: glob({
        pattern: "**/*.{md,mdx}",
        base: `src/content/${base}/${lang}`,
      }),
      schema,
    });
  return { en: make("en"), es: make("es") };
}

const now = localizedCollection("now", nowSchema);
const talks = localizedCollection("talks", talksSchema);
const testimonios = localizedCollection("testimonios", testimoniosSchema);

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: pagesSchema,
});

// ── Exports ──────────────────────────────────────────────

export const collections = {
  "now-en": now.en,
  "now-es": now.es,
  "talks-en": talks.en,
  "talks-es": talks.es,
  "testimonios-en": testimonios.en,
  "testimonios-es": testimonios.es,
  pages,
};
