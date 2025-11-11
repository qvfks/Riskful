// Minimal stub for Uploadthing route to avoid build-time imports of uploadthing and env.
export async function GET() {
    return new Response("Not Found", { status: 404 });
}

export async function POST() {
    return new Response("Not Implemented", { status: 501 });
}
