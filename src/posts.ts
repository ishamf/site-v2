import type { MDXInstance } from 'astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { z } from 'astro:content';

const postFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  draft: z.boolean().optional(),
  // Transform string to Date object
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
export async function getPosts({ draft = false }: { draft?: boolean } = {}) {
  const rawPosts = await Promise.all(
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

        const { slug, created } = data;

        return {
          ...data,
          link: `/p/${slug}`,
          created: new Date(created),
          directory,
          Content,
          PreviewContent: await getPreview(directory),
          headings: await getHeadings(),
        };
      }
    )
  );

  return rawPosts
    .filter((x) => !x.draft || draft)
    .sort((a, b) => b.created.getTime() - a.created.getTime());
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];

export async function getPostBySlug(slug: string) {
  const posts = await getPosts({ draft: true });

  return posts.find((post) => post.slug === slug);
}
