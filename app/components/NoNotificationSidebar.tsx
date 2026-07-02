import { BellOff, ImageOff } from "lucide-react";

export default function NoNotificationsSidebar() {
    return (
        <section className="bg-[#191f2f]/40 backdrop-blur-xl rounded-xl p-6 h-full border border-[#424754]/40 flex flex-col transition-all duration-300">
        {/* Header - Preserved for visual structure */}
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold tracking-wide text-[#c2c6d6]/50">Recent Notifications</h3>
            <button className="text-[#c2c6d6]/30 text-xs font-semibold cursor-not-allowed select-none" disabled>
            Clear all
            </button>
        </div>

        {/* Main Container Area */}
        <div className="flex-1 flex flex-col justify-between">
            {/* Empty Notifications Message */}
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#2e3545]/30 flex items-center justify-center mb-4 border border-[#424754]/30">
                <BellOff className="text-[#c2c6d6]/40" size={20} />
            </div>
            <p className="text-sm font-semibold text-[#c2c6d6]/60 mb-1">Inbox is all clear</p>
            <p className="text-xs text-[#c2c6d6]/40 max-w-[200px]">
                We will let you know when new updates or alerts arrive.
            </p>
            </div>

            {/* Analytics Insight Placeholder Area */}
            <div className="mt-auto pt-6 border-t border-[#424754]/20">
            <p className="text-xs text-[#c2c6d6]/40 mb-3 uppercase font-bold tracking-widest">Analytics Insight</p>
            <div className="rounded-xl overflow-hidden border border-[#424754]/20 bg-[#2e3545]/10 relative aspect-[1.28] flex flex-col items-center justify-center">
                <ImageOff className="text-[#c2c6d6]/20 mb-1" size={20} />
                <p className="text-[10px] text-[#c2c6d6]/30">
                No Reference Map Available
                </p>
            </div>
            </div>
        </div>
        </section>
    );
}