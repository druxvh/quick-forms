"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ProBadgeProps = {
    variant: "pro" | "cta";
    className?: string;
};

export function ProBadge({ variant, className }: ProBadgeProps) {

    return (
        <Link href="/pricing" className="py-1">
            {variant === "pro" ? (
                <Badge
                    className={cn(
                        "h-full rounded-md bg-primary/95 text-primary-foreground",
                        "font-bold font-sans text-xs sm:text-sm px-2 sm:px-4 shadow-sm hover:bg-primary hover:shadow-2xl transition-all ",
                        className
                    )}
                >
                    PRO
                </Badge>
            ) : (
                <span
                    className={cn(
                        "group h-full flex items-center gap-1.5 text-xs sm:text-sm",
                        "bg-primary/95 text-primary-foreground",
                        "hover:bg-primary",
                        "rounded-md px-2 sm:px-3 text-xs font-bold",
                        "shadow-sm transition-all",
                        className
                    )}
                >
                    Get Pro
                    <ArrowUpRight className="hidden sm:block size-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                </span>
            )}
        </Link>
    );
}
