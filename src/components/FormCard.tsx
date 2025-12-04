'use client';

import { Skeleton } from './ui/skeleton';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { formatDistance } from 'date-fns';
import { ArrowUpRight, Eye, SquarePen } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Form } from '@/generated/prisma/client';
import { FormCardDropdownMenu } from './FormCardDropdownMenu';

export function FormCardSkeleton() {
    return <Skeleton className="border-primary/20 h-52 w-full rounded-md border-2" />;
}

export function FormCard({ form }: { form: Form }) {
    const { id, name, published, createdAt, visits, description } = form;
    return (
        <Card className="relative h-52 rounded-md shadow-sm transition hover:shadow-lg active:shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 truncate">
                    <span className="truncate font-semibold">{name}</span>
                    {published ? <Badge>Published</Badge> : <Badge>Draft</Badge>}
                </CardTitle>
                <CardDescription className="text-muted-foreground flex items-center justify-between text-sm">
                    {formatDistance(createdAt, new Date(), { addSuffix: true })}
                    {published && (
                        <span className="flex items-center gap-2">
                            <Eye className="text-muted-foreground size-4" />
                            <span>{visits.toLocaleString()}</span>
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground h-5 truncate text-sm">
                {description || 'No description'}
            </CardContent>
            <CardFooter className="flex gap-2">
                <div className="w-full">
                    <Button
                        asChild
                        className="w-full gap-2 truncate text-xs text-wrap sm:text-sm"
                    >
                        {published ? (
                            <Link href={`/forms/${id}`}>
                                View submissions <ArrowUpRight className="size-4" />
                            </Link>
                        ) : (
                            <Link href={`/builder/${id}`}>
                                Edit Form <SquarePen className="size-4" />
                            </Link>
                        )}
                    </Button>
                </div>
                <FormCardDropdownMenu formId={id} />
            </CardFooter>
        </Card>
    );
}
