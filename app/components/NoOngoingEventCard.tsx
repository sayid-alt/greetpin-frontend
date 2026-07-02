import { CalendarPlus, CalendarDays } from "lucide-react";

export default function NoOngoingEventCard() {
    return (
        <section className="relative rounded-xl overflow-hidden bg-[#191f2f]/40 backdrop-blur-xl border border-[#424754]/40 p-8 shadow-[0_0_20px_-5px_rgba(194,198,214,0.02)] transition-all duration-300">
        {/* Subtle indicator bar - muted neutral color instead of vibrant green */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#424754]/50"></div>
        
        <div className="flex flex-col items-center justify-center text-center py-6">
            {/* Decorative Graphic Container */}
            <div className="relative mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-[#2e3545]/40 border border-[#424754]/40">
            <CalendarDays size={28} className="text-[#c2c6d6]/60" />
            <span className="absolute top-3 right-3 flex h-2.5 w-2.5 rounded-full bg-[#424754]"></span>
            </div>

            {/* Message */}
            <div className="max-w mb-6">
            <span className="text-xs text-[#c2c6d6]/60 font-bold tracking-wider uppercase mb-1 block">
                Schedule Clear
            </span>
            <h2 className="text-xl font-bold text-[#ffffff] mb-2">
                No Ongoing Events
            </h2>
            <p className="text-sm text-[#c2c6d6]/70 leading-relaxed">
                There are no active sessions or meetings tracking right now. Enjoy the breather or get ahead by planning what{"'"}s next.
            </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="bg-[#2e3545] hover:bg-[#2e3545]/80 text-[#ffffff] px-5 py-2.5 rounded-md flex items-center justify-center gap-2 transition-all border border-[#424754]/50 text-xs font-semibold active:scale-98">
                View Calendar
            </button>
            
            <button className="bg-[#4edea3] text-[#00311f] px-5 py-2.5 rounded-md font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all text-xs">
                <CalendarPlus size={15} />
                Create New Event
            </button>
            </div>
        </div>
        </section>
    );
}