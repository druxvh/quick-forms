'use server-only';

import prisma from '@/lib/prisma';

/** Retrieves form content based on a public URL, and atomically increments the visit count. */
export async function getFormContentByUrl(formUrl: string) {
    return prisma.form.update({
        where: {
            shareURL: formUrl,
        },
        data: {
            visits: { increment: 1 },
        },
        select: { content: true },
    });
}
