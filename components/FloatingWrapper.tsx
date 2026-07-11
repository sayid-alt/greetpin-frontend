import { X } from 'lucide-react'
import React from 'react'
import { createPortal } from 'react-dom' // 1. Import createPortal

interface FloatingWrapperProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function FloatingWrapper({
    children, 
    isOpen, 
    onClose
} : FloatingWrapperProps ) {
    if (!isOpen) return null;

    // 2. Wrap the JSX in createPortal and send it to document.body
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-[#141b2b] border border-[#424754]/70 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto">
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {children}
            </div>  
        </div>,
        document.body // This forces it to render at the top level of the DOM
    )
}