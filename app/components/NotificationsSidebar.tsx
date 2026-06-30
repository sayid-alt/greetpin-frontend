import { SendHorizonal, CheckCircle, AlertOctagon } from "lucide-react";

export default function NotificationsSidebar() {
  return (
    <section className="bg-[#191f2f]/70 backdrop-blur-xl rounded-xl p-6 h-full border border-[#424754]/50 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold tracking-wide">Recent Notifications</h3>
        <button className="text-[#adc6ff] text-xs font-semibold hover:underline">Clear all</button>
      </div>

      <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin">
        {/* Item 1 */}
        <div className="flex gap-4 group">
          <div className="w-10 h-10 rounded-full bg-[#4d8eff]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4d8eff]/20 transition-colors">
            <SendHorizonal className="text-[#adc6ff]" size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">Event Invitation: Security Audit</p>
            <p className="text-xs text-[#c2c6d6]">2m ago • From: IT Compliance</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-[#2e3545] rounded border border-[#424754] text-[10px] font-semibold hover:bg-[#2e3545]/80">Decline</button>
              <button className="px-3 py-1 bg-[#adc6ff] text-[#002e6a] rounded text-[10px] font-bold">Accept</button>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-[#00a572]/10 flex items-center justify-center shrink-0">
            <CheckCircle className="text-[#4edea3]" size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">Completed: Client Sync</p>
            <p className="text-xs text-[#c2c6d6]">45m ago • Outcome logged</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-[#df7412]/10 flex items-center justify-center shrink-0">
            <AlertOctagon className="text-[#ffb786]" size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">Conflict Detected</p>
            <p className="text-xs text-[#c2c6d6]">1h ago • "Design Review" overlaps with "Standup"</p>
          </div>
        </div>

        {/* Image Reference Integration Area */}
        <div className="mt-8 pt-6 border-t border-[#424754]/30">
          <p className="text-xs text-[#c2c6d6] mb-3 uppercase font-bold tracking-widest">Analytics Insight</p>
          <div className="rounded-xl overflow-hidden border border-[#424754]/50 relative aspect-[1.28]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Dashboard Requirements and Architecture Map"
              className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-zoom-in"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9AoOfMtDHODalp6HKh8PJ6BV9ykbNyTUzBfdw_0P-zYmvXOdYFvMTcU0sOgL4599JaC-x93bCnNS0ueXnFALSemZGJ6L74aL9NJY8WU0iXAKBraiCLUN7WIYzzzMhNrcbcF1YOCXsBi9daTLtsYBfgTVZSlrVbozOzgzHNneANGtCM4R7PWYd6Eq-6_ZgSeXoNEjTTAFdFujdGPUXN_Of5s7eSw1L_djAAPd5S7kiNjojY3mWQv_xyGP7hf89Kao7A2ZH9lYgHzmY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322]/80 to-transparent flex items-end p-3 pointer-events-none">
              <p className="text-[9px] text-[#dce2f7]/80 truncate max-w-full">
                Architecture Reference Map
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}