import { auth } from "../auth"


export async function eventService (endpoint: string) {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`http://localhost:8080/api/events${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = response.json();
    return data;
}