import { NextResponse } from "next/server";
import { getAccessToken } from "../lib/helper";


export interface ApiResponse {
    success: boolean;
    message: string;
    data: Record<string, string | number>[];
    timestamp: string;
}1

export async function getEvents (
    endpoint: string, 
) : Promise<ApiResponse | null | undefined> {
    const accessToken = await getAccessToken();
    
    const response = await fetch(`http://localhost:8080/api/events${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    })

    // Conditional when no upcoming
    if (response.status == 204) {
        return null
    }

    const data = await response.json();
    return data;
}

export async function getEntitiesByEventId(
    eventId: number, 
): Promise<ApiResponse | null | undefined> {
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
        method: "DELETE"
    })

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