

export default function DashboardHeader({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <header>
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
            {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
        </header>
    )
}
