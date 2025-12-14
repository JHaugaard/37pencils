import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import wikiLinkPlugin from 'remark-wiki-link';

/**
 * How Remark Plugins Fit Into Astro's Build Pipeline
 *
 * Astro uses a unified/remark/rehype pipeline to process Markdown/MDX:
 *
 * 1. PARSE: Markdown text → mdast (Markdown Abstract Syntax Tree)
 *    - This is where remark-wiki-link runs
 *    - It finds [[wiki links]] and transforms them into link nodes
 *
 * 2. TRANSFORM: mdast → mdast (remark plugins modify the tree)
 *    - Plugins can add, remove, or modify nodes
 *    - remark-wiki-link adds link nodes with special classes
 *
 * 3. CONVERT: mdast → hast (HTML Abstract Syntax Tree)
 *    - The plugin's hName, hProperties, hChildren become HTML elements
 *
 * 4. RENDER: hast → HTML string
 *    - Final output written to the page
 *
 * The markdown.remarkPlugins array in Astro config registers plugins
 * that run during steps 1-2. Each plugin is passed as [plugin, options].
 */

// https://astro.build/config
export default defineConfig({
  site: 'https://37-pencils.com',
  integrations: [
    mdx(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [
      [
        wikiLinkPlugin,
        {
          // Use | for aliases: [[slug|Display Text]]
          aliasDivider: '|',

          // Convert page name to permalink (the slug used in URLs)
          // e.g., "Why Digital Gardens" → "why-digital-gardens"
          pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],

          // Generate the href for the link
          // e.g., "why-digital-gardens" → "/posts/why-digital-gardens"
          hrefTemplate: (permalink) => `/posts/${permalink}`,

          // CSS classes for styling
          wikiLinkClassName: 'wiki-link',
          newClassName: 'wiki-link-broken',

          // TODO: In Step 5, we'll pass actual permalinks here
          // to distinguish existing vs broken links at build time
          // permalinks: [],
        },
      ],
    ],
    rehypePlugins: [],
  },
});
