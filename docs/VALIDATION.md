# Liquid Intelligence validation

November 15, 2026. The existing React/TypeScript/Vite/Tailwind 3 application is retained. No dependencies were added. The four real GitHub projects, their descriptions and links, anonymized experience, approved contact details, single Medium profile action, photograph, Vite base, and Pages workflow remain intact.

## Visual identity

The runtime CSS tokens and browser theme metadata were checked against the requested palette:

| Role | Color |
| --- | --- |
| Obsidian background | `#0D1014` |
| Dark Titanium surfaces | `#1B2329` |
| Liquid Copper accent | `#DFA878` |
| Glacial Mint activation | `#A5F3D1` |
| Warm Pearl text | `#F2F0EB` |
| Steel Gray supporting text | `#A9B2B9` |

Previous theme tokens and color literals are absent from the application source and Tailwind configuration. Copper defines structural outlines, static connections, the default diamond cursor, and metallic highlights. Mint defines signals, active controls, keyboard focus, and selected nodes.

The original 24,222-byte portrait asset remains unchanged. The 3:4 frame measures 160 × 213px on desktop and 120 × 160px on phones, with a thin copper outline and mint corner accent. Typography, the custom Liquid Intelligence SVG mark, curved network geometry, and asymmetric project proportions form the new identity.

## Interaction and lifecycle

- `liquidGeometry.ts` supplies deterministic quadratic connections for the hero Canvas and static SVG fallback. Geometry and CSS-derived Canvas colors are cached on resize, without per-frame layout reads.
- The 16-node, 20-connection hero retains one requestAnimationFrame loop, a 1.5 DPR cap, and at most four simultaneous mint pulses. Node proximity illuminates connections smoothly. Rendering stops offscreen, with reduced motion, and when the document is hidden.
- Touch devices do not create the hero Canvas context or animation loop. They use static SVG artwork. Unavailable Canvas also has a static fallback.
- Shared SVG signals use finite native Web Animations on section entry, hover, focus, and pointer activation. Repeated taps on an already-selected node replay the signal. Node metadata restricts preview pulses to adjacent connections. Effects cancel on unmount, hidden-document events, reduced motion, and offscreen transitions.
- All four projects retain their existing detailed walkthroughs. Architecture playback suspends outside the visible area or in hidden tabs. Text alternatives, native horizontal swipes, and vertical page scrolling remain functional.

## Completed verification

- ESLint, TypeScript, and the production build pass. The build is served under `/sahana-portfolio/` for local checks.
- Desktop Chrome (1440 × 1000) and phone emulation (390 × 844): all 12 preview nodes, repeated focus/tap pulses, relevant-connection targeting, project filters, all four dialogs, architecture stages and playback/pause, keyboard controls, Escape, focus restoration, expertise categories, email copying, and fragment refresh pass.
- Exact runtime palette, copper tracks, mint pulses/selected nodes, default and interactive cursor colors, and browser theme color pass targeted assertions.
- No horizontal overflow at 320, 375, 620, 768, 850, 1024, 1280, or 1920px.
- Axe WCAG A/AA automated checks find no violations in tested desktop/phone pages and dialogs. Automated checks do not establish full accessibility conformance.
- Instrumented Canvas draw counts stop offscreen, with reduced motion, and during a simulated hidden-document event. Pointer proximity, capped DPR, touch fallback, and forced-unavailable Canvas fallback pass.
- Desktop and phone screenshots cover the hero, project cards, full layout, architecture lab/dialogs, and contact actions. Browser checks use emulation, not physical mobile hardware.

## Local performance observations

One unthrottled three-second desktop probe sampled 181 Canvas callbacks: 0.3ms median and 0.6ms at the 95th percentile. Median frame interval was 16.7ms, with a 17.2ms 95th percentile. Callback timing measures JavaScript, not total GPU/compositor work; these local observations do not guarantee frame rates on other devices.

The local regression probe recorded LCP of 1.252s on desktop and 1.148s in phone emulation, with CLS approximately 0.000132 and 0. Desktop recorded one 83ms initial long task; phone emulation recorded none. Both made zero third-party resource requests. These are single local samples without CPU/network throttling, not field Core Web Vitals or Lighthouse scores.

Measured build outputs: main JavaScript 63.08 KB gzip; CSS 11.18 KB gzip; lazy project architecture 2.99 KB gzip. The architecture chunk is fetched on first project open. Existing portrait and self-hosted fonts are unchanged. Publishing is verified separately through GitHub Actions and live desktop/phone browser smoke tests.
