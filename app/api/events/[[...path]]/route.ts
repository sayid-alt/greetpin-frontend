import { proxyToBackend } from "@/lib/helper/proxy-to-backend";

interface RouteParams {
    params: Promise<{ path?: string[]}>
}

async function handler(
    request: Request, 
    { params }: RouteParams
) {
    const { path = [] } = await params;
    const joinedPath = path.join('/');
    const { search } = new URL(request.url);

    try {
        return await proxyToBackend({
            path: joinedPath,
            method: request.method,
            request,
            searchParams: search
        })
    } catch (error) {
        console.log("Proxy error: ", error);
        return Response.json({ error: "Internal Server Error"}, {status: 500})
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;