"use client"

import { IMPORTANCE_LEVEL_CONFIG, ImportanceLevel } from '@/app/config/componentConfig';
import { ArrowRight, Calendar } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface NextEventCardProps {
    data: Record<string, string | number>[] | undefined | null;
}

const NextEventCard = ({ data }: NextEventCardProps) => {
    const nextEvent = Array.isArray(data) ? data[0] : null;
    const [startTimeIntervalString, setStartTimeIntervalString] = useState(moment(nextEvent?.startDateTime).fromNow());

    useEffect(() => {
        const interval = setInterval(() => {
            setStartTimeIntervalString(moment(nextEvent?.startDateTime).fromNow());
        }, 1000)
        
        return () => clearInterval(interval);
    })

    const currentLevel = nextEvent?.importanceLevel || "LOW";
    const style = IMPORTANCE_LEVEL_CONFIG[currentLevel as ImportanceLevel] || IMPORTANCE_LEVEL_CONFIG.LOW;
    

    if (!Array.isArray(data) || data.length === 0) return <EmptyNextEventCard />;
    return (
        <>
            <div className="bg-[#191f2f]/70 backdrop-blur-xl p-6 rounded-xl flex flex-col border border-[#424754]/50 min-h-[160px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold tracking-wide">Next Event</h3>
                    <ArrowRight className="text-[#adc6ff]" size={18} />
                </div>
                
                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-between">
                {/* Event Details */}
                <div className="mb-4">
                    <p className="text-xs text-[#c2c6d6] mb-1">Starts {startTimeIntervalString}</p>
                    <p className="text-md font-bold text-[#dce2f7] mb-1">{nextEvent?.title}</p>
                    <p className={`text-xs text-[#c2c6d6] ${!nextEvent?.description ? "italic" : ""}`}>
                    {nextEvent?.description === "" ? "No Description" : nextEvent?.description}
                    </p>
                </div>

                {/* Dynamic Bottom Left Status */}
                <div className="flex items-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.text} ${style.border}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {currentLevel}
                    </span>
                </div>
                </div>
            </div>
        </>
    );
};


const EmptyNextEventCard = () => {
    return (
        <>
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
        </>
    );
}

export { NextEventCard, EmptyNextEventCard };