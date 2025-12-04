'use server-only';

import prisma from '@/lib/prisma';

/** Retrieves all forms for a specific user, sorted by creation date. */
export async function getAllFormsByUserId(userId: string) {
    return await prisma.form.findMany({
        where: {
            userId,
        },
        orderBy: { createdAt: 'desc' },
    });
}
