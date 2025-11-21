import { ensureUserInDb } from "@/lib/ensure-user"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
    await ensureUserInDb()

    const { userId } = await auth()
    if (!userId) redirect("/sign-in")

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { hasOnboarded: true },
    })

    if (user?.hasOnboarded) redirect("/dashboard")

    return (
        <main>{children}</main>
    )
}

