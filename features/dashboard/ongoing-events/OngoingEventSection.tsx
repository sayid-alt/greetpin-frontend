import { EventData } from "@/lib/config/types-config";
import CurrentEventCard from "./CurrentEventCard";
import NoOngoingEventCard from "./NoOngoingEventCard";

interface OngoingEventSectionProps {
    onGoingEventData: EventData[] | undefined | null;
    onGoingEventTagsData: (EventData[] | undefined | null)[];
};

export default function OngoingEventSection({ 
    onGoingEventData, 
    onGoingEventTagsData,
} : OngoingEventSectionProps) {
    if (!Array.isArray(onGoingEventData)) return <NoOngoingEventCard />
    return (
        <>
            {onGoingEventData.map((event, index) => (
                    <CurrentEventCard
                        key={event.id}
                        title={event.title as string}
                        startDateTime={event.startDateTime as string}
                        url={event.url as string}
                        description={event.description as string}
                        eventEntityTags={onGoingEventTagsData[index]}
                        endDateTime={event.endDateTime as string}
                    />
                ))
            }
            
        </>
    );
}