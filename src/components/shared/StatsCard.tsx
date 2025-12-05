'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface StatsCardProps {
    title: string;
    value: string;
    // Accept either a component (e.g. Eye) or an instantiated element (e.g. <Eye />)
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactElement;
    helperText: string;
    loading?: boolean;
    className?: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    helperText,
    loading = false,
    className = '',
}: StatsCardProps) {
    return (
        <Card
            className={cn(
                'flex flex-col justify-between gap-1 rounded-md p-2 shadow-sm transition hover:shadow-lg active:shadow-lg sm:gap-4 sm:p-4',
                className,
            )}
        >
            <CardHeader className="flex items-center justify-between gap-2 p-0">
                <CardTitle className="text-muted-foreground truncate text-[11px] leading-tight font-medium text-wrap sm:text-xs">
                    {title}
                </CardTitle>
                {/* Support both component and element icons. If an element was passed
                    (e.g. icon={<Eye />}) render it directly. If a component was
                    passed (e.g. icon={Eye}) instantiate it with the expected className. */}
                {React.isValidElement(Icon) ? (
                    Icon
                ) : (
                    <Icon
                        className={cn(
                            'shrink-0 text-gray-700 dark:text-gray-300',
                            'size-4',
                        )}
                    />
                )}
            </CardHeader>

            <CardContent className="p-0">
                {loading ? (
                    <Skeleton className="h-6 w-2/3" />
                ) : (
                    <div className="text-lg font-semibold tracking-tight sm:text-xl">
                        {value}
                    </div>
                )}
            </CardContent>

            <CardFooter className="text-muted-foreground truncate p-0 text-[11px] leading-tight text-wrap sm:text-xs">
                {helperText}
            </CardFooter>
        </Card>
    );
}
