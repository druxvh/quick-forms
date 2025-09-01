// import FormBuilder from "@/components/FormBuilder"
import VisitBtn from "@/components/VisitBtn"
import { getFormById } from "../../../../../actions/form"
import FormLinkShare from "@/components/FormLinkShare"
import { StatsCard } from "@/components/StatsCard"
import { ChartNoAxesCombined, Eye, FileText, MousePointerClick } from "lucide-react"
import SubmissionsTable from "@/components/SubmissionsTable"

export default async function FormPage({ params }: {
    params: {
        id: string
    }
}) {

    const { id } = await params
    const form = await getFormById(Number(id))
    if (!form) throw new Error("Form not found")

    const { name, shareURL, visits, submissions } = form

    const submissionRate = visits > 0
        ? Number(((submissions / visits) * 100).toFixed(2))
        : 0

    const bounceRate = 100 - submissionRate

    return (
        <div className="w-full h-full px-4">
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between mx-auto max-w-7xl">
                    <h1 className="text-3xl font-semibold truncate">{name}</h1>
                    <VisitBtn shareUrl={shareURL} />
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <div className="mx-auto max-w-7xl flex gap-2 justify-between">
                    <FormLinkShare shareUrl={shareURL} />
                </div>
            </div>
            <div className="mx-auto max-w-7xl pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Visits"
                    value={visits.toLocaleString() || "0"}
                    icon={<Eye className="text-gray-700 dark:text-gray-300 size-4" />}
                    helperText="All Time Form Visits"
                    loading={false}
                    className="shadow-md"
                />
                <StatsCard
                    title="Total Submissions"
                    value={submissions.toLocaleString() || "0"}
                    icon={<FileText className="text-gray-700 dark:text-gray-300 size-4" />}
                    helperText="All Time Submissions"
                    loading={false}
                    className="shadow-md"
                />
                <StatsCard
                    title="Total Submission Rate"
                    value={submissionRate.toLocaleString() + "%"}
                    icon={<MousePointerClick className="text-gray-700 dark:text-gray-300 size-4" />}
                    helperText="All Time Submission Rate"
                    loading={false}
                    className="shadow-md"
                />
                <StatsCard
                    title="Total Bounce Rate"
                    value={bounceRate.toLocaleString() + "%"}
                    icon={<ChartNoAxesCombined className="text-gray-700 dark:text-gray-300 size-4" />}
                    helperText="All Time Bounce Rate"
                    loading={false}
                    className="shadow-md"
                />
            </div>
            <div className="mx-auto max-w-7xl pt-8">
                <SubmissionsTable id={form.id} />
            </div>
        </div>
    )
}
