<!--
Guidance for AI coding agents working on this repository.
Keep this file short, actionable, and tightly scoped to this codebase.
-->
# Copilot / AI agent instructions (concise)

Overview
- This is a Next.js (app-router) T3-style SaaS starter using Next 14, TypeScript, Tailwind, Drizzle ORM and NextAuth (Drizzle adapter).
- Key folders: `src/app` (app-router pages/layouts), `src/server` (db, auth, actions), `src/components` (shared UI/providers), and `content/` (MDX content: blogs/docs).

Quick dev commands (uses pnpm)
- Start dev server: `pnpm dev`
- Build: `pnpm build` (skip env validation with env var; see below)
- DB push (drizzle): `pnpm db:push`
- DB studio: `pnpm db:studio`

Environment and DB notes
- Env loader: `src/env.js` is imported early (see `next.config.mjs`). For Docker builds or CI you may need to set `SKIP_ENV_VALIDATION`.
  - Linux/macOS: `SKIP_ENV_VALIDATION=1 pnpm build`
  - Windows (PowerShell): `$env:SKIP_ENV_VALIDATION=1; pnpm build`
- Local DB helper: `start-database.sh` exists but is a shell script; on Windows prefer WSL or Docker.
- Drizzle config: `drizzle.config.ts` points at `src/server/db/schema.ts`. Use `pnpm db:push` after schema edits.

Auth & ORM patterns to be aware of
- NextAuth configured in `src/server/auth.ts` with module augmentation for `Session`, `User`, and JWT types. Prefer `getServerAuthSession()` wrapper instead of importing `authOptions` directly.
- Adapter: DrizzleAdapter connected to `db` from `src/server/db` and schema creators (see `createTable`, `users` in `src/server/db/schema.ts`).
- JWT/session enrichment: `jwt` and `session` callbacks mutate token/session with DB user fields — follow that pattern when adding auth props.

Project structure & conventions
- App router conventions: look in `src/app/(web)/` and other grouped route folders. `src/app/layout.tsx` wraps the app with `Providers` from `src/components/providers`.
- UI primitives: `src/components/ui/*` contains small Radix + Tailwind components; prefer these over new ad-hoc components.
- Content: MDX is powered by `fumadocs-mdx`; site content lives under `content/` (blogs, docs, changelogs).

Integrations and external services
- Email: `resend` + `nodemailer` and `send-verification-email` action in `src/server/actions`.
- Payments: `@lemonsqueezy/lemonsqueezy.js` integrations under `src/app/api/lemonsqueezy`.
- Uploads: `uploadthing` integration under `src/app/api/uploadthing` and `@uploadthing/react` on the client.
- Analytics: PostHog usage via `posthog-js` and related rewrites in `next.config.mjs`.

Coding hints for edits
- Keep server-only logic in `src/server/*` and export small wrappers to call from route handlers or server actions.
- When adding DB columns/models: update `src/server/db/schema.ts`, run `pnpm db:push`, and verify with `pnpm db:studio`.
- For auth changes, follow existing module augmentation pattern in `src/server/auth.ts` and update `jwt`/`session` callbacks accordingly.
- For new routes, mirror layout/grouping under `src/app` to keep app-router conventions.

Files to inspect first (high ROI)
- `package.json` — scripts and main dependencies
- `next.config.mjs` — MDX setup, rewrites, and build flags
- `drizzle.config.ts` and `src/server/db/*` — DB and ORM shape
- `src/server/auth.ts` — NextAuth usage and type augmentation
- `src/components/providers.tsx` and `src/app/layout.tsx` — global wrappers
- `content/` — MDX content conventions

What’s not present or notable
- No test scripts configured in `package.json` — there are no automated tests set up by default.
- `next.config.mjs` disables type and eslint build blocking: this repo can build with type errors; be cautious about adding risky TS changes without testing runtime.

If you need more context
- Ask for which area to deep-dive (auth, DB, payments, upload, MDX/content). Provide a short task and the files you'd like edited.

-- End of file --
