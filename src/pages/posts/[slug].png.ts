import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";

type BlogPost = CollectionEntry<"blog-en" | "blog-es">;

export async function getStaticPaths() {
  const [enPosts, esPosts] = await Promise.all([
    getCollection("blog-en"),
    getCollection("blog-es"),
  ]);

  const allPosts = [...enPosts, ...esPosts];

  // Build a slug → post map, first-seen wins (deduplicates in case of same slug)
  const slugToPost = new Map<string, BlogPost>();
  for (const post of allPosts) {
    const slug = slugifyStr(post.data.title);
    if (!slugToPost.has(slug)) {
      slugToPost.set(slug, post);
    }
  }

  return [...slugToPost.entries()].map(([slug, post]) => ({
    params: { slug },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: BlogPost };
  try {
    return new Response(await generateOgImageForPost(post), {
      headers: { "Content-Type": "image/png" },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
};
