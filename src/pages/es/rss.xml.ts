import rss from "@astrojs/rss";
import { SITE } from "@config";
import { getLocalizedCollection } from "@i18n/utils";
import getPosts from "@utils/getPosts";

export async function GET() {
  const posts = await getLocalizedCollection("es", "blog");
  const sortedPosts = getPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id }) => ({
      link: `es/posts/${id}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
