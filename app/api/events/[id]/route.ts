
import { getAccessToken } from '@/lib/helper';
import { NextResponse } from 'next/server';

interface RouteParams {
    params: Promise<{
        id: number;
    }>
}

export async function DELETE(request: Request, { params } : RouteParams) : Promise<NextResponse | null>{
    
    try {
        const { id } = await params;

        const accessToken = await getAccessToken();

        const response = fetch(`http://localhost:8080/api/events/${id}`, {
            method: "DELETE",
            headers: {
                ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
            },
        })

        if ((await response).status == 204) {
            return null;
        }

        const data = (await response).json()
        return NextResponse.json(data, {status: (await response).status});
    
    } catch (error) {
        console.error("Error fetching API", error);    
        return NextResponse.json(
            {error: "INTERNAL SERVER ERROR"},
            {status: 500}
        )
    } 


}
