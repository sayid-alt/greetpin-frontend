import { ApiResponse, EventData } from "../config/types-config";
import { getAccessToken } from "./session-access-token";


function getApiBaseUrl() {
    // Browser: relative URL is fine
    if (typeof window !== "undefined") return "";
    // Server: must be absolute
    return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

function getApiBaseBackendUrl() {
    // if (typeof window !== "undefined") return "";
    return process.env.NEXT_BE_API_URL ?? "http://localhost:8080"
}

export async function getEvents (
    endpoint: string, 
) : Promise<ApiResponse<EventData[]> | null | undefined> {
    console.log("Fetching API getEvents from endpoint: ", endpoint)
    const accessToken = await getAccessToken();
    const response = await fetch(`http://localhost:8080/api/events${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });
    
    if (response.status == 204) return null;
    if (!response.ok) {
        console.error(`Frontend fetch failed with status ${response.status}`);
        return null; 
    }
    return await response.json();
}

export async function getEntitiesByEventId(
    eventId: number, 
): Promise<ApiResponse<EventData[]> | null | undefined> {
    const accessToken = await getAccessToken();

    const response = await fetch(`http://localhost:8080/api/entities?eventId=${eventId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    })

    if (response.status == 204) {
        return null;
    }

    const data = await response.json();
    return data;
}

export async function deleteEvents(id: number): Promise<void> {
    const response = fetch(`/api/events/${id}`, {
        method: "DELETE",
    })

    console.log(response)

    if (!(await response).ok) {
        throw new Error(`Error to delete event, status: ${(await response).status}`)
    }
}

export const getOnGoingEventData = async () => {
    const apiResponse = await getEvents("/ongoing");
    const data = apiResponse?.data ?? null;
    return data;
}

export const getUpcomingEventData = async () => {
    const apiResponse = await getEvents("/upcoming");
    const data = apiResponse?.data ?? null;
    return data;
}

export const getEventEntityTagsData = async (eventId: number) => {
    const apiResponse = await getEntitiesByEventId(eventId);
    const data = apiResponse?.data
    return data
}

export const getConflictEvents = async () => {
    const apiResponse = await getEvents("/conflict");
    const data = apiResponse?.data ?? null;
    return data;
}