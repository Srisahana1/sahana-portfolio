# V4 validation

November 15, 2026. The production build is tested under `/sahana-portfolio/`, matching GitHub Pages project hosting. The Vite base (`./`), dependency versions, build configuration, and deployment workflow are preserved.

## Source and content

- The owner's original photograph remains unmodified, in its existing 24,222-byte WebP encoding. The 3:4 presentation measures 160 × 213px on desktop and 120 × 160px on phones. `--portrait-position` controls the crop without image distortion.
- The article component, article data, six thumbnails, article CSS, and Writing navigation are removed. Exactly one Medium profile link remains, in the contact area; no article feed is fetched.
- All four GitHub projects, their source links, architecture descriptions, approved contact details, and five anonymized career roles remain.
- The 20 technology chips provide short explanatory notes using buttons with pressed state and a live description. They work with touch and keyboard input.

## Build and performance

- ESLint, TypeScript, and the Vite production build pass.
- Main JavaScript: approximately 59.53 KB gzip; CSS: 10.48 KB gzip. The project architecture module remains a separate 2.99 KB gzip chunk, loaded on project open.
- The six removed thumbnails and unused large portrait total 370,784 bytes. The build emits only the small portrait and the existing self-hosted fonts as image/font assets.
- Project lighting and tilt update through refs and requestAnimationFrame without pointer-driven React renders. The cursor core tracks input directly; its ring settles quickly and stops requesting frames.
- Native scrolling remains in control. There are no wheel/touchmove interceptors, scroll engines, forced scroll snapping, or new dependencies.
- Architecture playback requires at least 10% visible area below the sticky header, and suspends while the browser document is hidden.
- Reduced motion disables decorative animation, portrait/card transforms, and the custom cursor. The cursor responds when the preference changes at runtime. Native pointers remain visible inside top-layer project dialogs.

Bundle and asset sizes are measured build outputs, not runtime performance scores. No Lighthouse or field Core Web Vitals score is claimed.

## Browser checks

- Chrome desktop (1440 × 1000) and phone emulation (390 × 844): portrait dimensions, project filters, all four dialogs, architecture stages, playback/pause, text alternatives, Escape/close controls, and focus restoration.
- Native horizontal touch swipes and vertical page scrolling over architecture diagrams; mobile navigation and copy-email feedback.
- Technology categories and selected-chip explanations; keyboard tab controls and visible focus indicators.
- Reduced motion, runtime preference changes, section-fragment refresh, and all remaining internal link targets.
- Responsive overflow checks at widths 320, 375, 620, 768, 850, 1024, 1280, and 1920px.
- Axe WCAG A/AA automated checks on desktop, phone, and project dialogs. Automated checks do not establish full accessibility conformance.
- Desktop and phone screenshots of the hero, full page, project dialog, and contact links.

The browser checks use local Chrome and phone emulation, not physical mobile hardware. Publishing is verified separately through GitHub Actions and a smoke test of the public GitHub Pages URL.
