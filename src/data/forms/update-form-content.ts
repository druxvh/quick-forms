'use server-only';

import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

/** Updates the JSON content of a specific form. */
export async function updateFormContent(
    userId: string,
    formId: string,
    content: Prisma.JsonValue,
) {
    if (!content) return;
    return await prisma.form.update({
        where: { userId, id: formId },
        data: { content },
    });
}
