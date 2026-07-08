import { SendHorizonal } from 'lucide-react'
import React from 'react'

export default function ItemInvite() {
  return (
    <>
        <div className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-[#4d8eff]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4d8eff]/20 transition-colors">
                <SendHorizonal className="text-[#adc6ff]" size={18} />
            </div>
            <div>
                <p className="text-sm font-semibold">Event Invitation: Security Audit</p>
                <p className="text-xs text-[#c2c6d6]">2m ago • From: IT Compliance</p>
                <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 bg-[#2e3545] rounded border border-[#424754] text-[10px] font-semibold hover:bg-[#2e3545]/80">Decline</button>
                    <button className="px-3 py-1 bg-[#adc6ff] text-[#002e6a] rounded text-[10px] font-bold">Accept</button>
                </div>
            </div>
        </div>
    </>
  )
}
