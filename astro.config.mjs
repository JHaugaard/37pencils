import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://37pencils.net',
  integrations: [
    mdx(),
    tailwind(),
  ],
  markdown: {
    // Remark plugins will be added here for wiki-links
    remarkPlugins: [],
    // Rehype plugins for HTML processing
    rehypePlugins: [],
  },
});
