// Lightweight stub for static-marketing mode
//
// This file used to wire NextAuth + Drizzle. For a static-only site (design/marketing) we avoid
// importing NextAuth/Drizzle at module evaluation time to prevent build-time failures when DB and
// auth env vars are not present. The real implementation can be re-enabled by setting
// `NEXT_PUBLIC_STATIC_MODE=off` and restoring the original code from the repo history.

const isStatic = process.env.NEXT_PUBLIC_STATIC_MODE === "on";

// Minimal exports used across the codebase. When in static mode they are no-ops.
export const authOptions = isStatic
    ? ({} as unknown)
    : ({} as unknown); // placeholder if someone turns static mode off; real implementation is dynamic

export const getServerAuthSession = async () => null;

export const getUser = async () => null;

// Note: to restore full auth, create `src/server/auth-full.ts` that exports `authOptions`,
// `getServerAuthSession` and `getUser` with the original NextAuth + Drizzle implementation.
