'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { cn, formatStat } from "@/lib/utils"
import { ChartNoAxesCombined, Eye, FileText, MousePointerClick } from "lucide-react"
import { getFormStats } from "@/actions/form"

interface StatsCardProps {
    title: string
    value: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    helperText: string
    loading?: boolean
    className?: string
}

interface StatsCardsContainerProps {
    loading: boolean;
    data?: Awaited<ReturnType<typeof getFormStats>>;
}


export function StatsCard({
    title,
    value,
    icon: Icon,
    helperText,
    loading = false,
    className = ""
}: StatsCardProps) {
    return (
        <Card
            className={cn(
                "rounded-md shadow-sm flex flex-col justify-between transition hover:shadow-lg active:shadow-lg gap-1 sm:gap-4 p-2 sm:p-4",
                className
            )}
        >
            <CardHeader className="flex items-center p-0 justify-between gap-2">
                <CardTitle className="text-[11px] sm:text-xs font-medium text-muted-foreground leading-tight text-wrap truncate">
                    {title}
                </CardTitle>
                <Icon
                    className={cn(
                        "flex-shrink-0 text-gray-700 dark:text-gray-300",
                        "size-4"
                    )}
                />
            </CardHeader>

            <CardContent className="p-0">
                {loading ? (
                    <Skeleton className="h-6 w-12" />
                ) : (
                    <div className="text-lg sm:text-xl font-semibold tracking-tight">{value}</div>
                )}
            </CardContent>

            <CardFooter className="p-0 text-[11px] sm:text-xs text-muted-foreground leading-tight text-wrap truncate">
                {helperText}
            </CardFooter>
        </Card>
    )
}


export function StatsCardsContainer({ data, loading }: StatsCardsContainerProps) {

    const statsConfig = [
        {
            title: "Total Visits",
            key: "visits",
            icon: Eye,
            helperText: "All Time Form Visits",
            suffix: "",
        },
        {
            title: "Total Submissions",
            key: "submissions",
            icon: FileText,
            helperText: "All Time Submissions",
            suffix: "",
        },
        {
            title: "Submission Rate",
            key: "submissionRate",
            icon: MousePointerClick,
            helperText: "Form Submission Rate",
            suffix: "%",
        },
        {
            title: "Bounce Rate",
            key: "bounceRate",
            icon: ChartNoAxesCombined,
            helperText: "Form Bounce Rate",
            suffix: "%",
        },
    ] as const;

    return (
        <div className="w-full mt-4 sm:mt-8 gap-2 sm:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {statsConfig.map((stat) => (
                <StatsCard
                    key={stat.key}
                    title={stat.title}
                    value={formatStat(data?.[stat.key as keyof typeof data], stat.suffix)}
                    icon={stat.icon}
                    helperText={stat.helperText}
                    loading={loading}
                />
            ))}
        </div>
    );
}
