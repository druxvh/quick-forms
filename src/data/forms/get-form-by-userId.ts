'use server-only';

import prisma from '@/lib/prisma';

/** Retrieves a single form by its ID, ensuring it belongs to the user. */
export async function getFormByUserId(userId: string, formId: string) {
    return await prisma.form.findUnique({
        where: {
            userId,
            id: formId,
        },
    });
}
