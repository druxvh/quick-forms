import { getFormStatsAction } from '@/actions/form';
import { DashboardStatsCardsContainer } from '../shared/StatsCardsContainer';

export async function StatsSection() {
    const stats = await getFormStatsAction();

    return <DashboardStatsCardsContainer loading={false} data={stats} />;
}
