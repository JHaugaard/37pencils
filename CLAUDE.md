# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Developer Profile

- **Experience Level:** Learning mode - explanations welcome
- **Primary Implementor:** Claude Code with human editorial direction
- **Workflow Style:** Passion project, open timeline, curiosity-driven

## Project Overview

**37-pencils** is a personal digital garden - a non-chronological, interconnected collection of ideas that grow over time. The site prioritizes the joy of building over conventional blog structure.

### Core Philosophy

- Ideas exist in growth states (seedling -> growing -> evergreen)
- Bidirectional links surface connections between thoughts
- Exploratory navigation rather than reverse-chronological feed
- The building process is as important as the result

### Key Features (v1)

| Feature | Description | Status |
|---------|-------------|--------|
| Digital Garden Structure | Non-chronological with growth states | To build |
| Bidirectional Links | Wiki-style `[[linking]]` with backlinks | To build |
| Search | Pagefind build-time search | To build |
| Draft States | Seedling (private) -> public workflow | To build |
| Image Hosting | Optimized photography with astro:assets | To build |
| Brutalism-Lite Aesthetic | Bold, distinctive visual design | To build |

### Deferred to Post-v1

- Semantic search (Ollama embeddings)
- Scrollytelling capability
- RSS aggregation / automation windows

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Astro 4.x | Content-first SSG, islands architecture |
| Styling | Tailwind CSS 3.x | Utility-first for brutalism-lite aesthetic |
| Content | MDX + Content Collections | Type-safe frontmatter, structured queries |
| Search | Pagefind | Build-time index, ~4KB client JS |
| Backlinks | remark-wiki-link + custom plugin | Remark ecosystem for portability |
| Images | astro:assets | Built-in optimization, WebP, lazy loading |
| Build | Vite | Comes with Astro |

## Development Environment

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or pnpm
- Git

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```text
37pencils/
├── src/
│   ├── components/      # Reusable Astro/MDX components
│   ├── content/         # Content collections (posts, etc.)
│   │   └── config.ts    # Collection schemas
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   └── styles/          # Global styles
├── public/              # Static assets (favicon, etc.)
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Deployment

**Target:** Cloudflare Pages
**Workflow:** Local development -> Push to GitHub -> Automatic deploy

DNS is already on Cloudflare. Use `deploy-guide` skill when ready to:

1. Create GitHub repository
2. Connect Cloudflare Pages
3. Configure custom domain (37-pencils.com)

## Code Conventions

### Astro Components

```astro
---
// Frontmatter: runs at build time
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<!-- Template: generates HTML -->
<h1>{title}</h1>

<style>
  /* Scoped styles by default */
</style>
```

### Content Collections

Posts live in `src/content/posts/` as `.mdx` files with typed frontmatter:

```mdx
---
title: "Post Title"
description: "Brief description"
pubDate: 2024-01-15
status: "seedling" | "growing" | "evergreen"
tags: ["tag1", "tag2"]
---

Content with [[wiki-style links]] to other posts.
```

### Tailwind Usage

- Use utility classes directly in templates
- Extract components for repeated patterns
- Brutalism-lite: bold typography, high contrast, intentional roughness

### File Naming

- Components: `PascalCase.astro`
- Pages: `kebab-case.astro`
- Content: `kebab-case.mdx`
- Utilities: `camelCase.ts`

## Common Commands

```bash
# Development
npm run dev              # Start dev server (localhost:4321)
npm run build            # Production build to dist/
npm run preview          # Preview production build

# Content
# Add new post: create src/content/posts/post-slug.mdx

# Astro CLI
npx astro add <integration>   # Add integrations
npx astro check               # TypeScript checking
```

## Troubleshooting

### Common Issues

**Port 4321 in use:**

```bash
npm run dev -- --port 4322
```

**Content collection errors:**

- Check frontmatter matches schema in `src/content/config.ts`
- Run `npx astro check` for type errors

**Image optimization issues:**

- Use `import` for local images, not string paths
- Images in `src/` are optimized; `public/` images are not

## Image Workflow

### Where to Put Images

```text
src/assets/images/        <- Optimized (use this for content)
├── photo.jpg               Processed at build time
├── hero.png                Generates WebP, multiple sizes
└── diagram.svg             Hash-based filenames for caching

public/                   <- Static (use for special cases)
├── favicon.svg             Copied as-is, no processing
├── robots.txt              Direct URL access
└── og-image.png            When exact URL is needed
```

### Using the Figure Component

In MDX files, import and use the Figure component:

```mdx
---
title: "My Post"
---

import Figure from '../../components/Figure.astro';
import myPhoto from '../../assets/images/my-photo.jpg';

Some text here.

<Figure
  src={myPhoto}
  alt="Description of the image"
  caption="Optional caption below the image"
/>

More text.
```

### Figure Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | ImageMetadata | Yes | Imported image |
| `alt` | string | Yes | Alt text for accessibility |
| `caption` | string | No | Caption below image |
| `width` | number | No | Width constraint (default: 672px) |
| `loading` | 'lazy' \| 'eager' | No | Loading strategy (default: lazy) |
| `class` | string | No | Additional CSS classes |

### What Happens at Build Time

```text
Input:  src/assets/images/photo.jpg (800KB, 2400x1600)

Output: dist/_astro/
        ├── photo_abc123_400w.webp   (7KB)
        ├── photo_abc123_600w.webp   (14KB)
        ├── photo_abc123_800w.webp   (20KB)
        └── photo_abc123_1200w.webp  (36KB)

HTML:   <img srcset="...400w, ...600w, ...800w, ...1200w"
             sizes="(max-width: 672px) 100vw, 672px"
             loading="lazy" decoding="async" />
```

### Quick Reference

```bash
# Add a new image
1. Place image in src/assets/images/
2. In your MDX file:
   import Figure from '../../components/Figure.astro';
   import myImage from '../../assets/images/my-image.jpg';
3. Use: <Figure src={myImage} alt="Description" />
```

## Skill Location

Personal skills at: /Users/john/.claude/skills

## MCP Server Workflow (Docker MCP Gateway)

### Architecture

Core gateway (always present, ~6 tools, ~4k tokens):
- mcp-find, mcp-add, mcp-remove, mcp-config-set, mcp-exec, code-mode

Server management (via Bash, persists to gateway):
- `docker mcp server enable [name]` - adds server and tools
- `docker mcp server disable [name]` - removes server and tools
- `docker mcp server reset` - nuclear option, back to 6 core tools
- `docker mcp tools count` - check current tool count

After enable/disable: user needs /clear for Claude to see changes.

### Philosophy

- Clean slate: start sessions with only 6 core tools
- Human-in-the-loop: ask before adding servers
- Session-aware: track what's added, clean up at end

### Workflow

At session start (`/session-start`):
- Check tool count (should be 6)
- Ask which servers needed
- Enable via: `docker mcp server enable [name]`
- User runs /clear to load new tools

During session:
- "I could add [server] for [task]. Should I?"
- If yes: enable via Bash, user /clear, log in session-context.md

At session end (`/session-end`):
- Disable each server via: `docker mcp server disable [name]`
- Verify tool count returns to 6
- If stuck: `docker mcp server reset`

### Phrasing

- "I could add Context7 for up-to-date docs. Should I?"
- "GitHub MCP would help with this PR. Add it?"
- "This needs database access - add postgres?"

---

## Next Steps (Guided Setup)

Follow these prompts in order to build out your digital garden. Each step builds on the previous.

### Step 1: Base Layout and Homepage

**What you'll learn:** Astro layouts, basic routing, Tailwind setup

**Prompt to use:**

```text
Create the base layout and homepage for 37-pencils.

Requirements:
- BaseLayout.astro with HTML boilerplate, meta tags, and Tailwind
- index.astro homepage with:
  - Site title "37 Pencils"
  - Brief intro text
  - Placeholder for post list
- Start with minimal brutalism-lite styling:
  - System font stack or bold sans-serif
  - High contrast (near-black on white or inverse)
  - Generous whitespace
  - No rounded corners

Keep it simple - we'll iterate on design.
```

**Verification:** `npm run dev` shows homepage at localhost:4321

---

### Step 2: Content Collection Schema

**What you'll learn:** Astro Content Collections, Zod schemas, frontmatter types

**Prompt to use:**

```text
Set up the content collection for posts.

Requirements:
- Create src/content/config.ts with posts collection
- Schema should include:
  - title (required string)
  - description (required string)
  - pubDate (required date)
  - updatedDate (optional date)
  - status: "seedling" | "growing" | "evergreen" (default: seedling)
  - tags (optional string array)
  - draft (optional boolean, default: false)
- Create 2-3 sample posts in src/content/posts/ demonstrating different states
- Posts should be .mdx files

Explain the schema choices as you build.
```

**Verification:** `npx astro check` passes, sample posts visible in dev

---

### Step 3: Post List and Individual Post Pages

**What you'll learn:** Dynamic routes, `getCollection()`, filtering drafts

**Prompt to use:**

```text
Create the post listing and individual post pages.

Requirements:
- src/pages/posts/index.astro - list all non-draft posts
  - Group or indicate by status (seedling/growing/evergreen)
  - Show title, description, date
  - Link to individual post
- src/pages/posts/[...slug].astro - individual post page
  - Render MDX content
  - Show metadata (date, status, tags)
  - Placeholder for backlinks section
- Filter out draft: true posts in production (show in dev)

Use getCollection() and explain the [...slug] pattern.
```

**Verification:** Can navigate from homepage -> post list -> individual post

---

### Step 4: Wiki-Style Links (Basic)

**What you'll learn:** Remark plugins, Markdown processing pipeline

**Prompt to use:**

```text
Implement basic wiki-style linking with [[double brackets]].

Requirements:
- Install and configure remark-wiki-link
- Links like [[post-slug]] should resolve to /posts/post-slug
- Links like [[post-slug|Display Text]] should show custom text
- Style wiki links distinctively (different from regular links)
- Handle broken links gracefully (style differently, don't break build)

Update sample posts to include wiki links between them.
Explain how Remark plugins fit into Astro's build pipeline.
```

**Verification:** Wiki links render as clickable links in posts

---

### Step 5: Backlinks

**What you'll learn:** Custom Remark plugins, build-time data processing

**Prompt to use:**

```text
Add backlinks to show which posts link TO the current post.

Requirements:
- Build-time: scan all posts and build a backlinks map
- On each post page, show "Linked from:" section with posts that reference it
- Create a utility or plugin that:
  - Parses all posts for [[wiki-links]]
  - Builds a map of slug -> [linking slugs]
  - Makes this available to post pages
- Style backlinks section to be visually distinct but not distracting

This is the core digital garden feature - explain the approach.
```

**Verification:** Posts show backlinks from other posts that reference them

---

### Step 6: Pagefind Search

**What you'll learn:** Build-time search indexing, client-side search UI

**Prompt to use:**

```text
Add Pagefind search to the site.

Requirements:
- Install @pagefind/default-ui
- Add Pagefind to build process
- Create search component that:
  - Can be triggered from header/nav
  - Shows search modal or inline results
  - Searches post titles and content
- Index should exclude draft posts
- Style search UI to match brutalism-lite aesthetic

Explain how Pagefind's build-time indexing works.
```

**Verification:** Can search for content and navigate to results

---

### Step 7: Image Optimization

**What you'll learn:** astro:assets, responsive images, optimization pipeline

**Prompt to use:**

```text
Set up image optimization for the photography archive.

Requirements:
- Configure astro:assets for automatic optimization
- Create an Image component that:
  - Accepts local images via import
  - Generates responsive srcset
  - Converts to WebP
  - Implements lazy loading
  - Supports captions
- Add sample image to a post demonstrating usage
- Document the image workflow in this file

Explain the difference between src/ images (optimized) and public/ images (static).
```

**Verification:** Images load optimized, lazy, with responsive sizes

---

### Step 8: Growth Status Visual System

**What you'll learn:** Component variants, CSS theming

**Prompt to use:**

```text
Create a visual system for post growth states.

Requirements:
- StatusBadge component showing seedling/growing/evergreen
- Use emoji or simple icons: seedling, growing plant, tree
- Color coding that fits brutalism-lite aesthetic
- Apply to:
  - Post list items
  - Individual post header
- Consider hover states explaining what each status means

Keep it simple but distinctive.
```

**Verification:** Status clearly visible on post list and post pages

---

### Step 9: About Page and Navigation

**What you'll learn:** Static pages, site navigation patterns

**Prompt to use:**

```text
Add the About page and site navigation.

Requirements:
- src/pages/about.astro with:
  - Brief personal intro (placeholder text fine)
  - Contact method placeholder
  - Low-key, not a personal brand exercise
- Navigation component with:
  - Site title/home link
  - Posts link
  - About link
  - Search trigger
- Mobile-responsive navigation

Integrate navigation into BaseLayout.
```

**Verification:** Can navigate between all main sections

---

### Step 10: Polish and Production Prep

**What you'll learn:** Production builds, performance, final touches

**Prompt to use:**

```text
Prepare 37-pencils for production deployment.

Requirements:
- Review and refine brutalism-lite styling for consistency
- Add proper meta tags (OpenGraph, description)
- Create favicon (simple, bold)
- Add 404 page
- Run production build and check:
  - No build errors
  - Pagefind index generated
  - Images optimized
- Test all features work in preview mode

List any issues found and their fixes.
```

**Verification:** `npm run build && npm run preview` works perfectly

---

### Ready to Deploy?

After completing the steps above, use the `deploy-guide` skill:

```text
Use the deploy-guide skill to deploy 37-pencils to Cloudflare Pages.
```

This will walk you through GitHub setup, Cloudflare Pages connection, and custom domain configuration.

---

## Resources

### Astro

- [Astro Docs](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [View Transitions](https://docs.astro.build/en/guides/view-transitions/)

### Digital Gardens

- [Maggie Appleton's Digital Garden](https://maggieappleton.com/garden)
- [A Brief History of Digital Gardens](https://maggieappleton.com/garden-history)

### Tailwind

- [Tailwind Docs](https://tailwindcss.com/docs)

### Pagefind

- [Pagefind Docs](https://pagefind.app/)
