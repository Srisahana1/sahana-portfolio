# V3 validation

The production build was tested under the repository prefix `/sahana-portfolio/`, matching GitHub Pages project hosting.

The site was also published and checked at [the live GitHub Pages URL](https://srisahana1.github.io/sahana-portfolio/). Live checks covered the portrait, fonts, six article covers, the lazy project architecture chunk, and refresh with a section fragment. The deployment workflow validates source and builds before publishing; its actions use the Node 24 runtime.

## Completed checks

- ESLint, TypeScript, and Vite production build passed.
- Chrome desktop (1440 × 1000) and phone emulation (390 × 844) passed interaction checks.
- All four project dialogs, their stage controls, playback/pause, keyboard navigation, text alternatives, Escape/close controls, and focus restoration passed.
- Native horizontal touch swipes and vertical page scrolling over diagrams passed. No global touch cancellation or wheel interception is used.
- Architecture playback stops advancing offscreen. The architecture module is fetched on first project open, not during initial page load.
- All 20 expertise skills, six article cards, five anonymized career roles, approved contact links, and copy-email feedback were checked.
- Reduced motion and URL-fragment refresh passed.
- No page overflow was found at widths 320, 375, 620, 768, 850, 1024, 1280, or 1920 pixels.
- Axe checks against WCAG A/AA rules found no violations on the tested desktop and phone pages and project dialogs. Automated checks do not replace manual accessibility evaluation.
- Screenshot review covered the hero, full page, writing gallery, and project dialog. A masked-heading reveal issue discovered during review was corrected and retested.

## Local performance observations

One fresh-load Chrome probe against the local production server recorded:

| Observation | Desktop | Phone emulation |
| --- | --- | --- |
| Observed LCP | 1.34 s | 1.16 s |
| Observed CLS | 0.000083 | 0 |
| Long tasks over 50 ms during initial load | 0 | 0 |
| Third-party resource requests | 0 | 0 |

Desktop wheel-event dispatch to the first scroll event measured 0.5 ms in this probe. This measures the document event path, not physical input-device latency.

These are local, single-run lab observations without network or CPU throttling. They are not field Core Web Vitals, Lighthouse scores, or a before/after performance claim.

The main JavaScript bundle is about 60.2 KB gzip, with the project architecture experience in a separate approximately 3.0 KB gzip chunk. Responsive hero photographs are approximately 24 KB and 85 KB. Fonts and article covers are served from the same origin.
