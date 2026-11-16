# Sahana — Liquid Intelligence Portfolio

A static portfolio built with React, TypeScript, Vite, and Tailwind CSS 3. Liquid Intelligence combines Obsidian (`#0D1014`), Dark Titanium (`#1B2329`), Liquid Copper (`#DFA878`), Glacial Mint (`#A5F3D1`), Warm Pearl (`#F2F0EB`), and Steel Gray (`#A9B2B9`). The site uses native scrolling and an owner-provided portrait.

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

- A sparse Liquid Intelligence network forms behind the hero: curved copper connections carry bounded mint signals. The Canvas renderer reads the CSS palette on resize. Its single loop stops offscreen, in hidden tabs, and with reduced motion; touch devices and unavailable Canvas use static SVG artwork.
- The custom copper diamond cursor turns mint on interactive elements. A custom Liquid Intelligence mark, metallic heading treatment, and asymmetric titanium cards complete the visual identity.
- Section motifs, project previews, and architecture diagrams share reusable `SignalNode` and `SignalConnection` components. Native Web Animations replay finite mint pulses on section entry, hover, focus, and taps, including repeated taps on the same node. Signals cancel when hidden, offscreen, or disabled by motion preferences.
- Each project preview has three touch-friendly nodes with explanations and arrow-key controls. Node activation sends signals through the relevant connections; no continuous project animation is needed.
- Space Grotesk, Inter, and JetBrains Mono are self-hosted. Their licenses are included under `public/licenses/fonts`.
- The original hero photograph uses a compact 24 KB WebP asset. Its 3:4 frame is 160px wide on desktop and 120px on phones, with configurable `--portrait-position` and a matching preload.
- All four public GitHub projects include case studies and lazy-loaded SVG architecture walkthroughs with playback, keyboard controls, native touch swiping, and full text alternatives.
- Playback suspends when its diagram or browser tab is hidden. Reduced-motion settings disable decorative motion and the custom cursor.
- Expertise categories include selectable technology notes, alongside an anonymized career timeline.
- Medium appears only as a profile action alongside GitHub and LinkedIn in the contact area. No articles, thumbnails, previews, or article requests are included.
- Card highlights update once per animation frame without React renders; cursor motion is disabled on touch and responds to changes in reduced-motion settings.
- Professional experience contains role titles without employers, clients, dates, or locations.

Public project content and illustrative architecture patterns are explicitly identified. Content sources and verification notes are in `docs`.

The visual implementation is in `src/NeuralConstellation.tsx`, `src/liquidGeometry.ts`, `src/Signals.tsx`, `src/ProjectNetworkPreview.tsx`, and `src/signals.css`. Colors are centralized in `src/portfolio.css` with matching Tailwind aliases. No animation library or WebGL dependency is required.

## GitHub Pages

The deployment workflow validates and builds `main`, then uploads `dist` through GitHub Actions Pages deployment. Vite uses relative asset paths, so the build supports the repository subpath `/sahana-portfolio/`. Section links use URL fragments and work on refresh without a server router.

No backend, runtime credentials, analytics, or third-party scripts are required. Images and fonts are delivered from the site itself.
