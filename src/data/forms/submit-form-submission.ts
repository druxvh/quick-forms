'use server-only';

import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

/** Creates a new submission for a form, and atomically increments the submission count on the form. */
export async function submitFormSubmission(formUrl: string, content: Prisma.JsonValue) {
    if (!formUrl || !content) return;
    return prisma.form.update({
        where: {
            shareURL: formUrl,
            published: true,
        },
        data: {
            submissions: { increment: 1 },
            FormSubmission: {
                create: { content },
            },
        },
    });
}
