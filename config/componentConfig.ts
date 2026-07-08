export type ImportanceLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type EventData = Record<string, string | number>

export interface ApiResponse<T> {
    success: boolean,
    message: string,
    data: T,
    timestamp: Date
}

export interface ApiDataWrapper {
    data: EventData[]
}

export interface EventDetails {
    id: number;
    title: string;
    description: string;
    url: string;
    startDateTime: string;
    endDateTime: string;
    importanceLevel: string;
    rating: number | null;
    siteCategory: string;
    journalEntry: string;
    entityId: string;
    userId: number;
}

export interface ConflictItem {
    event: EventDetails;
    conflictWithEventId: number;
}

// notification
export type TypeInfo = "CONFLICT" | "INVITATION" | "COMPLETED"

export type NotificationDetails =  {
    conflictId: string | number;
    type: TypeInfo;
    title: string;
    message: string;
}

export const IMPORTANCE_LEVEL_CONFIG = {
    CRITICAL: {
        text: "text-[#ffa085]",
        bg: "bg-[#ffa085]/10",
        border: "border-[#ffa085]/20",
        dot: "bg-[#ffa085]",
    },
    HIGH: {
        text: "text-[#9cb3f9]",
        bg: "bg-[#9cb3f9]/10",
        border: "border-[#9cb3f9]/20",
        dot: "bg-[#9cb3f9]",
    },
    MEDIUM: {
        text: "text-[#29c288]",
        bg: "bg-[#29c288]/10",
        border: "border-[#29c288]/20",
        dot: "bg-[#29c288]",
    },
    LOW: {
        text: "text-[#a2a8b6]",
        bg: "bg-[#a2a8b6]/10",
        border: "border-[#a2a8b6]/20",
        dot: "bg-[#a2a8b6]",
    },
};