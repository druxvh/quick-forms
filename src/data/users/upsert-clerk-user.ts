'use server-only';

import prisma from '@/lib/prisma';

export async function upsertUserFromClerk(
    clerkId: string,
    email: string,
    name: string,
    imageUrl: string,
) {
    return await prisma.user.upsert({
        where: { email },
        create: {
            clerkId,
            email,
            name,
            imageUrl,
        },
        update: {
            clerkId,
            // email,
            name,
            imageUrl,
        },
    });
}
