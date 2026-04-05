import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Custom ID generator that preserves the lang prefix (en/es) in the entry ID.
 * e.g., "en/001-sense-of-wonder/sense-of-wonder.mdx" → "en/sense-of-wonder"
 */
function langPrefixedId({
  entry,
}: {
  entry: string;
  base: string;
  data: Record<string, unknown>;
}) {
  // entry is like "en/001-sense-of-wonder/sense-of-wonder.mdx"
  const parts = entry.split("/");
  const lang = parts[0]; // "en" or "es"
  const fileName = parts[parts.length - 1].replace(/\.(md|mdx)$/, "");
  // For entries like "en/2024-04-23.mdx" (now collection), parts.length is 2
  return `${lang}/${fileName}`;
}

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

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
    generateId: langPrefixedId,
  }),
  schema: blogSchema,
});

const ideas = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/ideas",
    generateId: langPrefixedId,
  }),
  schema: ideasSchema,
});

const now = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/now",
    generateId: langPrefixedId,
  }),
  schema: nowSchema,
});

const talks = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/talks",
    generateId: langPrefixedId,
  }),
  schema: talksSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: pagesSchema,
});

export const collections = { blog, ideas, now, talks, pages };
