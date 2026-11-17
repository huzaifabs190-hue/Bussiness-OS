# BusinessOS implementation plan

## Scope and milestones
1. Foundation: pnpm/Turborepo workspace, React/TypeScript applications and shared domain/UI packages.
2. Stage 1: premium public website, four dedicated product routes, interactive previews, platform principles and explicitly indicative pricing.
3. Stage 2: sample-data owner dashboard and cashier POS. Search by barcode/brand/generic, unit conversion, editable cart, discounts, cash/card simulation, immutable completed sales, receipt printing and full returns. Local browser persistence is demo convenience only.
4. Verify: domain unit tests, TypeScript and production build, browser interaction/accessibility/responsive checks where available.

## Architecture
Start with a modular monolith. apps/website hosts the marketing experience and stage-2 demo via hash routes so static hosting works without server rewrites. apps/admin, apps/api and apps/desktop are documented future boundaries, not empty functioning products. Shared UI, types, validation and pure pharmacy business rules live in packages. The production API will use NestJS/PostgreSQL; Electron will own SQLite and a transactional outbox. No backend, authentication, medical decision support, real payments or reliable offline synchronization is represented as implemented.

Production rules: organization and branch IDs on domain records; server-enforced tenant scoping and RBAC; authenticated sessions; append-only sales and return/adjustment records; transactionally allocated batches using FEFO; integer minor units; unique operation IDs for retry safety; migrations, encrypted backups and restore drills before pilots.

## Design system
Editorial, spacious marketing pages with deep forest ink, soft ivory surfaces and restrained mint accents. Large typographic hierarchy, thin rules and asymmetric product storytelling. Dense, accessible light/dark operational interfaces use the same tokens. Native system sans typography avoids a remote font dependency. Consistent rounded controls, visible focus, reduced-motion support, responsive sidebar and tabular numeric data. Sample-data badges remain visible in every operational screen.

## Dependencies
React + React DOM, TypeScript, Vite, Tailwind CSS, Zod, lucide-react, pnpm, Turborepo and Vitest. No remote data or third-party image dependency. SVG charts are accessible and local.

## Later milestones — intentionally not implemented in this phase
- Stage 3: PostgreSQL migrations, NestJS tenancy/auth/RBAC/audit modules; transactional inventory, purchase receiving and real sale APIs.
- Stage 4: Electron secure preload boundary, SQLite migrations, outbox/inbox, idempotent sync, conflict policies and failure/recovery tests.
- Stage 5: complete inventory, suppliers, purchasing, FEFO/expiry and financial reporting workflows.
- Stage 6: integration/security/load tests, packaging/signing, tax and pharmacy-localization review, backup restoration and supervised pilots.

## Acceptance
No fake login or checkout. All demo controls perform local actions. Product concepts and planned capabilities are clearly marked. Never claim production readiness. Browser storage may be cleared and is unsuitable for sensitive business or patient records.
