import { getFormStats } from '@/actions/form';
import { StatsCardsContainer } from '@/components/StatsCard';

export async function StatsSection({ userId }: { userId: string }) {
    const stats = await getFormStats(userId);

    return <StatsCardsContainer loading={false} data={stats} />;
}
