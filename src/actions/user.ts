'use server';

import { PLAN_CONFIG, PlanTier } from '@/lib/planConfig';
import prisma from '@/lib/prisma';
import { onboardFormSchema, onboardFormSchemaT } from '@/schemas';
import { auth, UserJSON } from '@clerk/nextjs/server';

export type CurrentUser = {
    id: string;
    clerkId: string;
    email: string;
    name: string | null;
    imageUrl: string | null;
    plan: PlanTier;
    isPro: boolean;
    formLimit: number;
    hasOnboarded: boolean;
};

export async function onboardUser(userId: string, data: onboardFormSchemaT) {
    const validation = onboardFormSchema.safeParse(data);
    if (!validation.success) throw new Error('User data not valid');
    if (!userId) throw new Error('User not found');
    try {
        const updatedUser = await prisma.user.update({
            where: { clerkId: userId },
            data: {
                ...validation.data,
                hasOnboarded: true,
            },
        });

        return updatedUser;
    } catch (error) {
        console.error('Error while onboarding user...', error);
        throw error;
    }
}

export async function upsertUserFromClerk(payload: UserJSON) {
    const email = payload.email_addresses?.[0]?.email_address || null;

    if (!email) {
        throw new Error('No email found in Clerk user payload');
    }

    // Construct name from first and last name if available
    const name =
        payload.first_name && payload.last_name
            ? `${payload.first_name} ${payload.last_name}`
            : payload.first_name || payload.last_name || null;

    // Upsert user in the database
    const user = await prisma.user.upsert({
        where: { clerkId: payload.id },
        create: {
            clerkId: payload.id,
            email,
            name,
            imageUrl: payload.image_url,
        },
        update: {
            email,
            name,
            imageUrl: payload.image_url,
        },
    });

    return user;
}

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    const user = await prisma.user.findUnique({
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

    if (!user) return null;

    const plan = (user.plan || 'FREE') as PlanTier;
    const cfg = PLAN_CONFIG[plan];
    let effectiveFormLimit: number;

    if (user.formLimit === -1) {
        effectiveFormLimit = -1;
    } else if (typeof user.formLimit === 'number') {
        effectiveFormLimit = user.formLimit;
    } else {
        effectiveFormLimit = cfg.formLimit;
    }

    return {
        id: user.id,
        clerkId: user.clerkId!,
        email: user.email!,
        name: user.name,
        imageUrl: user.imageUrl,
        plan,
        isPro: cfg.isPro,
        formLimit: effectiveFormLimit,
        hasOnboarded: user.hasOnboarded,
    };
};
