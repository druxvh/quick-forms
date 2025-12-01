import prisma from '@/lib/prisma';
import PricingGrid from '@/components/PricingGrid';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ProUserPricingConfirmationCard from '@/components/ProUserPricingConfirmationCard';

export default async function PricingPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userData = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { plan: true },
    });

    return userData?.plan === 'FREE' ? (
        <section className="from-background to-muted/20 flex h-full w-full flex-col items-center bg-gradient-to-b py-12 sm:py-20">
            <div className="w-full max-w-5xl space-y-6 px-4 text-center">
                <h1 className="text-3xl font-bold sm:text-4xl">
                    Simple, transparent pricing
                </h1>
                <p className="text-muted-foreground mx-auto max-w-xl">
                    Choose the plan that fits your needs. Start free, upgrade anytime.
                </p>
            </div>

            <PricingGrid userId={userId} />

            <p className="text-muted-foreground mt-10 text-center text-xs">
                * Prices are dynamically shown in your local currency. Pro users get early
                access & direct support.
            </p>
        </section>
    ) : (
        <ProUserPricingConfirmationCard />
    );
}
