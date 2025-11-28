import OnboardingForm from "@/components/OnboardingForm";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {

    const { userId } = await auth()
    if (!userId) redirect("/sign-in")

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { hasOnboarded: true },
    })

    if (user?.hasOnboarded) redirect("/dashboard")

    const userData = await currentUser();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <OnboardingForm
                userId={userId}
                fullName={userData?.fullName || ""}
                email={userData?.emailAddresses?.[0]?.emailAddress || ""}
                imageUrl={userData?.imageUrl || ""}
            />
        </div>
    );
}
