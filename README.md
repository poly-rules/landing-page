# poly-landing

Marketing and landing site for [Poly](https://poly.dev) — built with Next.js 16, Tailwind CSS v4, and TypeScript.

## Requirements

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). The page hot-reloads as you edit files.

## Build

```bash
npm run build
```

Type-checks and produces an optimized production build in `.next/`.

## Preview production build

```bash
npm run build && npm run start
```

## Lint

```bash
npm run lint
```

---

## Blog

Blog posts are plain Markdown files in `content/posts/`. The listing page at `/blog` and individual article pages at `/blog/<slug>` are generated automatically from those files.

### Creating a new post

1. Create a file in `content/posts/` named with a URL-friendly slug:

   ```
   content/posts/my-new-post.md
   ```

2. Add frontmatter at the top of the file:

   ```md
   ---
   title: "Your Post Title"
   excerpt: "One or two sentences shown in the listing and used as the meta description."
   date: "2026-04-15"
   author: "Author Name"
   ---

   Your content here. Standard Markdown is supported: **bold**, _italic_,
   `inline code`, fenced code blocks, headings, lists, links, and horizontal rules.
   ```

3. Save the file. The post appears immediately in dev mode; for production, run `npm run build`.

### Frontmatter fields

| Field     | Required | Description                                      |
|-----------|----------|--------------------------------------------------|
| `title`   | yes      | Post title shown in the listing and `<h1>`       |
| `excerpt` | yes      | Short summary shown in the listing and meta tags |
| `date`    | yes      | ISO date (`YYYY-MM-DD`), used for sort order     |
| `author`  | no       | Displayed next to the date                       |

Posts are sorted by `date` descending — newest first.

### File structure

```
content/
  posts/
    introducing-poly.md   # example post
    your-new-post.md

lib/
  posts.ts                 # getAllPosts() and getPost(slug) utilities

app/
  blog/
    page.tsx               # listing  →  /blog
    [slug]/
      page.tsx             # article  →  /blog/<slug>
```
