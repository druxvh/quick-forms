'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function UpgradeFormLimitCard() {
    return (
        <Link
            href="/pricing"
            className="group relative flex max-h-52 flex-col justify-between rounded-md border border-purple-200/60 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50 p-4 shadow-sm transition-shadow hover:border-purple-300 hover:shadow-md sm:p-5"
        >
            <Badge className="mb-2 rounded-full bg-purple-500/10 text-purple-700">
                Form limit reached
            </Badge>

            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-lg">
                    You’ve hit your form limit
                </h3>
                <p className="text-xs text-slate-600 sm:text-sm">
                    Upgrade to Pro to create more forms, unlock better analytics, and get
                    priority features.
                </p>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm font-medium text-purple-700 sm:mt-4">
                <span>View pricing</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-md border border-white/60 opacity-70" />
        </Link>
    );
}
