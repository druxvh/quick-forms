import { getFormStats } from '@/actions/form';
import { StatsCardsContainer } from '@/components/StatsCard';

export async function StatsSection() {
    const stats = await getFormStats();

    return <StatsCardsContainer loading={false} data={stats} />;
}
