import { BellOff, ImageOff } from "lucide-react";
import ItemInfo from "./components/ItemInfo";
import { NotificationDetails } from "@/lib/config/types-config";

interface NotificationsSidebarProps {
  conflictData: NoInfer<NotificationDetails[]> | undefined | null;
  analyticsInisght: Record<string, number> | null;
}

export default function NotificationsSidebar({ 
  conflictData, 
  analyticsInisght 
} : NotificationsSidebarProps) {
  
  if (!Array.isArray(conflictData) || conflictData.length == 0) return <EmptyNotificationsSidebar />;

  return (
    <section className="bg-[#191f2f]/70 backdrop-blur-xl rounded-xl p-6 h-full border border-[#424754]/50 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold tracking-wide">Recent Notifications</h3>
        <button className="text-[#adc6ff] text-xs font-semibold hover:underline">Clear all</button>
      </div>

      <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin">

        {
          Array.isArray(conflictData) && conflictData.map((detail) => {
            return detail && <ItemInfo 
                    key={detail.id}
                    detail={detail}
                  />
          })
        }

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


export function EmptyNotificationsSidebar() {
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