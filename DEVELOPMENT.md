# Development

Use Node.js 24.22+ (24–26) and pnpm 12. The repository pins the verified package manager and runtime.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm audit --audit-level=high
```

Pull requests run validation without deploying. Pages deployment is restricted to
the default branch. Dependabot checks compatible updates weekly; major updates
are reviewed separately.

## Readability regression

`scripts/check-readability.mjs` checks the built UI with an existing external
Playwright/Chromium installation (no extra application dependency). Start
`pnpm preview --host 127.0.0.1 --port 4193`, then run:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs \
CHROMIUM_PATH=/absolute/path/to/chrome-headless-shell \
TEST_URL=http://127.0.0.1:4193/ \
EVIDENCE_DIR=/tmp/shippingboard-readability \
node scripts/check-readability.mjs
```

The scenario replaces the in-memory sample records with entirely synthetic
DEMO customers, loading IDs and dates; it also substitutes fixed display-only
operator/truck samples before screenshots. It checks ramp states and counts,
keyboard/touch dialogs, ramp/time edits, focus restoration, document widths
320–1440px, the table's local scroller and text/focus contrast. Optional images
use the existing light theme and CSS `grayscale(1)`; this is not a physical
monochrome display test. `TEST_URL` may also point to the deployed Pages site.
