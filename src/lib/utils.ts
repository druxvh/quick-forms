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
