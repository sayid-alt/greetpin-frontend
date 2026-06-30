import { ArrowRight, AlertTriangle } from "lucide-react";

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#191f2f]/70 backdrop-blur-xl p-6 rounded-xl flex flex-col border border-[#424754]/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold tracking-wide">Next Event</h3>
          <ArrowRight className="text-[#adc6ff]" size={18} />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xs text-[#c2c6d6] mb-1">Starts in 1h 15m</p>
          <p className="text-md font-bold text-[#dce2f7]">Technical Debt Backlog Pruning</p>
          <p className="text-xs text-[#c2c6d6]">Cloud Infrastructure Channel</p>
        </div>
      </div>

      <div className="bg-[#191f2f]/70 backdrop-blur-xl p-6 rounded-xl flex flex-col border-l-4 border-[#ffb786] border-y border-r border-y-[#424754]/50 border-r-[#424754]/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-[#ffb786] tracking-wide">Important Notice</h3>
          <AlertTriangle className="text-[#ffb786]" size={18} />
        </div>
        <p className="text-md font-bold text-[#dce2f7]">Town Hall Attendance Required</p>
        <p className="text-xs text-[#c2c6d6] mb-4">Annual Strategy Release</p>
        <div className="mt-auto">
          <span className="px-2 py-0.5 bg-[#df7412]/20 text-[#ffb786] border border-[#ffb786]/30 rounded text-[10px] font-bold tracking-wider">PRIORITY</span>
        </div>
      </div>
    </div>
  );
}