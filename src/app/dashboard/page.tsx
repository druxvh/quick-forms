import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "../../components/CreateFormButton";
import { FormCardSkeleton } from "@/components/FormCard";
import { StatsCardsContainer } from "@/components/StatsCard";
import { StatsSection } from "./components/StatsSection";
import { FormsGrid } from "./components/FormsGrid";
import DashboardHeader from "./components/DashboardHeader";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {

  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { hasOnboarded: true },
  })

  if (!user?.hasOnboarded) redirect("/onboarding")

  return (
    <div className="w-full h-full px-4">

      {/* Stats Section */}
      <Suspense fallback={<StatsCardsContainer loading />}>
        <StatsSection userId={userId} />
      </Suspense>

      <Separator className="my-4 sm:my-6" />
      <DashboardHeader title="Your Forms" />
      <Separator className="my-4 sm:my-6" />

      {/* Forms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CreateFormButton userId={userId} />
        <Suspense
          fallback={[1, 2].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormsGrid userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}
