// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const simplePost = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    customSlug: z.string(),
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    created: z.coerce.date(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: simplePost,
};
