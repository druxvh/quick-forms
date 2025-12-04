'use server-only';

import prisma from '@/lib/prisma';

export async function upsertUserFromClerk(
    clerkId: string,
    email: string,
    name: string,
    imageUrl: string,
) {
    return await prisma.user.upsert({
        where: { clerkId },
        create: {
            clerkId,
            email,
            name,
            imageUrl,
        },
        update: {
            email,
            name,
            imageUrl,
        },
    });
}
