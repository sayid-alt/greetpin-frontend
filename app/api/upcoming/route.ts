// app/api/upcoming/route.ts
import { NextResponse } from "next/server";
import { getUpcomingEventData } from "@/service/api"; // server safe version

export async function GET() : 
    Promise<
        NextResponse<Record<string, string | number>[] 
        | null 
        | undefined
    >> {
        const data = await getUpcomingEventData();
        return NextResponse.json(data);
}