import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "../../components/CreateFormButton";
import { FormCardSkeleton } from "@/components/FormCard";
import { StatsCardsContainer } from "@/components/StatsCard";
import { StatsSection } from "./components/StatsSection";
import { FormsGrid } from "./components/FormsGrid";
import DashboardHeader from "./components/DashboardHeader";


export default function Dashboard() {

  return (
    <div className="w-full h-full px-4">

      {/* Stats Section */}
      <Suspense fallback={<StatsCardsContainer loading />}>
        <StatsSection />
      </Suspense>

      <Separator className="my-4 sm:my-6" />
      <DashboardHeader title="Your Forms" />
      <Separator className="my-4 sm:my-6" />

      {/* Forms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormsGrid />
        </Suspense>
      </div>
    </div>
  );
}
