import { ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { cn } from "@/lib/utils"

interface StatsCardProps {
    title: string
    value: string
    icon: ReactNode
    helperText: string
    loading: boolean
    className: string
}
export default function StatsCard({
    title,
    value,
    icon,
    helperText,
    loading,
    className
}: StatsCardProps) {
    return (
        <Card className={cn("gap-3", className)}>
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">
                    {loading
                        ?
                        value
                        :
                        (
                            <Skeleton>
                                <span>0</span>
                            </Skeleton>
                        )}
                </div>

            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
                {helperText}
            </CardFooter>
        </Card>
    )
}
