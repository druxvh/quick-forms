'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProBadgeProps = {
    variant: 'pro' | 'cta';
    className?: string;
};

export function ProBadge({ variant, className }: ProBadgeProps) {
    return (
        <Link href="/pricing" className="py-1">
            {variant === 'pro' ? (
                <Badge
                    className={cn(
                        'bg-primary/95 text-primary-foreground h-full rounded-md',
                        'hover:bg-primary px-2 font-sans text-xs font-bold shadow-sm transition-all hover:shadow-2xl sm:px-4 sm:text-sm',
                        className,
                    )}
                >
                    PRO
                </Badge>
            ) : (
                <span
                    className={cn(
                        'group flex h-full items-center gap-1.5 text-xs sm:text-sm',
                        'bg-primary/95 text-primary-foreground',
                        'hover:bg-primary',
                        'rounded-md px-2 text-xs font-bold sm:px-3',
                        'shadow-sm transition-all',
                        className,
                    )}
                >
                    Get Pro
                    <ArrowUpRight className="hidden size-4 transition-transform group-hover:translate-x-px group-hover:-translate-y-px sm:block" />
                </span>
            )}
        </Link>
    );
}
