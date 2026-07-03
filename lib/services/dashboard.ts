import { auth } from "../auth"

interface ApiResponse {
    success: boolean;
    message: string;
    data: Record<string, string | number>[];
    timestamp: string;
}

export async function getEvents (endpoint: string) : Promise<ApiResponse | null> {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`http://localhost:8080/api/events${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    // Conditional when no upcoming
    if (response.status == 204) {
        return null
    }

    const data = response.json();
    return data;
}

export async function getEntitiesByEventId(eventId: number): Promise<ApiResponse | null> {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`http://localhost:8080/api/entities?eventId=${eventId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 204) {
        return null;
    }

    const data = response.json();
    return data;
}