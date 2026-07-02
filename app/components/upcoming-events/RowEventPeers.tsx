import { MoreVertical } from 'lucide-react';
import React from 'react';

const RowEventPeers = () => {
    return (
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
    );
};

export default RowEventPeers;