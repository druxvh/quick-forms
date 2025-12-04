'use server-only';

import prisma from '@/lib/prisma';
import { onboardFormSchemaT } from '@/schemas';

export async function updateUserOnboarding(clerkId: string, data: onboardFormSchemaT) {
    return await prisma.user.update({
        where: { clerkId },
        data: { ...data, hasOnboarded: true },
    });
}
