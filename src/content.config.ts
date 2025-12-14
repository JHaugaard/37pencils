import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Posts Collection Schema
 *
 * This schema defines the structure of digital garden posts.
 *
 * Schema design choices:
 * - title/description: Required for SEO and display. Every post needs these.
 * - pubDate: Required because even in a non-chronological garden, we want to know when ideas were planted.
 * - updatedDate: Optional - tracks when ideas evolved. Good for showing "tended" dates.
 * - status: The heart of the digital garden - tracks idea maturity:
 *   - seedling: Fresh, rough, may be incomplete
 *   - growing: Has substance, still developing
 *   - evergreen: Mature, polished, relatively stable
 * - tags: Optional categorization. Arrays are great for cross-cutting topics.
 * - draft: Controls visibility. Drafts show in dev, hidden in production.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    status: z.enum(['seedling', 'growing', 'evergreen']).default('seedling'),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
