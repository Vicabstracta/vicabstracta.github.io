# AGENTS.md — Archivo de Miradas (Vicabstracta)

A blog and essay site about visual arts, built with Astro 5.3 and Tailwind CSS. Content is in Spanish; some posts are bilingual (Spanish/English).

## Prerequisites

- **Node.js** ≥ 22
- **pnpm** 9.x (managed via Corepack)

```bash
corepack enable
corepack enable pnpm
pnpm install
```

## Build & Dev Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the Astro dev server |
| `pnpm build` | Production build (also builds Pagefind search index) |
| `pnpm preview` | Preview a production build locally |

CI deploys to GitHub Pages from the **`dev`** branch via `.github/workflows/astro.yml`.

## Project Structure

```
├── astro.config.mjs        # Astro config (integrations, remark/rehype plugins)
├── yukina.config.ts        # Site-wide configuration (title, locale, banners, navigation)
├── tailwind.config.mjs     # Tailwind CSS + @tailwindcss/typography
├── tsconfig.json           # Extends astro/tsconfigs/strict
├── .prettierrc.mjs         # Prettier with astro + tailwind plugins
│
├── src/
│   ├── components/         # Astro (.astro) and Svelte (.svelte) components
│   │   ├── controllers/    # Pagination controller
│   │   ├── misc/           # Archive helpers (year title, post card)
│   │   └── widgets/        # Reusable small components (social icons)
│   ├── layouts/            # Astro layout components
│   │   ├── BaseLayout.astro
│   │   ├── MainLayout.astro
│   │   ├── PostLayout.astro
│   │   ├── ChipLayout.astro
│   │   └── PostArchiveLayout.astro
│   ├── pages/              # Astro file-based routes
│   │   ├── [...page].astro         # Paginated index
│   │   ├── posts/[...slug].astro   # Individual post page
│   │   ├── tags/[tag].astro        # Tag filter page
│   │   ├── categories/[category].astro
│   │   ├── archive.astro           # Post archive
│   │   ├── about.astro
│   │   ├── rss.xml.ts              # RSS feed generator
│   │   └── robots.txt.ts
│   ├── contents/
│   │   ├── posts/            # Blog posts — Markdown with YAML frontmatter
│   │   └── specs/            # Specs collection (schema-less)
│   ├── content.config.ts     # Content collection definitions & schemas
│   ├── locales/              # i18n translation files (en, es, zh_cn)
│   ├── styles/               # Custom CSS (markdown rendering, transitions, etc.)
│   ├── lib/                  # Utility libraries (slug generation)
│   ├── utils/                # Helpers (date, content, cover images, hashing)
│   └── plugins/              # Custom remark plugins (reading-time, TOC)
│
├── public/                   # Static assets (images, favicons, blog images)
│   └── blog/                 # Per-post image folders
```

## Content Model — Posts

Posts live in `src/contents/posts/*.md` and are managed via the Astro **posts** content collection.

### Frontmatter fields

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Full post title |
| `published` | date | ✅ | Publication date (used for sorting) |
| `draft` | boolean | — | If `true`, excluded from production builds |
| `description` | string | — | SEO/social description |
| `tags` | string[] | — | Tags displayed as filterable chips |
| `category` | string | — | Primary category (sidebar / filter group) |
| `author` | string | — | Author name |
| `cover` | string | — | Cover image path (`/blog/...`) |
| `sourceLink` | string | — | Original publication URL (for republished content) |
| `titleShortened` | string | — | Shortened title for cards/sidebar |

The collection schema is defined in `src/content.config.ts`. Posts are loaded via `glob({ pattern: "**/*.md", base: "src/contents/posts" })`.

### Slug mode

Configured as `HASH` in `yukina.config.ts`, meaning URLs use hashed slugs (not raw file names) for stability.

## Architecture Notes

- **Astro** renders pages statically; components are islands-based where interactivity is needed.
- **Svelte** is used for the search bar component (`SearchBar.svelte`, `MobileSearchBar.svelte`).
- **Tailwind CSS v3** handles utility styling, extended with `@tailwindcss/typography` for prose content.
- **SWUP** (via `@swup/astro`) enables smooth page transitions between client-side navigations.
- **Pagefind** powers full-text search across posts; the index is built during `pnpm build`.
- **Astro Icon** (`astro-icon`) provides SVG icon integration.

## Markdown Processing Pipeline

Posts go through a combined remark + rehype pipeline:

| Plugin | Purpose |
|---|---|
| `remarkReadingTime` (custom) | Injects estimated reading time into frontmatter |
| `remarkMath` / `rehypeKatex` | Renders LaTeX math equations via KaTeX |
| `rehypeSlug` | Adds `id` attributes to headings for anchor links |
| `rehypeAutolinkHeadings` | Prepends click-to-copy links to every heading |

Syntax highlighting uses the **github-dark-default** Shiki theme.

## Styling Conventions

- All Tailwind utility classes are used directly in templates.
- Custom styles live in `src/styles/`:
  - `markdown.css` — prose typography overrides for post content
  - `animations.css`, `transitions.css` — SWUP and page transitions
  - `scrollbar.css`, `searchbar.css` — UI component styling

Prettier is configured with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`. Run `pnpm exec prettier --write .` to format.

## Configuration

### Site config (`yukina.config.ts`)

This central config controls:
- Site title, description, locale
- Navigation structure (home, archive, about)
- Author info and avatar URL
- Banner/carousel images (`public/`)
- Sidebar tag/category chip counts
- License metadata

### Astro config (`astro.config.mjs`)

Integrations loaded in order: Tailwind → Svelte → Astro Icon → SWUP → Sitemap → Pagefind. All remark/rehype plugins are registered here.

## Deployment

Pushing to the **`dev`** branch triggers a GitHub Actions workflow (`.github/workflows/astro.yml`) that:
1. Checks out code on Node 22 via pnpm
2. Runs `pnpm install && pnpm build`
3. Uploads `dist/` as a GitHub Pages artifact

To deploy manually: trigger **Actions → "Deploy Astro site to Pages" → Run workflow**.

## Common Tasks

### Adding a new post

1. Create `src/contents/posts/<file-name>.md`.
2. Add YAML frontmatter (title, published, description, tags, category, etc.).
3. Write Markdown content using standard syntax + KaTeX for equations.
4. Place cover images under `public/blog/apuntes/<post-slug>/`.

### Adding a new tag or category

Tags and categories are free-form strings in post frontmatter — no separate configuration needed. They auto-appear as filterable chips when referenced.

### Switching locale / adding translations

Translations live in `src/locales/languages/*.ts`. Add a new file (e.g., `fr.ts`) following the existing pattern, then update `yukina.config.ts` locale field. Keys are shared via `src/locales/keys.ts`.
