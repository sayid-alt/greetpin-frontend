"use client";

import { useState } from "react";
import { Search, Bell, History, Star } from "lucide-react";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="h-16 flex justify-between items-center px-8 bg-[#0c1322] border-b border-[#424754]/50 sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <div className={`relative w-full max-w-md rounded-full transition-all ${isFocused ? 'ring-2 ring-[#adc6ff]/20' : ''}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c2c6d6]" size={18} />
          <input
            className="w-full bg-[#141b2b] border border-[#424754]/50 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#adc6ff] transition-colors placeholder:text-[#c2c6d6]/50"
            placeholder="Search events, tags, or people..."
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#c2c6d6] hover:text-[#adc6ff] transition-all active:scale-95">
            <Bell size={20} />
          </button>
          <button className="p-2 text-[#c2c6d6] hover:text-[#adc6ff] transition-all active:scale-95">
            <History size={20} />
          </button>
          <button className="p-2 text-[#c2c6d6] hover:text-[#adc6ff] transition-all active:scale-95">
            <Star size={20} />
          </button>
        </div>
        <div className="h-8 w-[1px] bg-[#424754] mx-2"></div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#dce2f7]">Alex Rivera</p>
            <p className="text-[10px] text-[#adc6ff] font-medium">Current Event: Sync</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-[#adc6ff]/20 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG36mK3M0LYdYNhlQGnMJ8whQbGLJtHodvw4o43O9nEhiFrV4xg8Ium2nzHhBfleb3c2lqxNE1WNkL9GB60Vc5LfIkFawKKQqRU3VpV_nKraWQls-ucbyqRmZKXeYIvUgxrZ9WzVNFptY1TTP87dOcmsvNtrM0bm5B9l0PAI6a1Jhf0EEC91GiSDe5asGJVPIRxHXWOIZZfYBZy_q7MRe3Nir2trKaRW-d1EeAsSQb0JU0wqtqKR8i8L7brmypNo4oBKlWM8bRjN7n"
          />
        </div>
      </div>
    </header>
  );
}