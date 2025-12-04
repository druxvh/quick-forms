'use server-only';

import { PrismaUserSubset } from '@/lib/enrichUserWithLimits';
import prisma from '@/lib/prisma';
import { cache } from 'react';

export const getUserByClerkId = cache(
    async (clerkId: string): Promise<PrismaUserSubset | null> => {
        return await prisma.user.findUnique({
            where: { clerkId },
            select: {
                id: true,
                clerkId: true,
                email: true,
                name: true,
                imageUrl: true,
                plan: true,
                formLimit: true,
                hasOnboarded: true,
            },
        });
    },
);
