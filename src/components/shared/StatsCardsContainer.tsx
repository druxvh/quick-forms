'use client';

import { getFormStatsAction } from '@/actions/form';
import { ChartNoAxesCombined, Eye, FileText, MousePointerClick } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { formatStat } from '@/lib/utils';

type StatsCardsContainerProps = {
    loading: boolean;
    data?: Awaited<ReturnType<typeof getFormStatsAction>>;
};

export function DashboardStatsCardsContainer({
    data,
    loading,
}: StatsCardsContainerProps) {
    const statsConfig = [
        {
            title: 'Total Visits',
            key: 'visits',
            icon: Eye,
            helperText: 'All Time Form Visits',
            suffix: '',
        },
        {
            title: 'Total Submissions',
            key: 'submissions',
            icon: FileText,
            helperText: 'All Time Submissions',
            suffix: '',
        },
        {
            title: 'Submission Rate',
            key: 'submissionRate',
            icon: MousePointerClick,
            helperText: 'Form Submission Rate',
            suffix: '%',
        },
        {
            title: 'Bounce Rate',
            key: 'bounceRate',
            icon: ChartNoAxesCombined,
            helperText: 'Form Bounce Rate',
            suffix: '%',
        },
    ] as const;

    return (
        <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {statsConfig.map((stat) => (
                <StatsCard
                    key={stat.key}
                    title={stat.title}
                    value={formatStat(data?.[stat.key as keyof typeof data], stat.suffix)}
                    icon={stat.icon}
                    helperText={stat.helperText}
                    loading={loading}
                />
            ))}
        </div>
    );
}
