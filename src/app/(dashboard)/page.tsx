import StatsCardsContainer from "@/components/StatsCardsContainer";
import { getFormStats } from "../../../actions/form";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "../../components/CreateFormButton";

export default async function Home() {
  const stats = await getFormStats()
  return (
    <div className="w-full h-full px-4">
      <Suspense fallback={<StatsCardsContainer loading />}>
        <StatsCardsContainer loading={false} data={stats} />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-2xl font-bold ">Your Forms</h2>
      <Separator className="my-6" />
      <CreateFormButton />
    </div>
  );
}
