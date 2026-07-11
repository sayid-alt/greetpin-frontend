import useMouseDownOutside from '@/lib/hooks/UseMouseDownOutside';
import { deleteEvents } from '@/lib/helper/api';
import { useQueryClient } from '@tanstack/react-query';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import React, { Activity, useRef, useState } from 'react'

interface RowEventButtonMoreProps {
    eventId: number
}

export default function RowEventButtonMore({ eventId } : RowEventButtonMoreProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

    // Handle Click outside of the menu component
    useMouseDownOutside(
        menuRef as React.RefObject<HTMLDivElement>, 
        isMenuOpen, 
        () => setIsMenuOpen(false)
    );

    const queryClient = useQueryClient();

    const handleDelete = async (
        e: React.MouseEvent<HTMLButtonElement>, 
        eventId: number
    ) => {
        e.stopPropagation();
        try {
            await deleteEvents(eventId);
            setIsDeleteSuccess(true);
            
            queryClient.invalidateQueries({queryKey: ["upcomingQuery"]})
        } catch (error) {
            console.log("Failed to delete data", error);
            setIsDeleteSuccess(false);
        } finally {
            setIsMenuOpen(false);
        }
    }

    return (
        <div className="col-span-2 flex justify-end relative" ref={menuRef}>
            
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering any click events on the parent row
                    setIsMenuOpen(!isMenuOpen);
                }}
                className="text-[#c2c6d6] hover:text-[#adc6ff] p-1 rounded transition-colors z-10"
            >
                <MoreVertical size={16} />
            </button>
            {/* Floating Menu */}
            <Activity mode={isMenuOpen ? "visible" : "hidden"}>
                <div className="absolute right-0 top-full mt-1 w-40 rounded-md bg-[#1e2330] border border-[#424754]/50 shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                    <button 
                        onClick={(e) => { e.stopPropagation(); alert('Edit clicked'); setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-[#c2c6d6] hover:bg-[#2e3545]/50 hover:text-white flex items-center gap-2"
                    >
                        <Edit2 size={12} />
                        Edit item
                    </button>
                    <button 
                        onClick={(e) => { handleDelete(e, eventId) }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                    >
                        <Trash2 size={12} />
                        Delete
                    </button>
                </div>
            </Activity>
        </div>
    )
}
