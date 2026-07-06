
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface NextImportantCardProps {
    data: Record<string, string | number>[];
}

const NextImportantCard = ({ data } : NextImportantCardProps) => {
    const importantNext = Array.isArray(data) 
        ? data.find((row) => row.importanceLevel === "CRITICAL")
        : null;

    const [startTimeIntervalString, setStartTimeIntervalString] = useState(moment(importantNext?.startDateTime).fromNow());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setStartTimeIntervalString(moment(importantNext?.startDateTime).fromNow());
        }, 1000)
        
        return () => clearInterval(interval);
    })

    // 2. Add a guard clause so you don't render an empty box if there's no notice
    if (!importantNext) return <EmptyNextImportantCard/>;

    

    return (
        <>
            <div className="bg-[#191f2f]/70 backdrop-blur-xl p-6 rounded-xl flex flex-col border-l-4 border-[#ffb786] border-y border-r border-y-[#424754]/50 border-r-[#424754]/50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-[#ffb786] tracking-wide">Important Notice</h3>
                    <AlertTriangle className="text-[#ffb786]" size={18} />
                </div>
                <p className="text-xs text-[#c2c6d6] mb-1">Starts {startTimeIntervalString}</p>
                <p className="text-md font-bold text-[#dce2f7]">{importantNext.title}</p>
                <p className="text-xs text-[#c2c6d6] mb-4">{importantNext.description}</p>
                <div className="mt-auto">
                    <span className="px-2 py-0.5 bg-[#df7412]/20 text-[#ffb786] border border-[#ffb786]/30 rounded text-[10px] font-bold tracking-wider">PRIORITY</span>
                </div>
            </div>
        </>
    );
};

const EmptyNextImportantCard = () => {
    return (
        <>
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
        </>
    )
}

export { NextImportantCard, EmptyNextImportantCard };