# Imad Nama — Portfolio

A dark, motion-driven personal portfolio landing page for **Imad Nama**,
Software Engineering Student (Cybersecurity Track). Built as a small, strongly
typed React application with a focus on clean structure and accessibility.

## Features

- **Hero** with an oversized gradient name heading and a portrait framed by a
  soft spotlight backdrop.
- **Tech-stack marquee** — two rows that scroll in opposite directions with the
  page, backed by an accessible skills list for screen readers.
- **About** section with a character-by-character scroll reveal and decorative
  developer glyphs (all local SVG).
- **What I Do** — capability areas presented as a numbered list.
- **Projects** — sticky cards that scale and stack on scroll, each linking to
  its repository.
- Fully responsive with fluid `clamp()` typography, from mobile to ultra-wide.

## Tech Stack

| Concern       | Choice                                |
| ------------- | ------------------------------------- |
| Build tool    | Vite 5                                |
| UI            | React 18 + TypeScript (strict)        |
| Styling       | Tailwind CSS 3                        |
| Animation     | Framer Motion                         |
| Icons         | Lucide React                          |
| Font          | Kanit (Google Fonts, weights 300–900) |
| Lint / Format | ESLint 9 (flat config) + Prettier     |

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build
npm run preview
```

### Scripts

| Script                 | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the Vite dev server           |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Serve the production build locally  |
| `npm run lint`         | Run ESLint                          |
| `npm run format`       | Format the codebase with Prettier   |
| `npm run format:check` | Verify formatting without writing   |

## Project Structure

```
public/                 # static assets (favicon, portrait, decor, screenshots)
src/
├── main.tsx            # app entry — mounts React into #root
├── App.tsx             # composes the page sections in order
├── index.css           # global reset, theme, Tailwind layers
├── components/         # reusable UI + animation pieces
├── sections/           # Hero, Marquee, About, WhatIDo, Projects
└── data/               # typed content (technologies, capabilities, projects)
```

Content is intentionally separated from markup: technologies, capability areas,
and projects live as typed data in `src/data/`, so copy can be edited without
touching component code.

## Customization

- **Projects:** edit `src/data/projects.ts`. Add a `link` to show the "Live
  Project" button, and fill the `images` slots with paths under `public/` to
  replace the placeholders with real screenshots.
- **Skills marquee:** edit `src/data/technologies.ts`.
- **Capabilities:** edit `src/data/capabilities.ts`.
- **Portrait:** replace `public/portrait.svg` with a real photo.

## Accessibility

- Decorative images use empty `alt` text and `aria-hidden`.
- The scrolling marquee is hidden from assistive tech; a visually hidden list
  exposes the real skill set.
- The per-character animated bio carries an `aria-label` with the full text.
- Interactive elements are real links and are keyboard-focusable.

## Known Issues

- `npm audit` reports a **development-only** advisory in esbuild (a transitive
  dependency of Vite 5), which allows a website to read dev-server responses
  while `npm run dev` is running. It does **not** affect production builds. The
  only available remediation is a breaking major upgrade of Vite, so it is
  tracked rather than force-applied.
