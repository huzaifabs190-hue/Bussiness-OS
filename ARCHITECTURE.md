# Architecture decisions

## ADR 001: staged modular monolith
The first deliverable is a static React app with reusable packages, not simulated production infrastructure. A NestJS modular monolith will later own platform identity, organizations, branches, membership, subscriptions and notifications; pharmacy inventory, sales, returns and purchasing remain separate domain modules. PostgreSQL is the source of record. Shared types are not a security boundary; all writes must be validated server-side.

## ADR 002: transaction and money rules
Money is integer minor units. Quantities are integer base units (tablets for the current sample catalog). Pack configurations convert units before stock checks. Apply whole-percent discounts once to the subtotal, round half-up to cents. Production support for liquids, fractional doses, tax-inclusive/exclusive pricing and localization requires explicit policy and tests.

Completed sale snapshots are append-only. A full return is a separate record that links to the sale, restores sample stock and preserves the sale unchanged. Production returns must validate authorization, refund method, original remaining quantities and batch disposition; returned medicines may require quarantine rather than restocking. The current automatic stock restoration is demo behavior only.

## ADR 003: tenant safety and offline sync (planned)
Every server record carries organization and branch scope. Derive scope from authenticated membership, never trust a supplied tenant ID alone. Enforce authorization on every query/command, with PostgreSQL row-level security as defense in depth. Use HTTP-only secure sessions, CSRF protection, rate limits and audit events. Never embed secrets in the frontend.

Electron renderer is unprivileged, with context isolation, sandboxing and a narrow validated preload API. SQLite transactions will atomically write sales, inventory reservations and an outbox event. The API accepts idempotency keys with unique constraints; acknowledgments advance a durable cursor. Exponential backoff, bounded retries, dead-letter review and visible sync status handle failures. Do not replay money mutations blindly or resolve stock conflicts by last-write-wins. Branch/device stock allocation and reconnect conflict policies must be settled before pilots.

## ADR 004: deployment boundary
The Stage 1–2 static build can be hosted independently of future PostgreSQL/NestJS and Electron deployments. Hash routing avoids dependence on server rewrite support. No Worker or hosted database is required for the demo. Production platform infrastructure must be chosen and threat-modeled during Stage 3.

## Pilot gate
Require transactional integration tests, tenant-isolation tests, authorization matrix, financial reconciliation, outbox retry/crash tests, migrations tested against realistic data, encrypted backup restoration, signed desktop artifacts, monitoring and jurisdiction-specific pharmacy/tax review. Current domain unit tests cover demo arithmetic and transactions only.
