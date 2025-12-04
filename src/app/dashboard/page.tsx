import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';
import CreateFormButton from '../../components/CreateFormButton';
import { FormCardSkeleton } from '@/components/FormCard';
import { StatsCardsContainer } from '@/components/StatsCard';
import { StatsSection } from './components/StatsSection';
import { FormsGrid } from './components/FormsGrid';
import DashboardHeader from './components/DashboardHeader';
import { redirect } from 'next/navigation';
import UpgradeFormLimitCard from '@/components/UpgradeFormLimitCard';
import { getFormsAction } from '@/actions/form';
import { loadUser } from '@/data/users';

export default async function Dashboard() {
    const user = await loadUser();
    if (!user.hasOnboarded) redirect('/onboarding');

    const forms = await getFormsAction();
    const formCount = forms.length;

    const canCreateMore = user.formLimit === -1 || formCount < user.formLimit;

    return (
        <div className="h-full w-full px-4">
            {/* Stats Section */}
            <Suspense fallback={<StatsCardsContainer loading />}>
                <StatsSection />
            </Suspense>

            <Separator className="my-4 sm:my-6" />
            <DashboardHeader title="Your Forms" />
            <Separator className="my-4 sm:my-6" />

            {/* Forms Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {/* form limit */}
                {canCreateMore ? <CreateFormButton /> : <UpgradeFormLimitCard />}

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
