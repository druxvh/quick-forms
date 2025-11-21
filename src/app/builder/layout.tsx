import Navbar from "@/components/Navbar"
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { hasOnboarded: true },
    });

    if (!user?.hasOnboarded) redirect("/onboarding");

    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <Navbar />
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}

