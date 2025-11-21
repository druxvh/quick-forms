import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

// TEMPORARY:
// Ensures that the current Clerk user exists in the database.
export async function ensureUserInDb() {
    const clerkUser = await currentUser()

    if (!clerkUser?.id) return

    const email = clerkUser.emailAddresses[0].emailAddress ?? null
    const firstName = clerkUser.firstName
    const lastName = clerkUser.lastName
    const name = [firstName, lastName].filter(Boolean).join(" ") || null

    return await prisma.user.upsert({
        where: { clerkId: clerkUser.id },
        update: { email, name },
        create: { clerkId: clerkUser.id, email, name }
    })
}