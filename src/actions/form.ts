'use server';

import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import { createFormSchema, createFormSchemaT } from '@/schemas';
import { getCurrentUser } from './user';

class UserNotFoundErr extends Error {
    constructor() {
        super('User not authenticated');
        this.name = 'UserNotFoundError';
    }
}

// gets form stats of the user
export async function getFormStats(): Promise<{
    visits: number;
    submissions: number;
    submissionRate: number;
    bounceRate: number;
}> {
    try {
        //auth check
        const user = await getCurrentUser();
        if (!user) throw new UserNotFoundErr();

        const stats = await prisma.form.aggregate({
            where: { userId: user.id },
            _sum: {
                visits: true,
                submissions: true,
            },
        });

        const visits = stats._sum.visits ?? 0;
        const submissions = stats._sum.submissions ?? 0;

        let submissionRate = 0;
        if (visits > 0) {
            submissionRate = Number(((submissions / visits) * 100).toFixed(2));
            if (submissionRate > 100) submissionRate = 100;
            if (submissionRate < 0) submissionRate = 0;
        }

        const bounceRate = visits > 0 ? Number((100 - submissionRate).toFixed(2)) : 0;

        return {
            visits,
            submissions,
            submissionRate,
            bounceRate,
        };
    } catch (error) {
        console.error('[GET_FORM_STATS_ERROR]', error);
        return {
            visits: 0,
            submissions: 0,
            submissionRate: 0,
            bounceRate: 0,
        };
    }
}

// creates form for every unique user
export async function createForm(data: createFormSchemaT) {
    //auth check
    const user = await getCurrentUser();
    if (!user) throw new UserNotFoundErr();

    // check form limit
    const formCount = await prisma.form.count({
        where: { userId: user.id },
    });

    if (user.formLimit !== -1 && formCount >= user.formLimit) {
        throw new Error(`Form limit reached. Upgrade your plan to create more forms.`);
    }
    // validate form data
    const validation = createFormSchema.safeParse(data);
    if (!validation.success) throw new Error('form not valid');

    const { name, description } = validation.data;
    // create form
    try {
        const form = await prisma.form.create({
            data: {
                userId: user.id,
                name,
                description,
            },
        });
        if (!form) throw new Error('Something went wrong');
        return form.id;
    } catch (error) {
        console.error('Full error:', error);
        throw error;
    }
}

// gets forms of the user
export async function getForms() {
    try {
        //auth check
        const user = await getCurrentUser();
        if (!user) throw new UserNotFoundErr();

        const forms = await prisma.form.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });

        return forms;
    } catch (error) {
        console.error('Error while fetching the forms...', error);
        throw error;
    }
}

// gets form by id
export async function getFormById(formId: string) {
    try {
        //auth check
        const user = await getCurrentUser();
        if (!user) throw new UserNotFoundErr();

        return await prisma.form.findUnique({
            where: {
                userId: user.id,
                id: formId,
            },
        });
    } catch (error) {
        console.error('Error while fetching the form by id...', error);
        throw error;
    }
}

// update form content by id
export async function updateFormContentById(formId: string, content: Prisma.JsonValue) {
    if (!content || !formId) {
        throw new Error('params cannot be empty');
    }

    try {
        //auth check
        const user = await getCurrentUser();
        if (!user) throw new UserNotFoundErr();

        return await prisma.form.update({
            where: {
                userId: user.id,
                id: formId,
            },
            data: {
                content,
            },
        });
    } catch (error) {
        console.error('Error while updating the form by id...', error);
        throw error;
    }
}

// publish form by id
export async function publishFormById(formId: string) {
    try {
        if (!formId) throw new Error('Form id not found');

        //auth check
        const user = await getCurrentUser();
        if (!user) throw new UserNotFoundErr();

        // finds form and throw err if doesn't exist
        const form = await prisma.form.findUnique({ where: { id: formId } });
        if (!form) throw new Error('Form not found');

        const elements = form.content;

        if (!Array.isArray(elements) || elements.length === 0) {
            throw new Error('Cannot publish empty form');
        }

        return await prisma.form.update({
            where: {
                userId: user.id,
                id: formId,
            },
            data: {
                published: true,
            },
        });
    } catch (error) {
        console.error('Error while publishing the form...', error);
        throw error;
    }
}

// gets and returns form content by form url
export async function getFormContentByUrl(formUrl: string) {
    if (!formUrl) throw new Error('No Form Url Present');

    return await prisma.form.update({
        select: {
            content: true,
        },
        data: {
            visits: { increment: 1 },
        },
        where: {
            shareURL: formUrl,
        },
    });
}

// submits form
export async function submitForm(formUrl: string, content: Prisma.JsonValue) {
    if (!content || !formUrl) {
        throw new Error('params cannot be empty');
    }

    return await prisma.form.update({
        data: {
            submissions: {
                increment: 1,
            },
            FormSubmission: {
                create: {
                    content,
                },
            },
        },
        where: {
            shareURL: formUrl,
            published: true,
        },
    });
}

// gets form submissions by form id
export async function getFormSubmissions(formId: string) {
    //auth check
    const user = await getCurrentUser();
    if (!user) throw new UserNotFoundErr();

    return await prisma.form.findUnique({
        where: { id: formId },
        include: {
            FormSubmission: true,
        },
    });
}
