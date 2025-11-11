// Placeholder minimal implementation to satisfy dynamic imports when static mode is off.
//
// This file intentionally provides a minimal surface so that imports from `auth.ts` do not
// produce TypeScript resolution errors. If you want to enable full auth, replace the contents
// with the original NextAuth + Drizzle implementation (see git history) or implement the real
// `auth-full` module that performs the adapter/provider wiring.

export const authOptions = {} as const;

export const getServerAuthSession = async () => {
    // No-op fallback. Replace with real session retrieval when enabling auth.
    return null;
};

export const getUser = async () => {
    return null;
};
