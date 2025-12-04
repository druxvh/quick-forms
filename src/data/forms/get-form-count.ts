'use server-only';

import prisma from '@/lib/prisma';

/** Checks the current number of forms a user has created. */
export async function getFormCount(userId: string) {
    return await prisma.form.count({
        where: { userId },
    });
}
