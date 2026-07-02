import { Calendar, ShieldCheck } from "lucide-react";

export default function NoMetricsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Empty Next Event Card */}
        <div className="bg-[#191f2f]/40 backdrop-blur-xl p-6 rounded-xl flex flex-col border border-[#424754]/30 min-h-[160px] justify-between">
            <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold tracking-wide text-[#c2c6d6]/50">Next Event</h3>
            <Calendar className="text-[#c2c6d6]/30" size={18} />
            </div>
            <div className="flex-1 flex flex-col justify-center py-2">
            <p className="text-sm font-semibold text-[#c2c6d6]/60">Your schedule is wide open</p>
            <p className="text-xs text-[#c2c6d6]/40 mt-1">No upcoming sessions lined up for today.</p>
            </div>
        </div>

        {/* Empty Important Notice Card */}
        <div className="bg-[#191f2f]/40 backdrop-blur-xl p-6 rounded-xl flex flex-col border-l-4 border-[#424754]/40 border-y border-r border-y-[#424754]/30 border-r-[#424754]/30 min-h-[160px] justify-between">
            <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-[#c2c6d6]/50 tracking-wide">Important Notice</h3>
            <ShieldCheck className="text-[#c2c6d6]/30" size={18} />
            </div>
            <div className="flex-1 flex flex-col justify-center py-2">
            <p className="text-sm font-semibold text-[#c2c6d6]/60">All Caught Up</p>
            <p className="text-xs text-[#c2c6d6]/40 mt-1">No urgent alerts or required actions at this time.</p>
            </div>
            <div className="mt-auto pt-2">
            <span className="px-2 py-0.5 bg-[#424754]/20 text-[#c2c6d6]/40 border border-[#424754]/30 rounded text-[10px] font-bold tracking-wider">CLEAR</span>
            </div>
        </div>
        </div>
    );
}