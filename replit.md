# PowerBall Gacha Game

A gacha-style game where players roll to collect PowerBalls of varying rarities, from Common to the ultra-rare God Ball.

## Run & Operate

- **Start application** workflow runs both services together:
  - Frontend (gacha-game): `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/gacha-game run dev` (port 5000)
  - API server: `PORT=3001 pnpm --filter @workspace/api-server run dev` (port 3001)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (managed by Replit)
- Required env: `PORT` — set to 5000 for frontend, 3001 for API server
- Required env: `BASE_PATH` — set to `/` for frontend

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite, Tailwind CSS v4, Radix UI, Framer Motion, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle for API)

## Where things live

- `artifacts/gacha-game/` — React frontend (PowerBall game UI)
- `artifacts/api-server/` — Express backend (API routes)
- `lib/api-spec/openapi.yaml` — source of truth for API contract
- `lib/db/src/schema/index.ts` — source of truth for DB schema
- `artifacts/gacha-game/src/lib/gacha.ts` — core game logic (rarities, probabilities)
- `artifacts/gacha-game/src/lib/store.tsx` — collection state (localStorage-backed)

## Architecture decisions

- Frontend game state is stored in localStorage — no backend needed for core gameplay.
- Frontend runs on port 5000 (webview); API server runs on port 3001 to avoid conflict.
- `PORT` and `BASE_PATH` env vars are required at Vite startup (enforced in `vite.config.ts`).
- API server uses `PORT=3001` env var set inline in the workflow command.

## Product

- Roll for PowerBalls in 7 rarities: Common, Uncommon, Rare, Epic, Legendary, Mythic, Ultra.
- Single roll (100 VERBAL) or 10-roll batch (1000 VERBAL).
- Collection tab shows inventory of all balls earned.
- Rates tab shows drop rates for each ball type.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always set `PORT` and `BASE_PATH` when starting the gacha-game frontend.
- Vite config throws at startup if either env var is missing.
- The workflow command sets `PORT=3001` inline for the API server and `PORT=5000 BASE_PATH=/` inline for the frontend.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
