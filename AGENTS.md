# AGENTS.md — astro-brook

This file contains project-specific context for AI coding agents. The reader is assumed to know nothing about this project.

---

## Project Overview

**astro-brook** is a minimalist personal blog built with [Astro](https://astro.build/), TypeScript, and Tailwind CSS v4. It is a static site owned by Massu Hora. The design prioritizes readability, performance, and accessibility with a clean typography-first approach.

Key features:
- Static site generation (`output: 'static'`)
- Content collections for blog posts (Markdown/MDX)
- Full dark/light mode with smooth transitions
- Astro View Transitions (fade-only animation)
- Automatic image optimization via Sharp (WebP preferred)
- Auto-generated RSS feed and sitemap
- SEO optimized with Open Graph, Twitter Cards, and JSON-LD structured data
- Reading time estimation
- Tag-based post categorization
- Vercel Analytics integration

---

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro | ^6.1.7 |
| Language | TypeScript | ^5.3.3 (strict mode) |
| Styling | Tailwind CSS | ^4.2.2 (via `@tailwindcss/vite`) |
| Fonts | Geist Sans, Geist Mono | Variable WOFF2 |
| Date formatting | date-fns | ^4.1.0 |
| Image optimization | Sharp (built-in Astro service) | — |
| Analytics | Vercel Analytics | ^1.6.1 |

Astro integrations:
- `@astrojs/mdx` — MDX support
- `@astrojs/rss` — RSS feed generation
- `@astrojs/sitemap` — XML sitemap generation

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build production site to ./dist/
npm run build

# Preview production build locally
npm run preview
```

**Important configuration notes:**
- `.npmrc` sets `legacy-peer-deps=true` and `node-linker=hoisted`.
- The project uses ES modules (`"type": "module"` in `package.json`).
- The `site` URL in `astro.config.mjs` is currently set to a placeholder (`https://your-domain.com`). Update this before deploying.

---

## Project Structure

```
├── public/                    # Static assets served as-is
│   ├── fonts/                 # Geist Sans & Geist Mono variable fonts
│   ├── images/                # Blog post images
│   └── favicon.svg
├── src/
│   ├── assets/images/         # Additional image assets
│   ├── components/            # Reusable Astro components
│   │   ├── ui/                # UI primitives (DarkModeToggle)
│   │   ├── PostCard.astro     # Post list item (text-only layout)
│   │   ├── PostCardWithThumbnail.astro  # Post list item (thumbnail layout)
│   │   ├── PostList.astro     # Wrapper for PostCard
│   │   ├── PostListWithThumbnails.astro # Wrapper for PostCardWithThumbnail
│   │   └── PostNavigation.astro  # Prev/Next links at bottom of posts
│   ├── content/posts/         # Blog posts in Markdown/MDX
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Root layout (HTML shell, SEO, nav, footer)
│   │   └── PostLayout.astro   # Article layout (reading time, tags, feature image)
│   ├── pages/
│   │   ├── index.astro        # Homepage (hero + latest 5 posts)
│   │   ├── journal.astro      # All posts page
│   │   ├── about.astro        # About page
│   │   ├── 404.astro          # Not found page
│   │   ├── rss.xml.js         # RSS feed endpoint
│   │   ├── posts/[slug].astro # Dynamic post pages (getStaticPaths)
│   │   └── tags/[tag].astro   # Tag filter pages (getStaticPaths)
│   ├── styles/global.css      # Tailwind entry + component classes + base styles
│   ├── utils/
│   │   ├── date.js            # Date formatting helper (date-fns)
│   │   └── optimizeImagePath.ts  # Image path normalization utility
│   ├── content.config.ts      # Content collection schema (Zod)
│   └── env.d.ts               # Astro type declarations
├── astro.config.mjs           # Astro configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

---

## Code Organization and Conventions

### Module System
- All files use ES modules (`import`/`export`).
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.json`).

### Content Collections
Blog posts live in `src/content/posts/` as `.md` or `.mdx` files. The schema is defined in `src/content.config.ts` using Zod:

```ts
{
  title: z.string(),
  date: z.date(),
  excerpt: z.string(),
  image: z.string().optional(),   // Featured image path
  tags: z.array(z.string()).default([]),
}
```

To add a new post, create a `.md` or `.mdx` file in `src/content/posts/` with the frontmatter above.

### Component Patterns
- Components are `.astro` files.
- Props are typed with TypeScript interfaces at the top of the file.
- Slots are used for content injection (especially in layouts).
- Utilities are plain `.js` or `.ts` files in `src/utils/`.

### Styling Conventions
- Tailwind CSS v4 is used via the Vite plugin (`@tailwindcss/vite`).
- Global styles are in `src/styles/global.css`.
- The CSS file defines:
  - `@layer components` for reusable component classes (`.btn-primary`, `.tag`, `.nav-link`, `.feature-image`, `.post-nav-link`, etc.)
  - `@layer base` for element-level base styles (headings, links, lists, tables, code, etc.)
  - Custom `@font-face` declarations for Geist fonts
  - View Transition animations (fade-only)
- Dark mode is class-based: the `.dark` class on `<html>` toggles dark styles.
- Tailwind's `@variant dark` is configured with `&:where(.dark, .dark *)`.

### Dark Mode Implementation
Dark mode state is stored in `localStorage.theme` and synced to the `document.documentElement.classList` as `"dark"`. The initialization script is inline in `BaseLayout.astro` (runs before render to prevent flash). It re-applies after Astro view transitions via the `astro:after-swap` event.

### Accessibility Conventions
- ARIA labels are used extensively on interactive elements.
- Focus rings use `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`.
- Semantic HTML (`<article>`, `<nav>`, `<time>`, `<section>` with `aria-labelledby`).
- Mobile navigation uses `aria-expanded` and `aria-label`.

### Image Handling
- Images for posts are placed in `public/images/` and referenced in frontmatter as `/images/filename.jpg`.
- Astro's built-in Sharp service optimizes images to WebP at quality 80 with responsive sizes: `[640, 960, 1280, 1600, 2000]`.
- The `optimizeImagePath` utility ensures path consistency but currently returns the path as-is (Astro handles optimization at build time for `<img>` tags).

---

## Testing Strategy

There is **no testing framework** currently configured in this project. There are no unit tests, integration tests, or end-to-end tests.

If you add tests, prefer placing them alongside the files they test or in a top-level `tests/` directory. The project uses Node.js ES modules, so any test runner must support ESM.

---

## Deployment

The build output is a static site in `./dist/`. It can be deployed to any static hosting platform:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Before deploying, update `site: 'https://your-domain.com'` in `astro.config.mjs` to the actual production domain. This is required for correct canonical URLs, Open Graph images, RSS links, and the sitemap.

Vercel Analytics is already integrated (`@vercel/analytics/astro`) and will activate automatically when deployed to Vercel.

---

## Security Considerations

- This is a static site with no server-side code or API routes (except the static RSS endpoint).
- No secrets or credentials are stored in the repository.
- External links (X/Twitter, GitHub) use `target="_blank"` with `rel="noopener noreferrer"`.
- User-generated content is limited to Markdown/MDX blog posts authored by the site owner.

---

## Notes for Agents

- Some inline comments in the codebase are written in **German** (e.g., `// Sortiere Posts nach Datum`, `// Strukturierte Daten (JSON-LD) für bessere SEO`, `Keine Beiträge gefunden`). This does not affect functionality.
- The project does not use ESLint, Prettier, or any other linting/formatting tool. If you introduce one, configure it for Astro + TypeScript.
- Tailwind CSS v4 uses a different configuration model than v3. There is no `tailwind.config.js`; configuration is done via CSS (in `global.css`) and the Vite plugin.
- View transitions are fade-only. Custom transition animations are defined in `global.css` using `::view-transition-old(root)` and `::view-transition-new(root)`.
- The `astro:after-swap` event is used to re-initialize mobile menu and dark mode toggle listeners after page transitions.
