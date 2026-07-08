import { getConflictEvents } from "@/service/api";
import { NextResponse } from "next/server";

export async function GET() : Promise<
    NextResponse<
        Record<string, string | number>[]
        | undefined
        | null
    >
> {
    const data = await getConflictEvents();
    return NextResponse.json(data);
};
