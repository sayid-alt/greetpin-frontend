import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';


export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
    type: AlertType,
    title: string,
    message: string,
    duration: number,
    onClose?: () => void
}

const ALERT_TYPES = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        textColor: 'text-emerald-400',
        iconColor: 'text-emerald-400',
    },
    error: {
        icon: AlertCircle,
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/20',
        textColor: 'text-rose-400',
        iconColor: 'text-rose-400',
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        textColor: 'text-amber-400',
        iconColor: 'text-amber-400',
    },
    info: {
        icon: Info,
        bgColor: 'bg-sky-500/10',
        borderColor: 'border-sky-500/20',
        textColor: 'text-sky-400',
        iconColor: 'text-sky-400',
    },
};

export default function FloatingAlert({ 
    type = 'info', 
    title, 
    message, 
    duration = 5000, 
    onClose 
}: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        if (onClose) setTimeout(onClose, 300); // Wait for fade-out animation
    }, [onClose]);

    useEffect(() => {
        if (duration) {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);
        return () => clearTimeout(timer);
        }
    }, [duration, handleClose]);

    if (!isVisible) return null;
    
    const config = ALERT_TYPES[type] || ALERT_TYPES.info;
    const Icon = config.icon;

    return (
        <div className="fixed top-5 right-5 z-50 animate-fade-in-down">
        <div className={`w-80 sm:w-96 p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 ${config.bgColor} ${config.borderColor}`}>
            <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
                <Icon className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-semibold tracking-wide ${config.textColor}`}>
                {title}
                </h3>
                {message && (
                <p className="mt-1 text-xs text-slate-300 leading-relaxed font-medium">
                    {message}
                </p>
                )}
            </div>

            {/* Close Button */}
            <button
                onClick={handleClose}
                className="flex-shrink-0 inline-flex text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-lg p-0.5"
            >
                <span className="sr-only">Close</span>
                <X className="h-4 w-4" />
            </button>
            </div>
        </div>
        </div>
    );
}