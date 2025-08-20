"use server"

import prisma from "@/lib/prisma"
import { formSchema, formSchemaType } from "@/schemas/form"
import { currentUser } from "@clerk/nextjs/server"

class UserNotFoundErr extends Error {
    constructor() {
        super("User not authenticated")
        this.name = "UserNotFoundError"
    }
}

// gets form stats of the user
export async function getFormStats(): Promise<{
    visits: number
    submissions: number
    submissionRate: number
    bounceRate: number
}> {
    try {
        const user = await currentUser()

        if (!user) throw new UserNotFoundErr()

        const stats = await prisma.form.aggregate({
            where: { userId: user.id },
            _sum: {
                visits: true,
                submissions: true
            }
        })

        const visits = stats._sum.visits ?? 0
        const submissions = stats._sum.submissions ?? 0

        const submissionRate = visits > 0
            ? Number(((submissions / visits) * 100).toFixed(2))
            : 0

        const bounceRate = 100 - submissionRate

        return {
            visits,
            submissions,
            submissionRate,
            bounceRate
        }
    }
    catch (error) {
        console.error("[GET_FORM_STATS_ERROR]", error)
        return {
            visits: 0,
            submissions: 0,
            submissionRate: 0,
            bounceRate: 0
        }
    }
}

// creates form for every unique user
export async function createForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data)
    if (!validation.success) throw new Error("form not valid")

    const user = await currentUser()
    if (!user) throw new UserNotFoundErr()

    const { name, description } = data

    try {
        const form = await prisma.form.create({
            data: {
                userId: user.id,
                name,
                description
            }
        })
        if (!form) throw new Error("Something went wrong")
        return form.id
    } catch (error) {
        console.error("Full error:", error);
        throw error;
    }
}

// gets forms of the user
export async function getForms() {

    try {
        const user = await currentUser()
        if (!user) throw new UserNotFoundErr()

        const forms = await prisma.form.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        });

        return forms
    } catch (error) {
        console.error("Error while fetching the forms...", error);
        throw error;
    }
}

// gets form by id
export async function getFormById(id: number) {
    try {
        const user = await currentUser()
        if (!user) throw new UserNotFoundErr()

        return await prisma.form.findUnique({
            where: {
                userId: user.id,
                id: id
            }
        })
    } catch (error) {
        console.error("Error while fetching the form by id...", error);
        throw error;
    }
}

// update form content by id
export async function updateFormContentById(id: number, jsonContent: string) {
    try {
        const user = await currentUser()
        if (!user) throw new UserNotFoundErr()

        return await prisma.form.update({
            where: {
                userId: user.id,
                id
            },
            data: {
                content: jsonContent
            }
        })
    } catch (error) {
        console.error("Error while updating the form by id...", error);
        throw error;
    }
}