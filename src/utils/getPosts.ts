import type { CollectionEntry } from "astro:content";
import { slugifyAll } from "./slugify";

/**
 * Unified post query helper. Filters drafts, sorts by date, and optionally filters by tag.
 */
export default function getPosts(
  posts: CollectionEntry<"blog">[],
  options?: { tag?: string }
) {
  let filtered = posts.filter(({ data }) => !data.draft);

  if (options?.tag) {
    filtered = filtered.filter(post =>
      slugifyAll(post.data.tags).includes(options.tag!)
    );
  }

  return filtered.sort(
    (a, b) =>
      Math.floor(
        new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
      ) -
      Math.floor(
        new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
      )
  );
}
