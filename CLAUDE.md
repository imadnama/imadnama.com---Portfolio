# Imad Nama — Portfolio

A personal portfolio landing page for Imad Nama, Software Engineering Student.
Dark, motion-driven single page built as a small, well-structured React app.

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

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check and build for production
npm run preview    # preview the production build
npm run lint       # run ESLint
npm run format     # format all files with Prettier
```

## Project Structure

```
.
├── public/                 # static assets served as-is (favicon, images)
├── src/
│   ├── main.tsx            # app entry — mounts React into #root
│   ├── App.tsx             # composes the page sections in order
│   ├── index.css           # global reset, theme tokens, Tailwind layers
│   ├── components/         # small, reusable UI pieces
│   ├── sections/           # top-level page sections
│   └── data/               # typed content (services, projects) kept out of JSX
├── index.html              # HTML shell (fonts, meta, page title)
└── <config files>          # Vite, TypeScript, Tailwind, ESLint, Prettier
```

The page renders these sections in order: **Hero → Marquee → About →
Services → Projects**.

## Conventions

**Code**

- TypeScript strict mode; every component has typed props.
- Content (services, projects) lives in `src/data/` as typed objects, kept
  separate from the markup that renders it.
- Prefer semantic HTML and real accessibility (meaningful `alt` text, `aria`
  labels, keyboard-focusable interactive elements).
- Formatting and lint are enforced — run `npm run lint` and
  `npm run format` before committing.

**Assets**

- All images are stored locally under `public/`. No external/hotlinked image
  URLs — assets must be self-hosted so the site never depends on third parties.

**Commits**

- [Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`,
  `chore`, `refactor`, `docs`, `style`.
- Keep commits atomic — one logical change per commit, with a clear summary
  and a body explaining the what and why.

## Styling Notes

- Background is `#0C0C0C`; primary light text is `#D7E2EA`.
- Large headings use the `.hero-heading` gradient-text utility defined in
  `src/index.css`.
- Typography scales fluidly with `clamp()` and Tailwind's responsive
  breakpoints (`sm` 640px, `md` 768px, `lg` 1024px).
