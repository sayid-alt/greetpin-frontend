import { MapPin, Users, MessageSquarePlus, Map, CheckCircle2 } from "lucide-react";

export default function CurrentEventCard() {
  return (
    <section className="relative rounded-xl overflow-hidden bg-[#191f2f]/70 backdrop-blur-xl border border-[#463545]/50 p-6 shadow-[0_0_20px_-5px_rgba(78,222,163,0.1)] hover:shadow-[0_0_20px_-5px_rgba(78,222,163,0.3)] transition-all duration-300">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#4edea3]"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-xs text-[#4edea3] font-bold tracking-wider">ONGOING</span>
            <span className="text-xs text-[#c2c6d6]">• Started 45m ago</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Q3 Strategic Roadmap Review</h2>
          <div className="flex flex-wrap gap-4 text-[#c2c6d6] mb-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span className="text-sm">Main Boardroom (or Virtual)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={16} />
              <span className="text-sm">Architecture Team, Stakeholders</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-[#2e3545] hover:bg-[#2e3545]/80 px-4 py-2 rounded-md flex items-center gap-2 transition-colors border border-[#424754]/30 text-xs font-semibold">
            <MessageSquarePlus size={14} />
            Add Description
          </button>
          <button className="bg-[#2e3545] hover:bg-[#2e3545]/80 px-4 py-2 rounded-md flex items-center gap-2 transition-colors border border-[#424754]/30 text-xs font-semibold">
            <Map size={14} />
            Google Maps
          </button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-[#424754]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs text-[#c2c6d6] mb-2 uppercase tracking-wider font-bold">Institutional Relationships</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-[#4d8eff]/10 text-[#adc6ff] border border-[#adc6ff]/30 rounded text-xs font-medium">Global Ops</span>
            <span className="px-2 py-1 bg-[#4d8eff]/10 text-[#adc6ff] border border-[#adc6ff]/30 rounded text-xs font-medium">Design Lab</span>
            <span className="px-2 py-1 bg-[#4d8eff]/10 text-[#adc6ff] border border-[#adc6ff]/30 rounded text-xs font-medium">+2 More</span>
          </div>
        </div>
        <button className="bg-[#00a572] text-[#00311f] px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all text-sm self-end sm:self-auto">
          <CheckCircle2 size={16} />
          Mark as Complete
        </button>
      </div>
    </section>
  );
}