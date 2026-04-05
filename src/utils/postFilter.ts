import type { CollectionEntry } from "astro:content";

const postFilter = ({
  data,
}: CollectionEntry<"blog"> | CollectionEntry<"blog-es">) => {
  return !data.draft;
};

export default postFilter;
