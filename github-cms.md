# GitHub as a Content Management System

**A Reference Guide for Git-Based Publishing**

*Written for the 37-pencils digital garden project*

---

## Introduction

Traditional content management systems like WordPress, Joomla, or Drupal store content in databases and provide web-based admin panels for editing. Git-based content management takes a fundamentally different approach: your content lives in plain text files, tracked by version control, and transformed into a website through automated build processes.

This guide explains how GitHub functions as a CMS for static sites built with frameworks like Astro, and provides practical workflows for the 37-pencils digital garden.

---

## Part 1: Conceptual Foundation

### The Traditional CMS Model

In systems like Joomla with MySQL:

```
Author → Web Admin Panel → PHP Application → MySQL Database
                                    ↓
                          Server renders HTML on each request
                                    ↓
                                 Visitor
```

Content exists as rows in database tables. The application queries the database and generates HTML dynamically for each visitor. This requires:

- A running server (PHP, Node, etc.)
- A database server (MySQL, PostgreSQL)
- Constant server-side processing

### The Git-Based Model

With GitHub as your CMS:

```
Author → Local text editor → Markdown files → Git commit
                                                  ↓
                                            Git push to GitHub
                                                  ↓
                                      Build service triggered
                                                  ↓
                              Static HTML generated (Astro build)
                                                  ↓
                                    Files deployed to CDN
                                                  ↓
                                              Visitor
```

Content exists as files in a repository. A build process transforms these files into static HTML once, then serves pre-built pages to every visitor. This requires:

- No running application server
- No database
- Just files on a CDN (Content Delivery Network)

### Key Insight

**Your content directory is your database.** Each Markdown file is a "record" with frontmatter as structured fields:

```markdown
---
title: "My Post"           # ← Like a database column
pubDate: 2024-12-13        # ← Another column
status: "seedling"         # ← Another column
tags: ["ideas", "web"]     # ← Array field
---

Content here...            # ← The "body" or "content" column
```

The build process (Astro) queries these files just like a traditional CMS queries a database, but at build time rather than request time.

---

## Part 2: What GitHub Provides

GitHub offers features that parallel traditional CMS capabilities:

### Version History (Audit Trail)

Every commit is a snapshot of your entire site. You can:

- See exactly what changed and when
- Recover any previous version of any file
- Track the evolution of ideas over time

```bash
# View history of a specific post
git log --oneline src/content/posts/digital-gardens.mdx

# See what a post looked like 3 months ago
git show abc123:src/content/posts/digital-gardens.mdx
```

### Branching (Staging Environments)

Create parallel versions of your site for experimentation:

```bash
# Create an experimental branch
git checkout -b redesign-experiment

# Work freely without affecting the live site
# When satisfied, merge back:
git checkout main
git merge redesign-experiment
```

### Collaboration Features

- **Pull Requests**: Review changes before publishing
- **Issues**: Track ideas, bugs, or planned content
- **Discussions**: Engage with readers (if repo is public)

### Backup and Redundancy

Your content exists in multiple places:

1. Your local machine
2. GitHub's servers
3. Any other machines you clone to

Losing one doesn't lose your content.

---

## Part 3: The 37-pencils Repository

### Current Configuration

```
Repository: https://github.com/JHaugaard/37pencils.git
Branch: main
Deployment target: Cloudflare Pages
Domain: 37-pencils.com
```

### Repository Structure

```
37pencils/
├── src/
│   ├── content/
│   │   ├── config.ts           # Content schema definitions
│   │   └── posts/              # YOUR CONTENT LIVES HERE
│   │       ├── first-post.mdx
│   │       └── another-post.mdx
│   ├── components/             # Reusable UI elements
│   ├── layouts/                # Page templates
│   ├── pages/                  # Route definitions
│   └── styles/                 # Global styles
├── public/                     # Static assets (images, favicon)
├── astro.config.mjs            # Framework configuration
├── tailwind.config.mjs         # Styling configuration
├── package.json                # Dependencies and scripts
└── CLAUDE.md                   # Project documentation
```

### Content Schema

Posts in 37-pencils use this frontmatter structure:

```markdown
---
title: "Post Title"                    # Required
description: "Brief description"        # Required
pubDate: 2024-12-13                     # Required
updatedDate: 2024-12-14                 # Optional
status: "seedling"                      # seedling | growing | evergreen
tags: ["tag1", "tag2"]                  # Optional
draft: false                            # true = hidden from production
---
```

The `status` field enables the digital garden's growth metaphor:

- **Seedling**: Early idea, rough, may change significantly
- **Growing**: Developing, more refined, still evolving
- **Evergreen**: Mature, stable, represents settled thinking

---

## Part 4: Daily Workflows

### Creating New Content

```bash
# 1. Ensure you have the latest changes (if working from multiple machines)
git pull

# 2. Create a new post file
# Use your editor to create: src/content/posts/new-idea.mdx

# 3. Add frontmatter and content
---
title: "A New Idea"
description: "Exploring something interesting"
pubDate: 2024-12-13
status: "seedling"
tags: ["thinking"]
---

Your content here with [[wiki-links]] to other posts.

# 4. Preview locally
npm run dev
# Visit localhost:4321 to see your changes

# 5. Stage the new file
git add src/content/posts/new-idea.mdx

# 6. Commit with a descriptive message
git commit -m "Add seedling: a new idea about something"

# 7. Push to GitHub (triggers deployment)
git push
```

### Editing Existing Content

```bash
# Edit the file in your editor
# Preview with: npm run dev

# Stage, commit, push
git add src/content/posts/existing-post.mdx
git commit -m "Update: expand section on wiki linking"
git push
```

### Promoting Growth Status

When an idea matures, update its status:

```markdown
---
status: "growing"    # Was "seedling"
---
```

```bash
git add src/content/posts/maturing-idea.mdx
git commit -m "Promote to growing: maturing idea"
git push
```

### Working with Drafts

Two approaches for unpublished content:

**Frontmatter draft flag:**
```markdown
---
draft: true
---
```
The build process excludes drafts from production but shows them in local development.

**Drafts branch:**
```bash
git checkout -b drafts
# Write freely
# Posts won't deploy until merged to main
git checkout main
git merge drafts
```

---

## Part 5: Essential Git Commands

### Status and Changes

```bash
git status              # What's changed?
git diff                # Show line-by-line changes
git diff --staged       # Show changes staged for commit
```

### History

```bash
git log --oneline -10           # Recent commits, compact
git log -p -- path/to/file      # Full history of specific file
git blame path/to/file          # Who changed each line, when
```

### Undoing Mistakes

```bash
# Discard changes to a file (before staging)
git checkout -- src/content/posts/oops.mdx

# Unstage a file (after git add, before commit)
git reset HEAD src/content/posts/oops.mdx

# Undo the last commit (keep changes as uncommitted)
git reset --soft HEAD~1

# Revert a commit (create new commit that undoes it)
git revert HEAD
```

### Recovery

```bash
# Recover a deleted file from the last commit
git checkout HEAD -- src/content/posts/deleted.mdx

# Recover from a specific commit
git checkout abc123 -- src/content/posts/deleted.mdx

# Find a commit where text existed
git log -p -S "search phrase" -- src/content/posts/
```

### Multi-Device Sync

```bash
# Start of session (get latest)
git pull

# End of session (share changes)
git push
```

---

## Part 6: The Deployment Pipeline

### How Publishing Works

1. **You push to GitHub**
   ```bash
   git push origin main
   ```

2. **Cloudflare Pages detects the push**
   - Webhook triggers within seconds
   - Fresh build environment spins up

3. **Build process runs**
   ```bash
   npm install        # Install dependencies
   npm run build      # Astro compiles MDX → HTML
   ```

4. **Output deployed to CDN**
   - Contents of `dist/` folder distributed globally
   - Previous version replaced atomically

5. **Site is live**
   - Typically 30-90 seconds from push to live
   - Available at 37-pencils.com

### Build Behavior

- **Drafts excluded**: Files with `draft: true` don't appear in production
- **Images optimized**: Astro processes images in `src/` for performance
- **Search indexed**: Pagefind builds search index at build time
- **Links validated**: Broken wiki-links are handled gracefully

---

## Part 7: Comparison with Traditional CMS

| Feature | Traditional CMS (Joomla) | Git-Based CMS (GitHub + Astro) |
|---------|-------------------------|-------------------------------|
| Content storage | MySQL database | Markdown files in Git |
| Editing interface | Web admin panel | Local text editor + Git |
| Version history | Limited or plugin-based | Complete, built into Git |
| Preview | Often complex | `npm run dev` locally |
| Backup | Database dumps | Distributed by design |
| Performance | Dynamic rendering | Pre-built static files |
| Security | Server vulnerabilities | No server to attack |
| Hosting cost | Server + database | Often free (Cloudflare Pages) |
| Learning curve | Lower for basics | Steeper initially |
| Flexibility | Plugin ecosystem | Full code control |

### Advantages of Git-Based

- **Performance**: Static files served from global CDN
- **Security**: No database or server-side code to exploit
- **Portability**: Content is plain text, never locked in
- **Developer experience**: Use any editor, work offline
- **Version control**: First-class, not an afterthought

### Advantages of Traditional CMS

- **Non-technical editing**: Web interface requires no CLI knowledge
- **Real-time collaboration**: Multiple editors, same interface
- **Dynamic features**: Comments, user accounts, etc. built-in
- **Plugin ecosystems**: Extensive pre-built functionality

---

## Part 8: Tips and Best Practices

### Commit Message Conventions

Good commit messages create a readable history:

```bash
# Adding content
git commit -m "Add seedling: thoughts on digital gardens"
git commit -m "Add evergreen: photography workflow guide"

# Updating content
git commit -m "Update: expand wiki-linking section"
git commit -m "Promote to growing: digital gardens post"

# Site changes
git commit -m "Fix: broken wiki-link in post-slug"
git commit -m "Style: adjust heading typography"
```

### Atomic Commits

Make each commit about one thing:

```bash
# Good: separate concerns
git add src/content/posts/new-post.mdx
git commit -m "Add seedling: new idea"

git add src/components/Header.astro
git commit -m "Style: update header spacing"

# Avoid: mixing unrelated changes
git add .
git commit -m "Add post and fix header and update styles"
```

### Regular Pushes

Don't accumulate many local commits. Push regularly to:

- Trigger deployments
- Back up your work
- Keep history synchronized

### Local Preview Habit

Always preview before publishing:

```bash
npm run dev
# Check your changes at localhost:4321
# Then commit and push
```

---

## Conclusion

Git-based content management represents a paradigm shift from traditional CMS approaches. Instead of a database and admin panel, you have files and version control. Instead of dynamic rendering, you have pre-built static pages.

For a digital garden like 37-pencils, this approach aligns perfectly with the philosophy:

- **Ideas grow over time**: Git history tracks that growth
- **Connections matter**: Wiki-links are just text, portable and permanent
- **Building is part of the joy**: Working with the tools, not against them

The learning curve is real, but the payoff is a fast, secure, infinitely flexible site that you truly own.

---

*This document created for the 37-pencils digital garden project, December 2024.*
