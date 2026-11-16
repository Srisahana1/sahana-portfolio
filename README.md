# Sahana — Neural Constellation Portfolio

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

- A fixed, sparse Canvas 2D constellation forms behind the hero. Nearby nodes respond to the pointer with illumination and bounded signal pulses. Its single rendering loop stops offscreen, in hidden tabs, and with reduced motion; touch devices and unavailable Canvas use static SVG artwork.
- The signal-emitter cursor uses a small aqua diamond. Section motifs, project previews, and architecture diagrams share reusable `SignalNode` and `SignalConnection` components.
- Each project preview has three touch-friendly nodes with explanations and arrow-key controls. Card activation transmits a finite signal on hover or keyboard focus; no continuous project animation is needed.
- Space Grotesk, Inter, and JetBrains Mono are self-hosted. Their licenses are included under `public/licenses/fonts`.
- The original hero photograph uses a compact 24 KB WebP asset. Its 3:4 frame is 160px wide on desktop and 120px on phones, with configurable `--portrait-position` and a matching preload.
- All four public GitHub projects include case studies and lazy-loaded SVG architecture walkthroughs with playback, keyboard controls, native touch swiping, and full text alternatives.
- Playback suspends when its diagram or browser tab is hidden. Reduced-motion settings disable decorative motion and the custom cursor.
- Expertise categories include selectable technology notes, alongside an anonymized career timeline.
- Medium appears only as a profile action alongside GitHub and LinkedIn in the contact area. No articles, thumbnails, previews, or article requests are included.
- Card highlights update once per animation frame without React renders; cursor motion is disabled on touch and responds to changes in reduced-motion settings.
- Professional experience contains role titles without employers, clients, dates, or locations.

Public project content and illustrative architecture patterns are explicitly identified. Content sources and verification notes are in `docs`.

The visual implementation is in `src/NeuralConstellation.tsx`, `src/Signals.tsx`, `src/ProjectNetworkPreview.tsx`, and `src/signals.css`. No animation library or WebGL dependency is required.

## GitHub Pages

The deployment workflow validates and builds `main`, then uploads `dist` through GitHub Actions Pages deployment. Vite uses relative asset paths, so the build supports the repository subpath `/sahana-portfolio/`. Section links use URL fragments and work on refresh without a server router.

No backend, runtime credentials, analytics, or third-party scripts are required. Images and fonts are delivered from the site itself.
