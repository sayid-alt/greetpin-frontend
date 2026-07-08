
import { NextResponse } from "next/server";
import NoUpcomingEvents from "./NoUpcomingEvents";
import RowEvent from "./RowEvent";
import { EventData } from "@/config/componentConfig";


interface UpcomingEventsProps {
  data: NoInfer<() => Promise<
    NextResponse<
      EventData[] 
        | null 
        | undefined
      >
    >
  > | undefined;
}

export default function UpcomingEvents( { data } : UpcomingEventsProps) {
  
  if (data == null) return <NoUpcomingEvents />
  return (
    <section className="bg-[#191f2f]/70 backdrop-blur-xl rounded-xl p-6 border border-[#424754]/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-sm font-bold tracking-wide">Upcoming Events</h3>
        <div className="flex items-center gap-1 bg-[#141b2b] p-1 rounded-md border border-[#424754]/30">
          <button className="px-4 py-1 rounded bg-[#2e3545] text-xs font-bold">List</button>
          <button className="px-4 py-1 rounded text-xs text-[#c2c6d6] hover:text-[#dce2f7]">Timeline</button>
          <button className="px-4 py-1 rounded text-xs text-[#c2c6d6] hover:text-[#dce2f7]">Calendar</button>
        </div>
      </div>

      {/* Added max-height, vertical overflow, and padding for custom scrollbars */}
      {/* <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 chunk-scrollbar"> */}
        {/* Event rows */}
        {Array.isArray(data) && data.map(row => <RowEvent key={row.id} row={row} />)}
      {/* </div> */}
    </section>
  );
}