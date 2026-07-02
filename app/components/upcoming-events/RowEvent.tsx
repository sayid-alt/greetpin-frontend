import { MoreVertical, Repeat } from 'lucide-react';
import React from 'react';

const RowEvent = () => {
    return (
        <>
            <div className="col-span-1 flex justify-center">
                <div className="w-1.5 h-8 rounded-full bg-[#424754]"></div>
            </div>
            <div className="col-span-2 text-xs text-[#c2c6d6]">Wednesday, 09:00</div>
            <div className="col-span-4 font-bold text-sm">Bi-Weekly Maintenance Windows</div>
            <div className="col-span-3">
                <div className="flex items-center gap-1.5 text-[#c2c6d6]">
                <Repeat size={14} />
                <span className="text-xs">Recurring</span>
                </div>
            </div>
            <div className="col-span-2 flex justify-end">
                <button className="text-[#c2c6d6] hover:text-[#adc6ff] p-1 rounded transition-colors">
                <MoreVertical size={16} />
                </button>
            </div>
        </>
    );
};

export default RowEvent;