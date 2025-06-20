import { ChartNoAxesCombined, Eye, FileText, MousePointerClick } from "lucide-react";
import { getFormStats } from "../../actions/form"
import StatsCard from "./StatsCard";

interface StatsCardsContainerProps {
    loading: boolean;
    data?: Awaited<ReturnType<typeof getFormStats>>;
}

export default function StatsCardsContainer(props: StatsCardsContainerProps) {
    const { data, loading } = props
    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Visits"
                value={data?.visits.toLocaleString() || "0"}
                icon={<Eye className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Form Visits"
                loading={loading}
                className="shadow-md"
            />
            <StatsCard
                title="Total Submissions"
                value={data?.submissions.toLocaleString() || "0"}
                icon={<FileText className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Submissions"
                loading={loading}
                className="shadow-md"
            />
            <StatsCard
                title="Total Submission Rate"
                value={data?.submissionRate.toLocaleString() + "%"}
                icon={<MousePointerClick className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Submission Rate"
                loading={loading}
                className="shadow-md"
            />
            <StatsCard
                title="Total Bounce Rate"
                value={data?.bounceRate.toLocaleString() + "%"}
                icon={<ChartNoAxesCombined className="text-gray-700 dark:text-gray-300 size-4" />}
                helperText="All Time Bounce Rate"
                loading={loading}
                className="shadow-md"
            />
        </div>
    )
}
