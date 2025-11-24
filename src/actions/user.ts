'use server'

import prisma from "@/lib/prisma"
import { onboardFormSchema, onboardFormSchemaT } from "@/schemas"
import { UserJSON } from "@clerk/nextjs/server"

export async function getUserPlan(userId: string) {

    if (!userId) return "FREE"

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { plan: true },
    })

    return user?.plan || "FREE"
}

export async function onboardUser(userId: string, data: onboardFormSchemaT) {
    const validation = onboardFormSchema.safeParse(data)
    if (!validation.success) throw new Error("User data not valid")
    // const clerkUser = await currentUser()
    if (!userId) throw new Error("User not found")
    try {
        const updatedUser = await prisma.user.update({
            where: { clerkId: userId },
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

export async function upsertUserFromClerk(payload: UserJSON) {
    const email = payload.email_addresses?.[0]?.email_address || null

    if (!email) {
        throw new Error("No email found in Clerk user payload")
    }

    // Construct name from first and last name if available
    const name = payload.first_name && payload.last_name ? `${payload.first_name} ${payload.last_name}` : payload.first_name || payload.last_name || null

    // Upsert user in the database
    const user = await prisma.user.upsert({
        where: { clerkId: payload.id },
        create: {
            clerkId: payload.id,
            email,
            name,
            imageUrl: payload.image_url,
        },
        update: {
            email,
            name,
            imageUrl: payload.image_url,
        },
    })

    return user
}