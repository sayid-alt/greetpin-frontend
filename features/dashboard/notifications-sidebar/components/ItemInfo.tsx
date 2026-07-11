import { NotificationDetails } from '@/lib/config/types-config'
import { AlertOctagon, CheckCircle, SendHorizonal } from 'lucide-react'
import React from 'react'


interface ItemInfoProps {
    detail: NotificationDetails;
}

export default function ItemInfo({ detail } : ItemInfoProps) {
    
    return (
        <>
            <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#df7412]/10 flex items-center justify-center shrink-0">
                {
                    detail.type == "CONFLICT" && 
                    <AlertOctagon className="text-[#ffb786]" size={18} />
                }
                {
                    detail.type == "INVITATION" && 
                    <SendHorizonal className="text-[#ffb786]" size={18} />
                }
                {
                    detail.type == "COMPLETED" &&
                    <CheckCircle className="text-[#ffb786]" size={18} />
                }
            </div>
            <div>
                <p className="text-sm font-semibold">{detail.title}</p>
                <p className="text-xs text-[#c2c6d6]">{detail.message}</p>
            </div>
            </div>
        </>
    )
}
