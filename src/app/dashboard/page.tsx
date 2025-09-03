import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "../../components/CreateFormButton";
import { FormCard, FormCardSkeleton } from "@/components/FormCard";
import { StatsCardsContainer } from "@/components/StatsCard";
import { getForms, getFormStats } from "@/actions/form";

export async function FormCards() {
  const forms = await getForms()

  return forms.map((form) => (
    <FormCard key={form.id} form={form} />
  ))
}

export default async function Dashboard() {
  const stats = await getFormStats()

  return (
    <div className="w-full h-full px-4">
      <Suspense fallback={<StatsCardsContainer loading />}>
        <StatsCardsContainer loading={false} data={stats} />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-2xl font-bold ">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3].map((el) => (
            <FormCardSkeleton key={el} />
          )
          )}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
