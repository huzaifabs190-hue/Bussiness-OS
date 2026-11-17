# BusinessOS — Stages 1 & 2

A React/TypeScript monorepo containing the BusinessOS website and four interactive sample-data workspaces: PharmaOS, RetailOS, RestaurantOS and ClinicOS. These are browser-local demos, **not production business or clinical systems**.

## Run
Requires Node.js 22+ and pnpm 11.22.0.

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm build
```

Vite serves the app locally. The static production artifact is `dist/`. Hash routes support static hosting: `/#/`, `/#/products/pharma`, `/#/products/retail`, `/#/products/restaurant`, `/#/products/clinic`, `/#/demo/dashboard`, `/#/demo/pos`, `/#/demo/inventory`, `/#/demo/sales`.

## Implemented
- Black/charcoal theme throughout marketing and PharmaOS, with white/silver accents. PatternWaves replaces the homepage laser background; the laser remains on the PharmaOS product page. MagicBento provides clickable workspace cards. AnimatedList selects workspace details inside SpotlightCard, with keyboard navigation and working links.
- Shared React Bits GlassSurface treatment across navigation, search, product and dashboard panels, cart and dialogs, with matching frosted controls. Responsive dimensions preserve the layout; large panels use a lighter fallback. The typed wrapper also supports image backdrops and SVG shapes.
- Expressive React Bits visual layer: SwarmCursor and LaserFlow hero, ReflectiveCard product cards, PlasmaWave industry explorer, GradientASCII platform backdrop and ElectricBorder search focus.
- Ctrl/Cmd+K quick search across products, workspace routes and sample medicines, plus clickable homepage previews, workflow explorer, expandable FAQs and mobile navigation.
- The reference dark theme is the default. Theme preferences are remembered. Effects start enabled on every page load; the toggle applies only to the current visit, so old saved off settings cannot hide the design. Reduced-motion retains the artwork using the vendor renderers' reduced-motion behavior, rather than hiding every effect. ElectricBorder speed is zero in this mode. Effects mount only near the viewport and vendor components load on demand. No webcam or external video is enabled.
- Responsive website, product pages, interactive product selector, light/dark themes and real dashboard previews.
- Dashboard with computed demo revenue, gross profit, stock valuation and cash summaries. Historical trend is explicitly illustrative and separate from recorded demo transactions.
- Medicine search by name/generic/barcode; keyboard-wedge barcode entry (100001–100008); pack/strip/tablet conversion; stock validation; discount and cash/card simulation; printable 80 mm receipt.
- Immutable sale records, separate full-return records, stock restoration, duplicate-return prevention, CSV export and reset.
- Sample catalog includes brands, generic names, strengths, manufacturers, batches, expiry, prices and pack configuration. Catalog is read-only except stock changed by demo sales/returns.
- F2 focuses POS search; F8 opens payment; Escape closes payment/receipt. Browser localStorage persistence is validated with Zod.

## Boundaries
No real authentication, authorization, tenant isolation, backend, subscriptions, real payments, dispensing rules, tax engine, purchasing, production reporting, Electron packaging, SQLite, reliable offline billing, synchronization, backups or patient records. No production pricing or compliance claims. A refresh preserves valid local demo state, but browser storage is not durable or safe for business records. Multiple browser tabs are not a concurrency-safe POS. Device barcode scanners and thermal printers require hardware validation.

USD is an illustrative display currency, not a localization decision. Sample expiry insights use November 15, 2026 plus 90 days; checkout checks expiry against current UTC date. A sample medicine becomes unsellable once it expires. All amounts are integer cents and discount rounding uses integer arithmetic.

## Structure and next steps
See PLAN.md for staged milestones, dependencies and design decisions. apps/website composes the site and demo. packages/ui contains branding and shared primitives; packages/shared-types defines records; packages/validation validates state and checkout; packages/business-logic contains framework-independent calculations and transactions.

See ARCHITECTURE.md for the production boundaries and security/reliability design. Future apps are documented as boundaries rather than represented as working services.

Interface polish: bundled Inter Variable, consistent control sizes, hover/press feedback, charcoal keyboard search, thin scrollbars, and a fixed floating header that preserves its rounded shape, size and inset while scrolling. Spatial animations respect reduced-motion preferences.


## Interactive workspaces — November 17, 2026

All four products now open working browser-local demos. The homepage product cards and global search route into each workspace.

- PharmaOS: existing pharmacy checkout, inventory, receipts and full returns. Route: `#/demo/pos`.
- RetailOS: product/barcode search, basket quantities, simulated cash/card checkout, receipts, full returns, product creation, stock receiving, CSV sales export and calculated overview. Route: `#/retail/checkout`.
- RestaurantOS: eight tables, menu orders, stock reservation, kitchen progression (queued → preparing → ready → served → paid), pre-service cancellation with stock restoration, menu creation/receiving, receipts and overview. Route: `#/restaurant/orders`.
- ClinicOS: fictional patient profiles, 30-minute appointment booking, provider/patient conflict prevention, check-in, visit completion/cancellation, simulated billing, downloadable invoices and overview. Route: `#/clinic/appointments`.

Each new workspace has isolated versioned localStorage and a confirmed reset action. Pure transaction functions in `apps/website/src/workspaces/model.ts` have regression tests for stock bounds, duplicate transactions/returns, table occupancy, kitchen transitions, scheduling conflicts and payment eligibility. Browser QA exercised all three end-to-end workflows, reload persistence, product creation/receiving, patient creation and mobile navigation.

These are interactive demonstrations, not production systems. There is no server database, multi-user synchronization, authentication/roles, real payment integration or clinical record security. Use fictional clinic data only. Restaurant availability counts menu portions, not ingredient recipes. Stock receiving is single-location. Taxes, real refunds and production integrations remain outside this release.
