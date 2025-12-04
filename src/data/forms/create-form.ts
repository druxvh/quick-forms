'use server-only';

import prisma from '@/lib/prisma';

/** Creates a new form document in the database. */
export async function createForm(userId: string, name: string, description?: string) {
    return await prisma.form.create({
        data: {
            userId,
            name,
            description,
        },
    });
}
