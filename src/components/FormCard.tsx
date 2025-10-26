"use client"

import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Form } from "@/generated/prisma"
import { Badge } from "./ui/badge"
import { formatDistance } from "date-fns"
import { ArrowUpRight, Eye, SquarePen } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export function FormCardSkeleton() {
    return <Skeleton className="border-2 border-primary/20 h-52 w-full rounded-md" />
}

export function FormCard({ form }: { form: Form }) {
    const { id, name, published, createdAt, visits, description } = form
    return (
        <Card className="relative h-52 rounded-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 truncate">
                    <span className="truncate font-semibold">
                        {name}
                    </span>
                    {published
                        ?
                        <Badge>Published</Badge>
                        :
                        <Badge>Draft</Badge>
                    }
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    {formatDistance(createdAt, new Date(), { addSuffix: true })}
                    {published
                        && (
                            <span className="flex items-center gap-2">
                                <Eye className="size-4 text-muted-foreground" />
                                <span>{visits.toLocaleString()}</span>
                            </span>
                        )
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="h-5 truncate text-sm text-muted-foreground">
                {description || "No description"}
            </CardContent>
            <CardFooter>
                {published ?
                    <Button asChild className="w-full mt-2 text-sm gap-2">
                        <Link href={`/forms/${id}`}>
                            View submissions <ArrowUpRight />
                        </Link>
                    </Button>
                    :
                    <Button asChild className="w-full mt-2 text-sm gap-2">
                        <Link href={`/builder/${id}`}>
                            Edit Form <SquarePen />
                        </Link>
                    </Button>
                }
            </CardFooter>
        </Card>
    )
}