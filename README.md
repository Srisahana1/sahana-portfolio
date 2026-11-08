# Sahana — AI Systems Portfolio V3

A static portfolio built with React, TypeScript, Vite, and Tailwind CSS 3. The site uses native scrolling, an owner-provided portrait, and the Obsidian / Electric Aqua / Deep Violet palette.

## Local development

Use Node.js 22 or later:

```sh
npm ci
npm run dev
```

Validation and production build:

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

In Windows PowerShell with execution-policy restrictions, use `npm.cmd` in place of `npm`.

## Experience

- Space Grotesk, Inter, and JetBrains Mono are self-hosted. Their licenses are included under `public/licenses/fonts`.
- The hero photograph is optimized in two WebP sizes; its responsive preload matches the image element.
- All four public GitHub projects include case studies and lazy-loaded SVG architecture walkthroughs with playback, keyboard controls, native touch swiping, and full text alternatives.
- Playback suspends when its diagram or browser tab is hidden. Reduced-motion settings disable decorative motion and the custom cursor.
- Expertise categories, a career timeline, and six verified Medium articles provide the technical and professional content.
- Professional experience contains role titles without employers, clients, dates, or locations.

Public project content and illustrative architecture patterns are explicitly identified. Content sources and verification notes are in `docs`.

## GitHub Pages

The deployment workflow validates and builds `main`, then uploads `dist` through GitHub Actions Pages deployment. Vite uses relative asset paths, so the build supports the repository subpath `/sahana-portfolio/`. Section links use URL fragments and work on refresh without a server router.

No backend, runtime credentials, analytics, or third-party scripts are required. Images and fonts are delivered from the site itself.