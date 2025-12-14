import { getCollection } from 'astro:content';

/**
 * Backlinks Utility
 *
 * This module builds a reverse-index of wiki-links at build time.
 *
 * How it works:
 * 1. Fetch all posts using getCollection()
 * 2. For each post, extract [[wiki-links]] using regex
 * 3. Build a map: targetSlug → [{ slug, title, description }]
 *
 * The regex pattern:
 * - \[\[           - Opening double brackets (escaped)
 * - ([^\]|]+)      - Capture group 1: the slug (any char except ] or |)
 * - (?:\|[^\]]+)?  - Non-capturing optional alias: |Display Text
 * - \]\]           - Closing double brackets
 *
 * Example matches:
 * - [[my-post]] → captures "my-post"
 * - [[my-post|Display Text]] → captures "my-post"
 */

export interface BacklinkInfo {
  slug: string;
  title: string;
  description: string;
}

export type BacklinksMap = Map<string, BacklinkInfo[]>;

// Regex to extract wiki-links from MDX content
const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

/**
 * Extract all wiki-link targets from a string of content
 */
function extractWikiLinks(content: string): string[] {
  const links: string[] = [];
  let match: RegExpExecArray | null;

  // Reset regex state (important when reusing regex with 'g' flag)
  WIKI_LINK_REGEX.lastIndex = 0;

  while ((match = WIKI_LINK_REGEX.exec(content)) !== null) {
    // match[1] is the captured slug
    const slug = match[1].trim().toLowerCase().replace(/ /g, '-');
    links.push(slug);
  }

  return [...new Set(links)]; // Dedupe
}

/**
 * Build the complete backlinks map for all posts
 *
 * This function:
 * 1. Fetches all posts (including drafts in dev for accurate linking)
 * 2. Extracts wiki-links from each post's raw content
 * 3. Builds a reverse index: for each linked slug, track who links to it
 *
 * Returns a Map where:
 * - Key: slug that is being linked TO
 * - Value: array of posts that link to that slug
 */
export async function buildBacklinksMap(): Promise<BacklinksMap> {
  const backlinks: BacklinksMap = new Map();

  // Get all posts (include drafts for complete backlink mapping)
  const posts = await getCollection('posts');

  for (const post of posts) {
    const sourceSlug = post.id.replace('.mdx', '');
    const sourceInfo: BacklinkInfo = {
      slug: sourceSlug,
      title: post.data.title,
      description: post.data.description,
    };

    // The post.body contains the raw MDX content (without frontmatter)
    // We need to access it via the collection entry
    const rawContent = post.body || '';

    // Extract all wiki-links this post contains
    const linkedSlugs = extractWikiLinks(rawContent);

    // For each link, add this post to the target's backlinks
    for (const targetSlug of linkedSlugs) {
      // Don't count self-links
      if (targetSlug === sourceSlug) continue;

      if (!backlinks.has(targetSlug)) {
        backlinks.set(targetSlug, []);
      }

      backlinks.get(targetSlug)!.push(sourceInfo);
    }
  }

  return backlinks;
}

/**
 * Get backlinks for a specific post slug
 *
 * Convenience wrapper that builds the full map and returns
 * just the backlinks for one slug.
 *
 * Note: In a real app with many posts, you might want to cache
 * the backlinks map. For a personal garden, rebuilding is fine.
 */
export async function getBacklinksForSlug(slug: string): Promise<BacklinkInfo[]> {
  const map = await buildBacklinksMap();
  return map.get(slug) || [];
}

/**
 * Get all valid post slugs (for checking broken links)
 *
 * Used by astro.config.mjs to provide the permalinks array
 * to remark-wiki-link, enabling broken link detection.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getCollection('posts');
  return posts.map((post) => post.id.replace('.mdx', ''));
}
