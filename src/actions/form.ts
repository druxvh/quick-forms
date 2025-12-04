'use server';

import { Prisma } from '@/generated/prisma/client';
import { createFormSchema, createFormSchemaT } from '@/schemas';
import { revalidatePath } from 'next/cache';
import {
    aggregateFormStats,
    createForm,
    deleteFormById,
    getAllFormsByUserId,
    getAllFormSubmissions,
    getFormById,
    getFormCount,
    updateFormContent,
    updateFormPublishStatus,
    getFormContentByUrl,
    submitFormSubmission,
} from '@/data/forms';
import { requireUser } from './auth';

export type FormStatsType = Promise<{
    visits: number;
    submissions: number;
    submissionRate: number;
    bounceRate: number;
}>;

// gets form stats of the user
export async function getFormStatsAction(): FormStatsType {
    try {
        const user = await requireUser();

        const { visits, submissions } = await aggregateFormStats(user.id);

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
export async function createFormAction(data: createFormSchemaT) {
    //auth check
    const user = await requireUser();

    // check form limit
    const formCount = await getFormCount(user.id);

    if (user.formLimit !== -1 && formCount >= user.formLimit) {
        throw new Error(`Form limit reached. Upgrade your plan to create more forms.`);
    }
    // validate form data
    const validation = createFormSchema.safeParse(data);
    if (!validation.success) throw new Error('form not valid');

    const { name, description } = validation.data;

    try {
        const form = await createForm(user.id, name, description);
        if (!form) throw new Error('Something went wrong while creating form');
        return form.id;
    } catch (error) {
        console.error('Error while creating form:', error);
        throw error;
    }
}

// gets forms of the user
export async function getFormsAction() {
    try {
        //auth check
        const user = await requireUser();
        return await getAllFormsByUserId(user.id);
    } catch (error) {
        console.error('Error while fetching the forms...', error);
        throw error;
    }
}

// gets form by id
export async function getFormByIdAction(formId: string) {
    try {
        //auth check
        const user = await requireUser();

        return await getFormById(user.id, formId);
    } catch (error) {
        console.error('Error while fetching the form by id...', error);
        throw error;
    }
}

// update form content by id
export async function updateFormContentByIdAction(
    formId: string,
    content: Prisma.JsonValue,
) {
    try {
        //auth check
        const user = await requireUser();

        return await updateFormContent(user.id, formId, content);
    } catch (error) {
        console.error('Error while updating the form by id...', error);
        throw error;
    }
}

// publish form by id
export async function publishFormByIdAction(formId: string) {
    try {
        //auth check
        const user = await requireUser();

        // finds form and throw err if doesn't exist
        const form = await getFormById(user.id, formId);
        if (!form) throw new Error('Form not found');

        const elements = form.content;

        if (!Array.isArray(elements) || elements.length === 0) {
            throw new Error('Cannot publish empty form');
        }

        return await updateFormPublishStatus(user.id, formId);
    } catch (error) {
        console.error('Error while publishing the form...', error);
        throw error;
    }
}

// retrieve form content by public url (increments visits)
export async function getFormContentByUrlAction(formUrl: string) {
    try {
        return await getFormContentByUrl(formUrl);
    } catch (error) {
        console.error('Error fetching form content by url', error);
        throw error;
    }
}

// submit form (creates submission and increments counter)
export async function submitFormAction(
    formUrl: string,
    content: Record<string, unknown>,
) {
    try {
        // content is expected as a JS object; DAL expects Prisma.JsonValue
        return await submitFormSubmission(formUrl, content as Prisma.JsonValue);
    } catch (error) {
        console.error('Error submitting form', error);
        throw error;
    }
}

// gets form submissions by form id
export async function getFormSubmissionsAction(formId: string) {
    const user = await requireUser();

    return await getAllFormSubmissions(user.id, formId);
}

// delete form by formId
export async function deleteFormByIdAction(formId: string) {
    const user = await requireUser();
    // delete
    await deleteFormById(user.id, formId);

    revalidatePath('/dashboard');
}
