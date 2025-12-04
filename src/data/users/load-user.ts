'use server-only';

import { getCurrentUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';

/**
 * The definitive Guard for Server Components (Pages/Layouts).
 * This function performs the full check: Clerk Auth, DB data fetch, and Enrichment.
 * If authentication fails or the data record cannot be found/healed, it forces a redirect,
 * stopping execution safely without needing a try/catch block in the page component.
 * * @returns The fully enriched CurrentUser object.
 */
export const loadUser = cache(async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/sign-up');
    return user;
});
