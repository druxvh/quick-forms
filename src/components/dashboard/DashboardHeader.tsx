'use client';

export default function DashboardHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <header>
            <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
        </header>
    );
}
