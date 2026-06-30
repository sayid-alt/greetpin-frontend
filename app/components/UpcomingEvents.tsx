import { MoreVertical, Star, ChevronRight, Repeat } from "lucide-react";

export default function UpcomingEvents() {
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

      <div className="space-y-2">
        {/* Row 1 */}
        <div className="grid grid-cols-12 items-center p-4 rounded-lg border border-transparent hover:border-[#424754]/30 hover:bg-[#2e3545]/20 transition-all cursor-pointer">
          <div className="col-span-1 flex justify-center">
            <div className="w-1.5 h-8 rounded-full bg-[#adc6ff]/40"></div>
          </div>
          <div className="col-span-2 text-xs text-[#c2c6d6]">14:00 - 15:00</div>
          <div className="col-span-4 font-bold text-sm">Infrastructure Scalability Workshop</div>
          <div className="col-span-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-[#191f2f] bg-[#4d8eff] text-[10px] flex items-center justify-center font-bold text-[#001a42]">JD</div>
              <div className="w-7 h-7 rounded-full border-2 border-[#191f2f] bg-[#df7412] text-[10px] flex items-center justify-center font-bold text-[#461f00]">AK</div>
              <div className="w-7 h-7 rounded-full border-2 border-[#191f2f] bg-[#00a572] text-[10px] flex items-center justify-center font-bold text-[#00311f]">SM</div>
            </div>
          </div>
          <div className="col-span-2 flex justify-end">
            <button className="text-[#c2c6d6] hover:text-[#adc6ff] p-1 rounded transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Row 2 (Highlighted) */}
        <div className="grid grid-cols-12 items-center p-4 rounded-lg border-l-4 border-[#ffb786] bg-[#df7412]/5 hover:bg-[#df7412]/10 transition-all cursor-pointer">
          <div className="col-span-1 flex justify-center">
            <Star className="text-[#ffb786]" size={16} fill="currentColor" />
          </div>
          <div className="col-span-2 text-xs text-[#ffb786] font-bold tracking-wider">TOMORROW</div>
          <div className="col-span-4 font-bold text-sm">Product Launch Readiness Check</div>
          <div className="col-span-3">
            <span className="px-2 py-0.5 bg-[#df7412]/20 text-[#ffb786] border border-[#ffb786]/30 rounded text-[10px] font-bold tracking-wider">MANDATORY</span>
          </div>
          <div className="col-span-2 flex justify-end">
            <ChevronRight className="text-[#c2c6d6] hover:text-[#adc6ff]" size={16} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-12 items-center p-4 rounded-lg border border-transparent hover:border-[#424754]/30 hover:bg-[#2e3545]/20 transition-all cursor-pointer">
          <div className="col-span-1 flex justify-center">
            <div className="w-1.5 h-8 rounded-full bg-[#424754]"></div>
          </div>
          <div className="col-span-2 text-xs text-[#c2c6d6]">Wednesday, 09:00</div>
          <div className="col-span-4 font-bold text-sm">Bi-Weekly Maintenance Windows</div>
          <div className="col-span-3">
            <div className="flex items-center gap-1.5 text-[#c2c6d6]">
              <Repeat size={14} />
              <span className="text-xs">Recurring</span>
            </div>
          </div>
          <div className="col-span-2 flex justify-end">
            <button className="text-[#c2c6d6] hover:text-[#adc6ff] p-1 rounded transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}