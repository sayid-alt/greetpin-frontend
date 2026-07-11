"use client";
import React, { useEffect } from 'react'

export default function useMouseDownOutside(
    ref: React.RefObject<HTMLDivElement>,
    isOpen: boolean,
    onClose: () => void
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, ref, onClose]);
}
