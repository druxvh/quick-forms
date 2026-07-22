import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Utility to format numeric stats consistently
 */
export const formatStat = (num?: number, suffix = ''): string => {
    if (num == null || isNaN(num)) return `0${suffix}`;
    return `${num.toLocaleString()}${suffix}`;
};

// Strip markdown + force raw JSON array output.

export function extractJSONArray(rawOutput: string) {
    try {
        // Remove markdown code fences
        let cleaned = rawOutput
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Find first array bracket
        const start = cleaned.indexOf("[");
        const end = cleaned.lastIndexOf("]");

        if (start === -1 || end === -1) {
            console.error("No valid JSON array found");
            return [];
        }

        cleaned = cleaned.slice(start, end + 1);

        return JSON.parse(cleaned);
    } catch (err) {
        console.error("Failed to parse AI JSON:", err);
        return [];
    }
}