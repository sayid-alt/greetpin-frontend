import { ChevronRight, Star } from 'lucide-react';
import React from 'react';

const RowEventHighlighted = () => {
    return (
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
    );
};

export default RowEventHighlighted;