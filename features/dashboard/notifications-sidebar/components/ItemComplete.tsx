import { CheckCircle } from 'lucide-react'
import React from 'react'

export default function ItemComplete() {
    return (
        <>
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#00a572]/10 flex items-center justify-center shrink-0">
                <CheckCircle className="text-[#4edea3]" size={18} />
            </div>
            <div>
                <p className="text-sm font-semibold">Completed: Client Sync</p>
                <p className="text-xs text-[#c2c6d6]">45m ago • Outcome logged</p>
            </div>
            </div>
        </>
    )
}
