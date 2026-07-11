import { NextResponse } from "next/server";
import { getAccessToken } from "./session-access-token";


type ProxyOptions = {
    path: string;
    method: string;
    request?: Request;
    searchParams?: string;
}

export async function proxyToBackend({
    path,
    method,
    request,
    searchParams = "",
}: ProxyOptions) {
    const accessToken = await getAccessToken();
    const backendUrl = `${process.env.NEXT_BE_API_URL}/api/events/${path}${searchParams}`;

    // Define headers
    const headers: HeadersInit = {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    };

    // Define body
    let body = undefined;
    if (request && method !== "GET" && method !== "HEAD") {
        try {
            body = await request.json();
        } catch {
            // Body was empty or malformed text, leave it as undefined
            body = null; 
        }
    }

    // Define content-type headers
    if (body) {
        headers['Content-Type'] = request!.headers.get("Content-Type") ?? "application/json" 
    }

    // Fetch backend API
    const response = await fetch(backendUrl, { method, headers, body });

    // Check if response it NO_CONTENT (status code 204)
    if (response.status == 204){
        return new NextResponse(null, { status: 204 });
    }

    // Define return value (json/text)
    const contentType = response.headers.get("Content-Type") ?? "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text()
    
    return NextResponse.json(data, { status: response.status })
}