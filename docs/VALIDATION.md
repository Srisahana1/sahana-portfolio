# Neural Constellation validation

November 15, 2026. The existing React/Vite project is retained. The approved palette, 160px/120px portrait, four GitHub projects, contact links, Medium profile-only policy, relative Vite base, and Pages workflow are preserved. No dependencies were added.

## Implementation

- `NeuralConstellation.tsx`: a deterministic 16-node, 20-connection Canvas 2D network. One requestAnimationFrame loop draws stationary geometry, subtle luminance changes, and at most four concurrent signal pulses. Node proximity smoothly illuminates adjacent connections. Device pixel ratio is capped at 1.5.
- Touch devices use static SVG without creating a Canvas context or scheduling Canvas frames. Reduced motion and unavailable Canvas also have a static SVG fallback. The hero remains interactive throughout its approximately one-second entrance sequence.
- `Signals.tsx`: shared SVG node/connection components and a visibility contract. Finite card and section signals stop offscreen and when document visibility or motion preference disables them.
- `ProjectNetworkPreview.tsx`: three representative, source-checked stages per project, with native buttons, pressed states, explanations, arrow keys, Home, and End. Detailed existing project walkthroughs remain separate.
- The cursor core is an aqua diamond and tracks pointer input directly. The outer ring settles quickly; native pointers remain available in top-layer dialogs and for text selection.
- Section headings reveal through localized masks rather than repeated whole-section fades. SVG architecture diagrams share the same node and connection styling, with their existing playback, touch scrolling, and text alternatives.

## Completed checks

- ESLint, TypeScript, and Vite production build pass. No changes to package files, build configuration, or GitHub Actions are required.
- The production build is served under `/sahana-portfolio/` for local verification.
- Desktop Chrome (1440 × 1000) and phone emulation (390 × 844): all 12 project-preview nodes, keyboard selection, all four project dialogs, architecture stages and playback/pause, text alternatives, focus restoration, Escape, project filters, expertise categories, and email copying pass.
- Native horizontal touch swipes and vertical scrolling over architecture diagrams pass. Navigation and URL-fragment refresh work, with no broken internal anchors.
- No horizontal page overflow at 320, 375, 620, 768, 850, 1024, 1280, or 1920px.
- Axe WCAG A/AA automated checks find no violations in tested desktop/phone pages and project dialogs. This is not a full accessibility conformance assessment.
- Instrumented Canvas draw counts stop increasing while offscreen, with reduced motion, and during a simulated hidden-document visibility event. Pointer proximity selects the expected node. The high-DPI Canvas respects the 1.5 cap.
- Static artwork remains visible with touch emulation and with Canvas `getContext` forced unavailable. Runtime reduced-motion changes stop rendering and restore the static artwork.
- Screenshots reviewed: desktop/phone hero, project previews, architecture dialogs, full-page layout, contact links, and active hero-node illumination. Browser tests use emulation, not physical mobile hardware.

## Local performance observations

A three-second, unthrottled desktop Chrome sample after the hero settled recorded 181 Canvas animation callbacks. Median callback duration was 0.2ms and the 95th percentile was 0.7ms. Median frame interval was 16.7ms, with a 17ms 95th percentile. Callback timing measures JavaScript work, not total GPU/compositor cost. These observations are specific to this local machine and are not a frame-rate guarantee for other devices.

The broader local regression probe recorded LCP of 1.224s on desktop and 1.092s in phone emulation; CLS was approximately 0.000123 and 0 respectively. Desktop recorded one 92ms initial-load long task; phone emulation recorded none. Both made zero third-party resource requests. These are single local runs without network/CPU throttling, not field Core Web Vitals or Lighthouse scores.

The project architecture code remains a separate approximately 2.98 KB gzip chunk, fetched on first project open. Portrait and font assets remain unchanged. Publishing is verified separately by GitHub Actions and public-site browser smoke tests.
