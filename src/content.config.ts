import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ── Schemas ──────────────────────────────────────────────

const blogSchema = z.object({
  author: z.string().default("Salomon Muriel"),
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  title: z.string(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
  canonicalURL: z.string().optional(),
});

const ideasSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDatetime: z.date().optional(),
  modDatetime: z.date().optional().nullable(),
  importance: z.number().default(1),
  current: z.boolean().optional(),
  draft: z.boolean().optional(),
});

const nowSchema = z.object({
  header: z.string(),
  date: z.number(),
});

const talksSchema = z.object({
  author: z.string().default("Salomon Muriel"),
  pubDatetime: z.date(),
  modDatetime: z.date().optional().nullable(),
  title: z.string(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
  canonicalURL: z.string().optional(),
  youtube: z.string().optional(),
  marp: z.boolean().optional(),
  pdf: z.boolean().optional(),
  embed_html: z.boolean().optional(),
  embed_pdf: z.boolean().optional(),
});

const pagesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
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

const blog = localizedCollection("blog", blogSchema);
const ideas = localizedCollection("ideas", ideasSchema);
const now = localizedCollection("now", nowSchema);
const talks = localizedCollection("talks", talksSchema);

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: pagesSchema,
});

// ── Exports ──────────────────────────────────────────────

export const collections = {
  "blog-en": blog.en,
  "blog-es": blog.es,
  "ideas-en": ideas.en,
  "ideas-es": ideas.es,
  "now-en": now.en,
  "now-es": now.es,
  "talks-en": talks.en,
  "talks-es": talks.es,
  pages,
};
