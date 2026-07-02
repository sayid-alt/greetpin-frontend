export type ImportanceLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export interface ApiDataWrapper {
    data: Record<string, string | number>[]
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