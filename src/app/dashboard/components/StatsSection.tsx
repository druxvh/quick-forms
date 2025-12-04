import { getFormStatsAction } from '@/actions/form';
import { StatsCardsContainer } from '@/components/StatsCard';

export async function StatsSection() {
    const stats = await getFormStatsAction();

    return <StatsCardsContainer loading={false} data={stats} />;
}
