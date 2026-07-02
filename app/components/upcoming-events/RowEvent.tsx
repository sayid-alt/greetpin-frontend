"use client"
import { MoreVertical } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';


interface RowEventProps {
    row: Record<string, string | number>
}

const RowEvent = ({ row }: RowEventProps) => {
    const {importanceLevel, startDateTime, title} = row;

    const [dateNow, setDateNow] = useState<number>(moment().date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateNow(Date.now());
        }, 1000)

        return () => clearInterval(interval);
    }, [])

    const startDateTimemili = new Date(startDateTime).getTime();
    const eventDayIntervalMili = startDateTimemili - dateNow;
    const eventDayIntervalHours = eventDayIntervalMili / 8400000;


    const statTime = eventDayIntervalHours <= 24 ?
        moment().add(eventDayIntervalMili, "milliseconds").calendar() : 
        moment(startDateTime).format("Do MMM YY")

    return (
        <div className="grid grid-cols-12 items-center p-4 rounded-lg border border-transparent hover:border-[#424754]/30 hover:bg-[#2e3545]/20 transition-all cursor-pointer">
            <div className="col-span-1 flex justify-center">
                <div className="w-1.5 h-8 rounded-full bg-[#424754]"></div>
            </div>
            <div className="col-span-3 text-xs text-[#c2c6d6]">{statTime}</div>
            <div className="col-span-4 font-bold text-sm">{title}</div>
            <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-[#c2c6d6]">
                    <span className="text-xs">{importanceLevel}</span>
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

export default RowEvent;