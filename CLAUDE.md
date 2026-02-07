# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aqua-Life is a multilingual (English/Russian) knowledge base for freshwater aquarium fish species, built with Next.js 15 App Router. It renders 300+ fish species pages from MDX content with structured JSON metadata.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000, redirects to /en)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals)
npm run format       # Prettier on src/
npm install          # Also runs postinstall: .scripts/copy-content.js
```

No test framework is configured in the main app. Tests exist only in the `posts/` subpackage (handbook-freshwater-fish).

## Architecture

### Routing

All routes are under `src/app/[locale]/` where locale is `en` or `ru`. Two route groups organize layouts:
- `(landings)/` — homepage with Hero + paginated posts feed
- `(pages)/` — species detail pages (`[slug]/`), about, handbook, terms-of-use

The root `/` permanently redirects to `/en` via `next.config.js`.

### Content System

Fish species content lives in `posts/content/[species-slug]/` (installed via the `handbook-freshwater-fish` npm package from GitHub, copied by `postinstall` script):
- `_info.json` — structured metadata (scientific name, family, traits, tank requirements)
- `en.mdx` / `ru.mdx` — MDX content with YAML frontmatter (title, aliases, excerpt, optional draft flag)
- `_img.webp` — species image

Content is read server-side via utilities in `src/utils/` (`fetchPosts.ts`, `fetchPost.ts`). Frontmatter is parsed with `gray-matter`.

### Component Organization

- `src/ui/` — atomic UI components (Button, Alert, Dialog, LinkBtn)
- `src/components/` — feature components (PostCard, Section, SimpleMDXPage)
- `src/containers/` — layout wrappers (AppHeader, AppFooter, Search)
- Route-specific `_components/` and `_containers/` folders inside route directories

Each component folder: `ComponentName.tsx` + `styles.module.scss` + `index.tsx` (re-export).

### Styling

SCSS Modules (`*.module.scss`) for component styles. Global theme with CSS custom properties supporting light/dark mode via `data-theme` attribute. Variables and mixins in `src/styles/` (`_colors.scss`, `_theme.scss`, `_mixins.scss`).

### Internationalization

Dictionary-based i18n with JSON files in `src/i18n/dictionaries/` organized by section. Server-side loading via `getDictionary()`, client-side access via `LocaleProvider` context and `t()` helper. Russian is the primary content language.

### API Routes

- `GET /api/v1/posts?page=&size=&locale=` — paginated posts list
- `GET /api/v1/search?locale=` — all posts for client-side search

### Search & Comments

Algolia InstantSearch for search functionality (requires `NEXT_PUBLIC_ALGOLIA_SEARCH_APP_ID` and `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` in `.env.local`). Disqus for species discussion pages at `[slug]/discussion`.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).
