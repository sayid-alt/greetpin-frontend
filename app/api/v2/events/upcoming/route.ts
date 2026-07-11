import { EventData } from '@/lib/config/types-config';
import { getEvents } from '@/lib/helper/api'
import { NextResponse } from 'next/server';


export async function GET(): Promise<NextResponse<EventData[] | null>> {
    const apiResponse = await getEvents("/upcoming");
    const data = apiResponse?.data ?? null;
    return NextResponse.json(data);
}
