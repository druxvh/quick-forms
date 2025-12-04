'use server-only';

import prisma from '@/lib/prisma';

/** Aggregates form visits and submissions for a given user. */
export async function aggregateFormStats(userId: string) {
    const stats = await prisma.form.aggregate({
        where: { userId },
        _sum: {
            visits: true,
            submissions: true,
        },
    });

    const visits = stats._sum.visits ?? 0;
    const submissions = stats._sum.submissions ?? 0;

    return {
        visits,
        submissions,
    };
}
