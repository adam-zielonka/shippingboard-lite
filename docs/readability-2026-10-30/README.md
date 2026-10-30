# Ramp readability evidence — 2026-10-30 UTC

Application version: 0.0.0. Source SHA: `a39bad2604ce447f8355bf8ca39060ef9a0e1ca5`
(implementation `1879be3691d2a4aac9fea61c62294b9967236212`, followed by the time-column adjustment).
Screenshots were captured from the production Vite build, Chromium 156.0.8078.4,
1280×1000 desktop / 390×844 mobile with touch, existing light theme.

All records in these images are newly constructed synthetic in-memory Customer,
Loading, Delivery and DateTime instances, including DEMO IDs, names, location and
2030-01-02 dates. Fixed display-only operator and truck samples are replaced with
DEMO values before capture. No real or private production records are used. The
application's fakeApi, store models and production data are unchanged.

Dashboard: B Completed, C/D In progress, E Not started, A/F/G Empty. Counts and
progress bars use the unchanged model. Dialog: the synthetic loading is moved
from B to C and its duration changed from 4 to 4.5 hours, to verify the existing
controls. The dialog body scrolls vertically on mobile while Close stays visible.
Table phone images intentionally show its right edge after scrolling locally;
all columns remain available in the 960px inner table. The document stays 390px.

Each dashboard/dialog/table has matching `*-color.png` / `*-grayscale.png` pairs.
Grayscale is CSS `filter: grayscale(1)`, not a physical monochrome panel test.
The images were visually inspected. No claim of full WCAG certification is made.

## Verification

`pnpm lint`, `pnpm build`, `pnpm audit --audit-level=high`: PASS (Node24.22.1,
pnpm12.14.0). See DEVELOPMENT.md for reproduction with existing Playwright.
`check-readability.mjs` checks B/C/D/E/Empty, counts and progress widths, keyboard
Tab/Enter/Space/Escape and touch, ramp/time edits, focus after remounting a card,
new loading, document widths 320/375/390/768/1024/1440, and local keyboard/table
scrolling. Both desktop and touch scenarios PASS, zero page errors. At390px:
Dashboard/Loadings/dialog document scrollWidth <= clientWidth =390. Table's local
clientWidth390, scrollWidth960, overflow-x:auto. No global overflow hiding.

Contrast from rendered computed styles and sRGB luminance (CSS grayscale matrix
for the gray calculation): labels/symbols #1c2127 on white16.20:1 / gray16.22:1;
3px focus #174a77 on white9.20:1 / gray9.99:1. Status text and shapes remain visible
without the tinted ramp backgrounds. The only theme in this application is light.
