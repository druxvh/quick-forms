import VisitBtn from "@/components/VisitBtn"
import FormLinkShare from "@/components/FormLinkShare"
import { StatsCard } from "@/components/StatsCard"
import { ChartNoAxesCombined, Eye, FileText, MousePointerClick } from "lucide-react"
import SubmissionsTable from "@/components/SubmissionsTable"
import { getFormById } from "@/actions/form"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function FormPage({ params }: {
    params: {
        id: string
    }
}) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { hasOnboarded: true },
    });

    if (!user?.hasOnboarded) redirect("/onboarding");

    const { id } = await params
    const form = await getFormById(userId, id)
    if (!form) throw new Error("Form not found")

    const { name, shareURL, visits, submissions } = form

    let submissionRate = 0;
    if (visits > 0) {
        submissionRate = Number(((submissions / visits) * 100).toFixed(2));
        if (submissionRate > 100) submissionRate = 100;
        if (submissionRate < 0) submissionRate = 0;
    }

    const bounceRate = visits > 0 ?
        Number((100 - submissionRate).toFixed(2))
        : 0

    return (
        <div className="w-full h-full px-4">
            <div className="py-5 sm:py-10 border-b border-muted">
                <div className="flex justify-between items-center mx-auto max-w-7xl">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-wrap truncate">{name}</h1>
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
                    value={visits.toLocaleString()}
                    icon={<Eye className="text-gray-700 dark:text-gray-300 size-4" />}
                    helperText="All Time Form Visits"
                    loading={false}
                    className="shadow-md"
                />
                <StatsCard
                    title="Total Submissions"
                    value={submissions.toLocaleString()}
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
            <div className="mx-auto max-w-7xl pt-6">
                <SubmissionsTable userId={userId} id={form.id} />
            </div>
        </div>
    )
}
