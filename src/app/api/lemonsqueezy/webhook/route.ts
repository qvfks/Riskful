// Webhook route removed for static/design-only site.
// Return a clear 500 so builds and deployments don't accidentally enable webhook processing.
export async function POST() {
    return new Response("Webhook secret not configured", { status: 500 });
}

export async function GET() {
    return new Response("Not Found", { status: 404 });
}
