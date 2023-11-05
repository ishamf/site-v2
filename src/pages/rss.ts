import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getPosts } from '@/posts';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();
  if (!context.site) throw new Error('Site not set up');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.created,
      link: post.link,
    })),
  });
};
