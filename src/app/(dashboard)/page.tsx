import StatsCardsContainer from "@/components/StatsCardsContainer";
import { getFormStats } from "../../../actions/form";
import { Suspense } from "react";

export default async function Home() {
  const stats = await getFormStats()
  return (
    <div className="w-full h-full px-4">
      <Suspense fallback={<StatsCardsContainer loading />}>
        <StatsCardsContainer loading={false} data={stats} />
      </Suspense>
    </div>
  );
}
