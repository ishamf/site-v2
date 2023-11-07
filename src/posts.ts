import type { MDXInstance } from 'astro';
import { getCollection, z } from 'astro:content';

export const postFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  draft: z.boolean().optional(),
  created: z.coerce.date(),
});

async function getPreview(
  directory: string
): Promise<MDXInstance<Record<string, unknown>>['Content'] | undefined> {
  try {
    return (await import(`./posts/${directory}/+preview.mdx`)).Content;
  } catch (e) {
    return undefined;
  }
}

/**
 * Get posts based on the files in the posts directory.
 *
 * +page.mdx: the page itself
 * +preview.mdx: preview of the page (optional, will use "description" if not present)
 *
 * The logic to use these files is in src/routes/p/[slug]/*.
 */
export async function getPosts({
  draft = process.env.NODE_ENV !== 'production',
}: { draft?: boolean } = {}) {
  const simplePosts = await Promise.all(
    (await getCollection('posts')).map(async (post) => {
      const { Content, headings } = await post.render();
      const { customSlug, ...rest } = post.data;
      return {
        ...rest,
        Content,
        headings,
        slug: customSlug,
        link: `/p/${customSlug}`,
      };
    })
  );

  const advancedPosts = await Promise.all(
    Object.entries(import.meta.glob('./posts/*/+page.mdx', { eager: true })).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async ([modulePath, moduleExports]: any) => {
        const { Content, frontmatter, getHeadings } = moduleExports as MDXInstance<
          Record<string, unknown>
        >;

        const data = postFrontmatterSchema.parse(frontmatter);

        const directory = /([^/]+)\/\+page\.mdx/.exec(modulePath)?.[1];

        if (!directory) {
          throw new Error('Invalid path: ' + modulePath);
        }

        const { slug } = data;

        return {
          ...data,
          link: `/p/${slug}`,
          Content,
          PreviewContent: await getPreview(directory),
          headings: getHeadings(),
        };
      }
    )
  );

  const allPosts = [...simplePosts, ...advancedPosts];

  const slugs = new Set(allPosts.map((x) => x.slug));

  if (slugs.size !== allPosts.length) {
    throw new Error('Duplicate slugs!');
  }

  return allPosts
    .filter((x) => !x.draft || draft)
    .sort((a, b) => b.created.getTime() - a.created.getTime());
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];

export async function getPostBySlug(slug: string) {
  const posts = await getPosts({ draft: true });

  return posts.find((post) => post.slug === slug);
}
