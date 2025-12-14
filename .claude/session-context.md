# Session Context

## Current Focus

**37 Pencils** - Personal digital garden project

## Workflow Progress

| Phase | Skill | Status | Output |
|-------|-------|--------|--------|
| 0 | project-brief-writer | COMPLETE | `.docs/PROJECT-MODE.md`, `.docs/brief.json` |
| 0.5 | solution-architect | COMPLETE | `.docs/architecture-context.json` |
| 1 | tech-stack-advisor | COMPLETE | `.docs/tech-stack-decision.json` |
| 2 | deployment-advisor | COMPLETE | `.docs/deployment-strategy.json` |
| 3 | project-spinup | COMPLETE | `.docs/project-foundation.json` |

## Project Summary

**37 Pencils** (37pencils.net) is a personal digital garden - not a traditional blog, but an interconnected space where ideas grow and link to each other.

### Core Concept
- **Digital Garden philosophy** over chronological blog
- **Bidirectional links** connecting posts wiki-style
- **Semantic search** to surface connections
- **Growth states**: seedling (private) → growing → evergreen
- **Brutalism-Lite aesthetic** - bold without being inaccessible
- **Schott's Miscellany tone** - wry, bemused, curious, not pretentious

### Content Types
- Quick observations and tangents (primary)
- AI/LLM-assisted development discoveries (meta-journey)
- Photography from 55-year personal archive (occasional)
- Music, curiosities, links (miscellany)

### Technical Context
- **Mode**: LEARNING (journey matters as much as destination)
- **Implementation**: Claude Code as primary implementor
- **Deployment**: Public, Cloudflare, 37pencils.net (domain owned)
- **Timeline**: Open-ended passion project

### v1 Scope
**Must-have:**
- Digital garden structure with growth states
- Bidirectional links / backlinks
- Semantic search
- Draft/seedling states (private until ready)
- Image hosting (direct, optimized)
- Brutalism-Lite aesthetic
- About page with contact

**Deferred (post-v1):**
- Scrollytelling (investigate fit)
- Automation windows (RSS, activity feeds)
- Comments/interaction

### Name Origin
"37 Pencils" comes from an absurdist political moment (Trump, Dec 2025), reclaimed to mean: thoughts go off on weird tangents, and that's where the interesting stuff lives.

## Key Decisions Made

- Learning mode selected (full exploration of trade-offs)
- Digital Garden over traditional blog structure
- Bidirectional links + semantic search as core features (ambitious but worth it)
- Photography hosted directly on site (occasional element, not focus)
- Low-key personal presence (about page only, no personal brand exercise)
- No comments/interaction - one-way broadcast with contact method
- **Architecture**: SSG approach, Markdown-in-Git, [[wikilinks]] syntax (all LOCKED)
- **Tech Stack**: Astro 4.x + Tailwind CSS + Pagefind (search) + custom Remark plugins (backlinks)

## MCP Servers for This Session

- astro-docs (for Astro documentation lookups)

## MCP Servers Added This Session

| Server | Tools | Status |
|--------|-------|--------|
| astro-docs | 1 | active |

## Notes

- User is 71, intellectually curious, "fearlessness with training wheels"
- Has parallel project: notetaking/second brain app with semantic search + backlinking (related learning)
- Touchstone for tone: Schott's Original Miscellany
- Touchstone for structure: Maggie Appleton's digital garden philosophy

## Next Steps

1. ~~Step 8: Growth Status Visual System~~ ✓
2. ~~Step 9: About Page and Navigation~~ ✓
3. ~~Step 10: Polish and Production Prep~~ ✓
4. Merge `steps-2-10` to main for deployment

## Session Status

Active: 2025-12-14
MCP Servers: astro-docs (1 tool)
Tool count: 7

---

### Session 2025-12-14 (Current) - Steps 8-10

**Completed this session:**

- **Step 8: Growth Status Visual System**
  - Created src/components/StatusBadge.astro
  - Emoji icons: 🌱 seedling, 🌿 growing, 🌲 evergreen
  - Color-coded badges (emerald/green/teal tones)
  - Hover tooltips explaining each status
  - Applied to post list headers and individual post metadata

- **Step 9: About Page and Navigation**
  - Created src/pages/about.astro (placeholder content)
  - Updated Navigation.astro with About link, mobile hamburger menu
  - Renamed "Posts" → "Garden" in nav
  - Updated Search.astro styling for consistency

- **Step 10: Polish and Production Prep**
  - Updated src/pages/index.astro with real CTAs and post count
  - Enhanced BaseLayout.astro with full OG/Twitter meta tags
  - Created public/og-image.svg for social sharing
  - Updated public/favicon.svg (sharp corners, bold)
  - Created src/pages/404.astro ("Nothing planted here yet")
  - Updated domain to 37-pencils.com in astro.config.mjs

**Files created/modified:**
- src/components/StatusBadge.astro (new)
- src/pages/about.astro (new)
- src/pages/404.astro (new)
- public/og-image.svg (new)
- src/components/Navigation.astro (About link, mobile menu)
- src/components/Search.astro (styling updates)
- src/pages/index.astro (real navigation, post count)
- src/pages/posts/index.astro (StatusBadge, removed back link)
- src/pages/posts/[...slug].astro (StatusBadge, styling)
- src/layouts/BaseLayout.astro (full meta tags)
- public/favicon.svg (sharp corners)
- astro.config.mjs (domain: 37-pencils.com)
- CLAUDE.md (domain update)

**Build output:**
- 7 pages (home, posts, 3 individual posts, about, 404)
- All meta tags for social sharing
- Pagefind search index
- Production-ready

---

### Session 2025-12-14 (Earlier) - Steps 5-7

**Completed this session:**

- **Step 5: Backlinks**
  - Created src/utils/backlinks.ts (build-time reverse index)
  - Regex extraction of [[wiki-links]] from post content
  - Backlinks map: targetSlug → [{slug, title, description}]
  - Integrated into [...slug].astro via getStaticPaths()
  - "Linked from" section shows on posts with incoming links

- **Step 6: Pagefind Search**
  - Installed @pagefind/default-ui
  - Created src/components/Search.astro (modal with ⌘K shortcut)
  - Created src/components/Navigation.astro (site nav with search)
  - Integrated navigation into BaseLayout
  - data-pagefind-body on articles, data-pagefind-ignore on nav/footer
  - Custom styling for brutalism-lite aesthetic

- **Step 7: Image Optimization**
  - Created src/components/Figure.astro (responsive images with captions)
  - Created src/assets/images/ directory
  - Generates WebP, 4 responsive sizes (400w, 600w, 800w, 1200w)
  - Lazy loading, calculated dimensions
  - Added sample image to building-in-public.mdx
  - Documented image workflow in CLAUDE.md

**Files created/modified:**
- src/utils/backlinks.ts (new)
- src/components/Search.astro (new)
- src/components/Navigation.astro (new)
- src/components/Figure.astro (new)
- src/assets/images/sample-garden.jpg (new)
- src/layouts/BaseLayout.astro (added Navigation)
- src/pages/posts/[...slug].astro (backlinks + pagefind attributes)
- src/content/posts/building-in-public.mdx (added Figure demo)
- CLAUDE.md (image workflow documentation)
- package.json (@pagefind/default-ui added)

**Build output:**
- 3 posts indexed by Pagefind
- 5 WebP image variants generated
- Navigation with search on all pages

---

### Session 2025-12-14 (Earlier) - Steps 2-4

**Completed:**

- **Step 2: Content Collection Schema**
  - Created src/content.config.ts with posts collection
  - Schema: title, description, pubDate, updatedDate, status (seedling/growing/evergreen), tags, draft
  - Created 3 sample posts demonstrating different growth states
  - Installed @astrojs/check and typescript

- **Step 3: Post List and Individual Post Pages**
  - Created src/pages/posts/index.astro (grouped by growth status)
  - Created src/pages/posts/[...slug].astro (dynamic routes)
  - Draft filtering (show in dev, hide in production)
  - Installed @tailwindcss/typography for prose styling

- **Step 4: Wiki-Style Links**
  - Installed and configured remark-wiki-link
  - [[slug]] and [[slug|Display Text]] syntax working
  - Distinctive wiki link styling (dashed underline, accent color)
  - Broken link styling (gray) for non-existent pages

**Files created/modified:**
- src/content.config.ts (new)
- src/content/posts/*.mdx (3 sample posts)
- src/pages/posts/index.astro (new)
- src/pages/posts/[...slug].astro (new)
- astro.config.mjs (remark-wiki-link added)
- src/styles/global.css (wiki link styles)
- tailwind.config.mjs (typography plugin)
- package.json (new dependencies)

**Build output:**
- /posts/index.html
- /posts/why-digital-gardens/index.html
- /posts/seedlings-and-growth/index.html
- /posts/building-in-public/index.html

---

### Session 2025-12-14 (Earlier) - Step 1

**Completed this session:**
- Step 1: Landing page with Notion-like styling
- Tagline: "Where ideas grow sideways"
- deploy-guide: Site live at https://37-pencils.com
- Created `steps-2-10` branch for continued development

**Key updates:**
- Domain changed from 37pencils.net → **37-pencils.com**
- Aesthetic changed from brutalism-lite → **Notion-like vibe**
- Auto-deploy pipeline active (push to main = live in ~2 min)

**Files created/modified:**
- src/layouts/BaseLayout.astro
- src/pages/index.astro
- src/styles/global.css
- public/favicon.svg
- tailwind.config.mjs (updated for Notion palette)
- .docs/deployment-log.json

**URLs:**
- Production: https://37-pencils.com
- Backup: https://37pencils.pages.dev
- Preview branches: [branch].37pencils.pages.dev

---

### Session 2025-12-13 Summary

**Completed this session:**
- deployment-advisor: Selected Cloudflare Pages (free tier, automatic deploys)
- project-spinup: Generated foundation with Guided Setup approach

**Files created:**
- CLAUDE.md (updated with full project context + 10 guided steps)
- package.json, astro.config.mjs, tailwind.config.mjs, tsconfig.json
- .gitignore, .env.example, README.md
- src/ directory structure (components, content, layouts, pages, styles)
- .docs/deployment-strategy.json, .docs/project-foundation.json
