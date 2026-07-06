"use client"

import { NextEventCard } from "@/components/metrics-grid/NextEventCard";
import { NextImportantCard } from "@/components/metrics-grid/NextImportantCard";
import NoNotificationsSidebar from "@/components/NoNotificationSidebar";
import OngoingEventSection from "@/features/dashboard/ongoing-events/OngoingEventSection";
import UpcomingEvents from "@/features/dashboard/upcoming-events/UpcomingEvents";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

interface DashboardClientProps {
    onGoingEventData: Record<string, string | number>[] | undefined | null;
    upcomingEventData: Record<string, string | number>[] | undefined | null;
    ongoingEventTagsData: (Record<string, string | number>[] | undefined | null)[];
}

export default function DashboardClient({ 
    onGoingEventData, 
    upcomingEventData,
    ongoingEventTagsData
}: DashboardClientProps) {

    // Helper to safely calculate remaining time until a target timestamp
    const getMsUntil = (targetTime: string | number | undefined): number => {
        if (!targetTime) return 0;
        const interval = Number(moment(targetTime)) - moment.now();
        // If the time is in the past, return 0 (stops polling) or a minimum throttle
        return Math.max(0, interval);
    };

    // 1. Upcoming Events Query
    const { data: upcomingEvents } = useQuery({
        queryKey: ["upcomingEvents"],
        queryFn: async () => {
            const res = await fetch("api/upcoming");
            return res.json();
        },
        staleTime: 1000 * 60,
        gcTime: 1000 * 5,
        initialData: upcomingEventData,
        // Safely calculate next refetch based on the first upcoming event
        refetchInterval: (query) => {
            const firstEvent = query.state.data?.[0];
            return getMsUntil(firstEvent?.['startDateTime']);
        },
        refetchIntervalInBackground: true,
    });

    // 2. Ongoing Events Query
    const { data: onGoingEvents } = useQuery({
        queryKey: ["onGoingEvents"],
        queryFn: async () => {
            const res = await fetch("api/ongoing");
            return res.json();
        },
        staleTime: 1000 * 60,
        gcTime: 1000 * 5,
        initialData: onGoingEventData,
        // Decoupled interval calculation
        refetchInterval: (query) => {
            const firstEvent = query.state.data?.[0];
            const onGoingFinishInterval = getMsUntil(firstEvent?.['endDateTime']);
            
            // If it's about to finish or has finished, poll slightly faster (e.g., 5s) 
            // to catch the state transition smoothly without hammering the server at 1s.
            return onGoingFinishInterval === 0 ? 5000 : onGoingFinishInterval;
        },
        refetchIntervalInBackground: true,
    });

    return (
        <main className="p-8 grid grid-cols-12 gap-6">
          {/* Main Column Left */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Ongoing Banner */}
                <OngoingEventSection 
                    onGoingEventData={onGoingEvents}
                    onGoingEventTagsData={ongoingEventTagsData}
                />
                

                {/* Metric grid section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Next event card */}
                    <NextEventCard data={upcomingEvents} />
                
                {/* Important next event card */}
                    <NextImportantCard data={upcomingEvents} />
                
                </div>
            </div>

            {/* Sidebar Column Right */}
            <div className="col-span-12 lg:col-span-4">
                {/* <NotificationsSidebar /> */}
                <NoNotificationsSidebar />
            </div>

            {/* Bottom Table Row */}
            <div className="col-span-12">
                <UpcomingEvents
                    data={upcomingEvents}
                /> 
            </div>
            </main>
    );
};