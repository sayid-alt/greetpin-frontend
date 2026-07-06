import { getEventEntityTagsData, getOnGoingEventData, getUpcomingEventData } from "@/service/api";
import DashboardClient from "../../features/dashboard/DashboardClient";


export default async function Dashboard() {
    const onGoingEventData = await getOnGoingEventData();
    const upcomingEventData = await getUpcomingEventData();

    const tagPromises = Array.isArray(onGoingEventData) && onGoingEventData?.map(async (event) => {
        return await getEventEntityTagsData(Number(event.id));
    }) || [];

    const resolvedTags = await Promise.all(tagPromises);

    return (
        <>
            <DashboardClient 
                onGoingEventData={onGoingEventData}
                upcomingEventData={upcomingEventData}
                ongoingEventTagsData={resolvedTags}
            />
        </>
    );
};