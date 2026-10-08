# SK Risk & Business Consulting — Website

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

- Node.js 20.9 or later (24 recommended — see `.nvmrc`)
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
| `npm run build`      | Production build (Next.js)                                 |
| `npm run check`      | Type-check, lint and formatting check                      |
| `npm run format`     | Format all files with Prettier                             |
| `npm run preview`    | Build for Cloudflare and preview locally (Workers runtime) |
| `npm run deploy`     | Build and deploy to Cloudflare                             |
| `npm run cf-typegen` | Regenerate Cloudflare binding types                        |

## Project structure

```
src/
  app/          Routes, layouts and global styles
  config/       Site-wide configuration (company and contact details)
public/         Static assets
wrangler.jsonc  Cloudflare Workers configuration (D1, R2, assets)
```

## Configuration

Company name, taglines and contact details live in `src/config/site.ts`.
Update them there and the change applies across the whole site.
