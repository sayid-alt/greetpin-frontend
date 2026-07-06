import { Plus } from "lucide-react";
import Link from "next/link";

export default function FloatingActionButton() {
  return (
      <Link href="/schedule" className="fixed bottom-8 right-8 w-14 h-14 bg-[#adc6ff] text-[#002e6a] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <Plus className="group-hover:rotate-90 transition-transform duration-300" size={28} />
        <span className="absolute right-16 bg-[#2e3545] px-3 py-2 border border-[#424754] rounded text-xs text-[#dce2f7] font-semibold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-md">
          Quick Schedule
        </span>
      </Link>
  );
}