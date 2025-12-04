'use server';

import { updateUserOnboarding, upsertUserFromClerk } from '@/data/users';
import { onboardFormSchema, onboardFormSchemaT } from '@/schemas';
import { User, UserJSON } from '@clerk/nextjs/server';

export async function onboardUserAction(clerkId: string, data: onboardFormSchemaT) {
    const validation = onboardFormSchema.safeParse(data);
    if (!validation.success) throw new Error('User data not valid');
    if (!clerkId) throw new Error('User not found');
    try {
        return await updateUserOnboarding(clerkId, validation.data);
    } catch (error) {
        console.error('Error while onboarding user...', error);
        throw error;
    }
}

// upserts the clerk user to the db from the webhook
export async function upsertUserFromClerkWebhookAction(clerkUserData: UserJSON) {
    const email = clerkUserData.email_addresses?.[0]?.email_address || null;

    if (!email) {
        throw new Error('No email found in Clerk user data');
    }

    // Construct name from first and last name if available
    const name =
        clerkUserData.first_name && clerkUserData.last_name
            ? `${clerkUserData.first_name} ${clerkUserData.last_name}`
            : clerkUserData.first_name || clerkUserData.last_name || '';

    // Upsert user in the database
    return await upsertUserFromClerk(
        clerkUserData.id,
        email,
        name,
        clerkUserData.image_url,
    );
}

// upserts the clerk user to the db (usually if webhook fails)
export async function upsertUserFromClerkAction(clerkUserData: User) {
    const email = clerkUserData.emailAddresses?.[0]?.emailAddress || null;

    if (!email) {
        throw new Error('No email found in Clerk user data');
    }

    // Construct name from first and last name if available
    const name =
        clerkUserData.firstName && clerkUserData.lastName
            ? `${clerkUserData.firstName} ${clerkUserData.lastName}`
            : clerkUserData.firstName || clerkUserData.lastName || '';

    // Upsert user in the database
    return await upsertUserFromClerk(
        clerkUserData.id,
        email,
        name,
        clerkUserData.imageUrl,
    );
}
