import { getOnGoingEventData } from "@/service/api";
import { NextResponse } from "next/server";

export async function GET(): Promise<
    NextResponse<
        Record<string, string | number>[]
        | null
        | undefined
    >
> {
    const data = await getOnGoingEventData();
    return NextResponse.json(data);
}