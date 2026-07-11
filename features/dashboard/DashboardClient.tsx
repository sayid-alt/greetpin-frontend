"use client"

import { NextEventCard } from "@/components/metrics-grid/NextEventCard";
import { NextImportantCard } from "@/components/metrics-grid/NextImportantCard";
import { ConflictItem, EventData, NotificationDetails } from "@/lib/config/types-config";

import NotificationsSidebar from "@/features/dashboard/notifications-sidebar/NotificationsSidebar";
import OngoingEventSection from "@/features/dashboard/ongoing-events/OngoingEventSection";
import UpcomingEvents from "@/features/dashboard/upcoming-events/UpcomingEvents";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { getOnGoingEventData } from "@/lib/helper/api";

interface DashboardClientProps {
    onGoingEventData: EventData[] | null | undefined;
    upcomingEventData: EventData[] | null | undefined;
    ongoingEventTagsData: (Record<string, string | number>[] | undefined | null)[];
}

export default function DashboardClient({ 
    onGoingEventData, 
    upcomingEventData,
    ongoingEventTagsData
}: DashboardClientProps) {

    // Helper to safely calculate remaining time until a target timestamp
    const getMsUntil = (
        targetTime: string | number | undefined
    ): number | false => {
        if (!targetTime) return false;
        const interval = Number(moment(targetTime)) - moment.now();
        // If the time is in the past, return 0 (stops polling) or a minimum throttle
        return Math.max(0, interval);
    };

    const queryClient = useQueryClient();

    // 1. Upcoming Events Query
    const { data: upcomingEvents } = useQuery({
        queryKey: ["upcomingQuery"],
        queryFn: async () => {
            console.log("UPCOMING: Fetch upcoming query ...")
            const res = await fetch("/api/events/upcoming");
            if (res.status == 204) return null;
            if (!res.ok) throw new Error(
                "Network response was not ok!, Something wrong. I don't like it!"
            );
            const payload = await res.json();
            console.log("UPCOMING: upcoming payload:", payload)
            
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["conflictQuery"]}),
                queryClient.invalidateQueries({ queryKey: ["onGoingQuery"]})
            ])
            
            return payload.data ?? null;
        },
        staleTime: 1000 * 60,
        gcTime: 1000 * 5,
        initialData: upcomingEventData,
        // Safely calculate next refetch based on the first upcoming event
        refetchInterval: (query) => {
            const firstEvent = query.state.data?.[0];
            const upcomingRefetchInterval = getMsUntil(firstEvent?.['startDateTime']);
            console.log("UPCOMING: refetch interval", upcomingRefetchInterval)
            return upcomingRefetchInterval
        },
        refetchIntervalInBackground: true,
    });
    console.log("Upcoming Query data", upcomingEvents);

    // 2. Ongoing Events Query
    const { data: onGoingEvents } = useQuery({
        queryKey: ["onGoingQuery"],
        queryFn: async () => {
            console.log("ONGOING: query refetch!")
            const res = await fetch("/api/events/ongoing");
            console.log("ONGOING: Events res status", res.status)
            if (res.status == 204) return null;
            if (!res.ok) throw new Error(
                "Network response was not ok!, Something wrong. I don't like it!"
            );
            const payload = await res.json();
            return payload.data ?? null;
        },
        staleTime: 1000 * 60,
        gcTime: 1000 * 5,
        initialData: onGoingEventData,
        // Decoupled interval calculation
        refetchInterval: (query) => {
            const firstEvent = query.state.data?.[0];
            console.log("ONGOING: first event ongoing", firstEvent)
            const onGoingFinishInterval = getMsUntil(firstEvent?.['endDateTime']);
            console.log("ONGOING: finish interval", onGoingFinishInterval)
            // If it's about to finish or has finished, poll slightly faster (e.g., 5s) 
            // to catch the state transition smoothly without hammering the server at 1s.
            return onGoingFinishInterval === 0 ? 1000 : onGoingFinishInterval;
        },
        refetchIntervalInBackground: true,
    });
    console.log("OnGoingEventsData", onGoingEvents);
    

    // Conflict events query
    const { data: conflictData } = useQuery({
        queryKey: ['conflictQuery'],
        queryFn: async () => {
            console.log("CONFLICT: Conflict query fetching ... ")
            const res = await fetch("/api/events/conflict");
            console.log("ONGOING: res status", res.status);
            if (res.status == 204) return null;
            if (!res.ok) throw new Error(
                "Network response was not ok!, Something wrong. I don't like it!"
            );
            const payload = await res.json();
            console.log("ONGOING: (Inside QueryFn) data", payload.data)
            return payload.data;
        },

        staleTime: 1000 * 60,
        gcTime: 1000 * 5,

        select: (data) => {
            if (!data) return [];

            return data.flatMap((conflict: ConflictItem): NotificationDetails[] => {
                const conflictWith = data.find(
                    (upcoming: ConflictItem) => 
                        moment(upcoming.event.startDateTime).isAfter(moment.now()) &&
                        upcoming.event.id === conflict.conflictWithEventId
                );

                // Returning an empty array means "skip this item"
                if (!conflictWith) return []; 

                return [{
                    id: crypto.randomUUID(),
                    type: "CONFLICT",
                    title: "Conflict Detected",
                    message: `${moment(conflict.event.startDateTime).fromNow()} • "${conflict.event.title}" with ${conflictWith.event?.title || 'Unknown Event'}`
                }];
            });
        }
    });
    console.log("ONGOING: Filtered Conflict data", conflictData);

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
                <NotificationsSidebar 
                    conflictData={conflictData}
                    analyticsInisght={null}
                />
                {/* <NoNotificationsSidebar /> */}
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