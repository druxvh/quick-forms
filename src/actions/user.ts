'use server'

import prisma from "@/lib/prisma"
import { onboardFormSchema, onboardFormSchemaT } from "@/schemas"
import { currentUser } from "@clerk/nextjs/server"

export async function getUserPlan(clerkUserId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId: clerkUserId },
        select: { plan: true },
    })

    return user?.plan || "FREE"
}

export async function onboardUser(data: onboardFormSchemaT) {
    const validation = onboardFormSchema.safeParse(data)
    if (!validation.success) throw new Error("User data not valid")
    const clerkUser = await currentUser()
    if (!clerkUser) throw new Error("User not found")
    try {
        const updatedUser = await prisma.user.update({
            where: { clerkId: clerkUser.id },
            data: {
                ...validation.data,
                hasOnboarded: true,
            },
        })

        return updatedUser
    } catch (error) {
        console.error("Error while onboarding user...", error);
        throw error;
    }
}