import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: blogSchema,
});

const blogEs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog-es" }),
  schema: blogSchema,
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

const ideas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/ideas" }),
  schema: ideasSchema,
});

const ideasEs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/ideas-es" }),
  schema: ideasSchema,
});

const nowSchema = z.object({
  header: z.string(),
  date: z.number(),
});

const now = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/now" }),
  schema: nowSchema,
});

const nowEs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/now-es" }),
  schema: nowSchema,
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

const talks = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/talks" }),
  schema: talksSchema,
});

const talksEs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/talks-es" }),
  schema: talksSchema,
});

const pagesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: pagesSchema,
});

export const collections = {
  blog,
  "blog-es": blogEs,
  ideas,
  "ideas-es": ideasEs,
  now,
  "now-es": nowEs,
  talks,
  "talks-es": talksEs,
  pages,
};
