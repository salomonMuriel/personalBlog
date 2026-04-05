import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blogSchema = ({ image }: { image: Function }) =>
  z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine((img: any) => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
      .or(z.string())
      .optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
  });

const blog = defineCollection({
  type: "content",
  schema: blogSchema,
});

const blogEs = defineCollection({
  type: "content",
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
  type: "content",
  schema: () => ideasSchema,
});

const ideasEs = defineCollection({
  type: "content",
  schema: () => ideasSchema,
});

const nowSchema = z.object({
  header: z.string(),
  date: z.number(),
});

const now = defineCollection({
  type: "content",
  schema: () => nowSchema,
});

const nowEs = defineCollection({
  type: "content",
  schema: () => nowSchema,
});

const talksSchema = ({ image }: { image: Function }) =>
  z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine((img: any) => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
      .or(z.string())
      .optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    youtube: z.string().optional(),
    marp: z.boolean().optional(),
    pdf: z.boolean().optional(),
    embed_html: z.boolean().optional(),
    embed_pdf: z.boolean().optional(),
  });

const talks = defineCollection({
  type: "content",
  schema: talksSchema,
});

const talksEs = defineCollection({
  type: "content",
  schema: talksSchema,
});

const pagesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const pages = defineCollection({
  type: "content",
  schema: () => pagesSchema,
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
