# Personal Blog

A minimalist personal blog built with [Astro](https://astro.build/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- **Clean Minimalist Design**: Elegant layout focused on readability and content
- **Full Dark/Light Mode**: Complete support for both modes with smooth transitions
- **Responsive Design**: Optimized for all device sizes
- **Content Collections**: Organized content using Astro's content collections
- **Markdown/MDX Support**: Write content in Markdown with optional JSX support
- **Image Optimization**: Automatic image processing and optimization
- **View Transitions**: Smooth page transitions with Astro's view transitions API
- **Tagging System**: Categorize and filter posts using tags
- **Code Syntax Highlighting**: Beautiful syntax highlighting for code blocks
- **SEO Optimized**: Built-in meta tags and structured data (JSON-LD)
- **Type-Safe**: Fully typed with TypeScript
- **Reading Time**: Automatic calculation of estimated reading time
- **Accessible**: Built with accessibility in mind
- **Fast Performance**: Optimized for web vitals with minimal JavaScript
- **RSS Feed**: Auto-generated RSS feed

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) to see the result.

## Adding Content

### Creating a New Blog Post

1. Create a new `.md` or `.mdx` file in the `src/content/posts/` directory
2. Add frontmatter metadata:

```md
---
title: My New Blog Post
date: 2026-04-19
excerpt: A short description of the blog post
tags: [tag1, tag2]
---

Here goes the content of the blog post.

## A Heading

More text and content...
```

### Images

For images in your blog posts:

1. Place images in the `public/images/` directory
2. Reference them in your frontmatter and content using the path `/images/my-image.jpg`

## Project Structure

```
├── public/               # Static assets
├── src/
│   ├── assets/           # Optimized assets (images, etc.)
│   ├── components/       # Reusable components
│   ├── content/          # Content directory (using Astro Content Collections)
│   │   └── posts/        # Blog posts (Markdown/MDX)
│   ├── layouts/          # Astro layouts
│   ├── pages/            # Astro pages
│   ├── styles/           # Stylesheets
│   └── utils/            # Helper functions and utilities
└── astro.config.mjs      # Astro configuration
```

## Scripts

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `npm run dev`     | Starts local dev server at `localhost:4321`      |
| `npm run build`   | Build your production site to `./dist/`          |
| `npm run preview` | Preview your build locally, before deploying     |

## Deployment

This project can be deployed on any platform that supports Astro:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## License

MIT
