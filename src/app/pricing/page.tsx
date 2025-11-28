import prisma from "@/lib/prisma";
import PricingGrid from "@/components/PricingGrid";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProUserPricingConfirmationCard from "@/components/ProUserPricingConfirmationCard";

export default async function PricingPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const userData = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { plan: true },
    })

    return (
        userData?.plan === "FREE" ?
            <section className="w-full h-full py-12 sm:py-20 bg-gradient-to-b from-background to-muted/20 flex flex-col items-center">
                <div className="max-w-5xl w-full px-4 text-center space-y-6">
                    <h1 className="text-3xl sm:text-4xl font-bold">Simple, transparent pricing</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Choose the plan that fits your needs. Start free, upgrade anytime.
                    </p>
                </div>

                <PricingGrid userId={userId} />

                <p className="mt-10 text-xs text-muted-foreground text-center">
                    * Prices are dynamically shown in your local currency. Pro users get early access & direct support.
                </p>
            </section>
            :
            <ProUserPricingConfirmationCard />
    );
}
