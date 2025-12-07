'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { ShimmerButton } from '../ui/shimmer-button';
import { ZapIcon } from 'lucide-react';

type ProBadgeProps = {
    variant: 'pro' | 'cta';
    className?: string;
};

export function ProBadge({ variant, className }: ProBadgeProps) {
    return (
        <Link href="/pricing">
            {variant === 'pro' ? (
                <ShimmerButton className="bg-primary text-primary-foreground h-full text-center text-xs font-semibold sm:text-sm">
                    PRO
                </ShimmerButton>
            ) : (
                <Button className="flex h-full items-center gap-1.5 bg-transparent bg-linear-to-r from-amber-600 via-amber-600/60 to-amber-600 bg-size-[200%_auto] px-4 py-2 text-xs text-white hover:bg-transparent hover:bg-position-[99%_center] focus-visible:ring-amber-600/20 sm:text-sm dark:from-amber-400 dark:via-amber-400/60 dark:to-amber-400 dark:focus-visible:ring-amber-400/40">
                    Upgrade <ZapIcon className="hidden size-4 sm:block" />
                </Button>
            )}
        </Link>
    );
}
