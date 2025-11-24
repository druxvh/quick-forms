import { getFormById } from "@/actions/form"
import FormBuilder from "@/components/FormBuilder"
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function BuilderPage({ params }: {
    params: {
        id: string
    }
}) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { hasOnboarded: true },
    });

    if (!user?.hasOnboarded) redirect("/onboarding");

    const { id } = await params
    const form = await getFormById(userId, id)

    if (!form) throw new Error("Form not found")

    return <FormBuilder userId={userId} form={form} />
}
