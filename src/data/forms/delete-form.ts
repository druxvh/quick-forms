'use server-only';

import prisma from '@/lib/prisma';

/** Deletes a form document. */
export async function deleteFormById(userId: string, formId: string) {
    return await prisma.form.delete({
        where: { id: formId, userId },
    });
}
