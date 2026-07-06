import { CalendarDays } from "lucide-react";

export default function NoUpcomingEvents() {
    return (
        <section className="bg-[#191f2f]/40 backdrop-blur-xl rounded-xl p-6 border border-[#424754]/40 transition-all duration-300">
        {/* Header Container - Preserved for Layout Consistency */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-sm font-bold tracking-wide text-[#c2c6d6]/50">Upcoming Events</h3>
            <div className="flex items-center gap-1 bg-[#141b2b]/60 p-1 rounded-md border border-[#424754]/30 pointer-events-none opacity-50">
            <button className="px-4 py-1 rounded bg-[#2e3545] text-xs font-bold text-[#c2c6d6]">List</button>
            <button className="px-4 py-1 rounded text-xs text-[#c2c6d6]/50">Timeline</button>
            <button className="px-4 py-1 rounded text-xs text-[#c2c6d6]/50">Calendar</button>
            </div>
        </div>

        {/* Empty State Content */}
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-[#424754]/40 rounded-xl bg-[#2e3545]/5">
            <div className="p-3 bg-[#2e3545]/30 rounded-full mb-3 border border-[#424754]/30">
            <CalendarDays className="text-[#c2c6d6]/40" size={24} />
            </div>
            <p className="text-sm font-semibold text-[#c2c6d6]/70 mb-1">
            No events on the horizon
            </p>
            <p className="text-xs text-[#c2c6d6]/40 text-center max-w-[280px]">
            Your upcoming agenda is completely empty. New scheduled sessions will appear here.
            </p>
        </div>
        </section>
    );
}