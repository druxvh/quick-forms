'use server-only';

import prisma from '@/lib/prisma';

/** Sets the 'published' status of a form to true. */
export async function updateFormPublishStatus(userId: string, formId: string) {
    return prisma.form.update({
        where: {
            userId,
            id: formId,
        },
        data: {
            published: true,
        },
    });
}
