import moment from "moment";
import { ApiDataWrapper } from "../../config/componentConfig";
import CurrentEventCard from "./CurrentEventCard";

export default function OngoingEventSection({ response } : { response: ApiDataWrapper}) {
    const ongoingEvents = response.data;

    return (
        <>
            {Array.isArray(ongoingEvents) && ongoingEvents.map((event) => (
                    <CurrentEventCard
                        key={event.id}
                        id={Number(event.id)}
                        title={event.title as string}
                        startedIn={moment(event.startDateTime).fromNow()}
                        url={event.url as string}
                        description={event.description as string}
                    />
                ))
            }
            
        </>
    );
}