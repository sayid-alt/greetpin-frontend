import moment from "moment";
import { ApiDataWrapper } from "../../config/componentConfig";
import CurrentEventCard from "./CurrentEventCard";

export default function OngoingEventSection({ response } : { response: ApiDataWrapper}) {
    const ongoingEvents = response.data;

    return (
        <>
            {ongoingEvents.map((event) => (
                    <CurrentEventCard
                        key={event.id}
                        title={event.title as string}
                        startedIn={moment(event.startDateTime).fromNow()}
                        url={event.url as string}
                    />
                ))
            }
            
        </>
    );
}