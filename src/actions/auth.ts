'use server';

import { PlanTier } from '@/lib/planConfig';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getUserByClerkId } from '@/data/users';
import { upsertUserFromClerkAction } from './user';
import { cache } from 'react';
import { enrichUserWithPlanAndFormLimit } from '@/lib/enrichUserWithLimits';
import { UserNotFoundErr } from '../lib/errors';

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

/**
 * Check's user authentication from the clerk and returns the user from the database.
 * Non-throwing, returns null if unauthenticated.
 */
export const getCurrentUser = async (): Promise<CurrentUser | null> => {
    // auth check
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    // gets user from the db
    let user = await getUserByClerkId(clerkId);

    //self heal
    // if no user in db but is a clerk user (means webhook failed or had issue)
    // so instead of throwing error, lets upsert the user so the user can use the app gracefully.
    if (!user) {
        const clerkUser = await currentUser();
        if (!clerkUser) throw new UserNotFoundErr();

        try {
            user = await upsertUserFromClerkAction(clerkUser);
        } catch (error) {
            // Handle Parallel Request Race Conditions
            // If 3 actions fire at once, one will succeed, others might fail with
            // "Unique constraint failed". If that happens, we simply try to fetch
            // the user again. It likely exists now.
            console.warn(
                'Upsert failed (likely race condition), retrying fetch...',
                error,
            );
            user = await getUserByClerkId(clerkId);
        }
    }

    if (!user) {
        throw new Error('User record could not be retrieved or created.');
    }

    // check limits, enrich it and return
    return enrichUserWithPlanAndFormLimit(user);
};

/**
 * Authorization Guard: Fetches the enriched user object (CurrentUser).
 * If the user is not authenticated or the DB record is unavailable,
 * it throws a UserNotFoundErr.
 * Used for Server Actions and Server Components that MUST have user data.
 */
export const requireUser = cache(async () => {
    const user = await getCurrentUser();

    if (!user) {
        throw new UserNotFoundErr();
    }

    return user;
});
