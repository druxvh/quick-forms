'use server-only';

import prisma from '@/lib/prisma';

/** Retrieves unique form of the user by formId */
export async function getFormById(userId: string, formId: string) {
    return await prisma.form.findUnique({
        where: {
            userId,
            id: formId,
        },
    });
}
