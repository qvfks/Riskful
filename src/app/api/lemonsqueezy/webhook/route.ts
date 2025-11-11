// Minimal stub for LemonSqueezy webhook route.
//
// For a static/design-only site we don't need webhook processing. This handler accepts
// POSTs and returns 200 OK but performs no validation or side-effects. It purposely
// avoids importing `@/env` or server actions so builds won't fail due to missing secrets.
export async function POST(_request: Request) {
    return new Response("OK", { status: 200 });
}

export async function GET() {
    return new Response("Not Found", { status: 404 });
}
