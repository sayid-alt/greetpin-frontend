"use client"

import { NextEventCard } from "@/components/metrics-grid/NextEventCard";
import { NextImportantCard } from "@/components/metrics-grid/NextImportantCard";
import { ConflictItem, EventData, NotificationDetails } from "@/config/componentConfig";

import NotificationsSidebar from "@/features/dashboard/notifications-sidebar/NotificationsSidebar";
import OngoingEventSection from "@/features/dashboard/ongoing-events/OngoingEventSection";
import UpcomingEvents from "@/features/dashboard/upcoming-events/UpcomingEvents";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";

interface DashboardClientProps {
    onGoingEventData: EventData | null | undefined;
    upcomingEventData: EventData | null | undefined;
    ongoingEventTagsData: (Record<string, string | number>[] | undefined | null)[];
}

export default function DashboardClient({ 
    onGoingEventData, 
    upcomingEventData,
    ongoingEventTagsData
}: DashboardClientProps) {

    // Helper to safely calculate remaining time until a target timestamp
    const getMsUntil = (targetTime: string | number | undefined): number | false => {
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
            const res = await fetch("api/upcoming");
            const data = res.json();
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["notificationsQuery"]}),
                queryClient.invalidateQueries({ queryKey: ["onGoingQuery"]})
            ])
            
            return data;
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
        queryKey: ["onGoingQuery"],
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
            return onGoingFinishInterval === 0 ? 1000 : onGoingFinishInterval;
        },
        refetchIntervalInBackground: true,
    });

    // Conflict events query
    const { data: notificationData } = useQuery({
        queryKey: ['notificationsQuery'],
        queryFn: async () => {
            const res = await fetch("/api/conflict");
            if (!res.ok) throw new Error("Failed to fetch conflicts");
            const data = await res.json();
            return data;
        },
        staleTime: 1000 * 60,
        gcTime: 1000 * 5,

        select: (data) => {
            console.log("data exists?", data)
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
                    conflictId: crypto.randomUUID(),
                    type: "CONFLICT",
                    title: "Conflict Detected",
                    message: `${moment(conflict.event.startDateTime).fromNow()} • "${conflict.event.title}" with ${conflictWith.event?.title || 'Unknown Event'}`
                }];
            });
        }
    });

    console.log("notif", notificationData);

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
                    notificationDetails={notificationData}
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