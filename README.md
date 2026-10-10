# SK Risk & Business Consulting Website

Official website of **SK Risk & Business Consulting (SMC-Private) Limited**, Rawalpindi, Pakistan.

## Tech stack

| Layer     | Technology                                        |
| --------- | ------------------------------------------------- |
| Framework | Next.js (App Router) + TypeScript                 |
| Styling   | Tailwind CSS                                      |
| Hosting   | Cloudflare Workers (via `@opennextjs/cloudflare`) |
| Database  | Cloudflare D1                                     |
| Storage   | Cloudflare R2                                     |

## Requirements

- Node.js 20.9 or later (24 recommended, see `.nvmrc`)
- npm

## Getting started

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

The site runs at <http://localhost:3000>.

## Scripts

| Command              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`        | Start the local development server                         |
| `npm run images`     | Optimize images (runs automatically before dev and build)  |
| `npm run build`      | Production build (Next.js)                                 |
| `npm run check`      | Type-check, lint and formatting check                      |
| `npm run format`     | Format all files with Prettier                             |
| `npm run preview`    | Build for Cloudflare and preview locally (Workers runtime) |
| `npm run deploy`     | Build and deploy to Cloudflare                             |
| `npm run cf-typegen` | Regenerate Cloudflare binding types                        |

## Project structure

```
src/
  app/          Routes, layouts, global styles and icons
  assets/       Source images (optimized at build time)
  components/   UI, layout, motion and page-section components
  config/       Site configuration, navigation and image widths
  content/      Page content and the generated image manifest
  lib/          Small utilities and the image loader
scripts/        Build scripts (image optimization)
public/         Static assets
wrangler.jsonc  Cloudflare Workers configuration (D1, R2, assets)
```

## Configuration

Company name, taglines and contact details live in `src/config/site.ts`.
Update them there and the change applies across the whole site.

## Images

Put source images in `src/assets/images` (photos) or `src/assets/brand` (logos).
`npm run images` writes WebP versions for every screen width to `public/images`
and updates `src/content/images.generated.ts`, which components import as `siteImages`.
Images are never transformed at runtime.
