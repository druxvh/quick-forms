import { ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { cn } from "@/lib/utils"
import { ChartNoAxesCombined, Eye, FileText, MousePointerClick } from "lucide-react"
import { getFormStats } from "@/actions/form"

interface StatsCardProps {
    title: string
    value: string
    icon: ReactNode
    helperText: string
    loading: boolean
    className: string
}

interface StatsCardsContainerProps {
    loading: boolean;
    data?: Awaited<ReturnType<typeof getFormStats>>;
}


export function StatsCard({
    title,
    value,
    icon,
    helperText,
    loading,
    className
}: StatsCardProps) {
    return (
        <Card className={cn("gap-3 rounded-md", className)}>
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">
                    {loading
                        ?
                        (
                            <Skeleton>
                                <span>0</span>
                            </Skeleton>
                        )
                        :
                        value
                    }
                </div>

            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
                {helperText}
            </CardFooter>
        </Card>
    )
}


export function StatsCardsContainer(props: StatsCardsContainerProps) {
    const { data, loading } = props
    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Visits"
                value={data?.visits.toLocaleString() || ""}
                icon={<Eye className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Form Visits"
                loading={loading}
                className="shadow-md"
            />
            <StatsCard
                title="Total Submissions"
                value={data?.submissions.toLocaleString() || ""}
                icon={<FileText className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Submissions"
                loading={loading}
                className="shadow-md"
            />
            <StatsCard
                title="Total Submission Rate"
                value={data?.submissionRate.toLocaleString() + "%" || ""}
                icon={<MousePointerClick className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Submission Rate"
                loading={loading}
                className="shadow-md"
            />
            <StatsCard
                title="Total Bounce Rate"
                value={data?.bounceRate.toLocaleString() + "%" || ""}
                icon={<ChartNoAxesCombined className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Bounce Rate"
                loading={loading}
                className="shadow-md"
            />
        </div>
    )
}
