# AGENTS.md

## Stack
TanStack Start, HeroUI, Drizzle ORM (sqlite/turso), Better Auth

## Commands
```bash
pnpm dev          # dev server on port 3000
pnpm build       # production build with prerender
pnpm test        # vitest
pnpm lint        # eslint
pnpm format      # prettier check
pnpm check       # prettier --write && eslint --fix

# Drizzle
pnpm db:generate # generate migrations
pnpm db:migrate  # run migrations
pnpm db:push     # push schema to DB
pnpm db:studio   # open studio
```

## Setup
1. Copy `.env.example` to `.env.local`
2. Generate auth secret: `pnpm dlx @better-auth/cli secret`
3. Add TURSO_CONNECTION_URL and TURSO_AUTH_TOKEN for Turso DB

## Architecture
- **Routes**: File-based in `src/routes/`
- **Auth DB**: `src/integrations/db/schemas/auth.schema.ts`
- **Prerender**: Enabled for public routes; excludes `/dashboard`, `/api`, `/auth`
- **DB client**: `src/integrations/db/index.ts` using `drizzle-orm/libsql`

## Quirks
- Prerender filter in `vite.config.ts` excludes auth/dashboard routes
- Better Auth uses `tanstackStartCookies()` plugin
- Drizzle loads `.env.local` via dotenv in `drizzle.config.ts`
- Auth schema requires `BETTER_AUTH_URL` and `BETTER_AUTH_SECRET` in env