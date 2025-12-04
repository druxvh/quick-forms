'use server-only';

import prisma from '@/lib/prisma';

/** Retrieves a user form and all its submissions. */
export async function getAllFormSubmissions(userId: string, formId: string) {
    return await prisma.form.findUnique({
        where: { userId, id: formId },
        include: { FormSubmission: true },
    });
}
