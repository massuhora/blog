# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Build + preview locally via wrangler
npm run deploy       # Build + deploy to Cloudflare Pages
```

## Architecture

**Stack:** Astro v6 (static output) + TypeScript strict + Tailwind CSS v4 (Vite plugin, no tailwind.config.js) + Cloudflare Pages adapter.

**Content:** Blog posts live in `src/content/posts/` as `.md` files. Schema (Zod) requires `title`, `date`, `excerpt`, and optional `image` + `tags`. Posts are loaded via Astro content collections (`src/content.config.ts`).

**Routing:**
- `src/pages/index.astro` — Homepage (latest 5 posts)
- `src/pages/journal.astro` — All posts
- `src/pages/posts/[slug].astro` — Individual post (dynamic, `getStaticPaths`)
- `src/pages/tags/[tag].astro` — Tag-filtered posts
- `src/pages/rss.xml.js` — RSS feed
- `src/pages/about.astro` / `404.astro` — Static pages

**Layout hierarchy:** `BaseLayout.astro` (HTML shell, SEO, nav, footer, dark mode init, Vercel Analytics) wraps all pages; `PostLayout.astro` (article header, featured image, reading time, tags, post navigation) wraps blog posts.

**Styling:** `src/styles/global.css` is the Tailwind entry point. Defines `@layer components` (`.btn-primary`, `.tag`, `.nav-link`, etc.) and `@layer base` (headings, links, code, tables). Dark mode is class-based (`.dark` on `<html>`, stored in `localStorage.theme`). View transitions are fade-only. Fonts: Geist Sans + Geist Mono (variable WOFF2 in `public/fonts/`).

**Images:** Store in `public/images/`, reference in frontmatter as `/images/filename.jpg`. Astro's Sharp service auto-optimizes to WebP (quality 80, responsive sizes 640-2000).

**Key patterns:**
- Path alias `@/*` → `src/*`
- `.astro` components use TypeScript interfaces for props
- No ESLint/Prettier configured; no test framework
- Some inline comments are in German
- `.npmrc` sets `legacy-peer-deps=true` and `node-linker=hoisted`
