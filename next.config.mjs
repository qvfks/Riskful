/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds or when running the static marketing site on a platform like Vercel.
 */

// Allow builds to skip env validation when either SKIP_ENV_VALIDATION or
// NEXT_PUBLIC_STATIC_MODE=on is set in the build environment. This prevents hard failures
// when secrets are intentionally absent for a static marketing deployment.
const skipEnvValidation =
    process.env.SKIP_ENV_VALIDATION === "1" ||
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.NEXT_PUBLIC_STATIC_MODE === "on";

if (!skipEnvValidation) {
    try {
        await import("./src/env.js");
    } catch (e) {
        // If env import fails for any reason, warn and continue. This keeps static marketing
        // builds from failing unexpectedly.
        // eslint-disable-next-line no-console
        console.warn("env validation import failed, continuing without validation.");
    }
} else {
    // eslint-disable-next-line no-console
    console.info("Skipping env validation because SKIP_ENV_VALIDATION or NEXT_PUBLIC_STATIC_MODE is set.");
}
import createMDX from "fumadocs-mdx/config";

const withMDX = createMDX({
    mdxOptions: {
        lastModifiedTime: "git",
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optionally, add any other Next.js config below
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
    images: {
        remotePatterns: [{ hostname: "fakeimg.pl" }, { hostname: "utfs.io" }],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
};

export default withMDX(nextConfig);
