"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";

export default function UpgradeFormLimitCard() {
    return (
        <Link
            href="/pricing"
            className="group relative max-h-52 flex flex-col justify-between rounded-md border border-purple-200/60
                 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50
                 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow
                 hover:border-purple-300"
        >
            <Badge className="rounded-full mb-2 bg-purple-500/10 text-purple-700">
                Form limit reached
            </Badge>

            <div className="space-y-1">
                <h3 className="text-sm sm:text-lg font-semibold text-slate-900">
                    You’ve hit your form limit
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                    Upgrade to Pro to create more forms, unlock better analytics, and get priority features.
                </p>
            </div>

            <div className="mt-2 sm:mt-4 flex items-center justify-between text-sm font-medium text-purple-700">
                <span>View pricing</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-md border border-white/60 opacity-70" />
        </Link>
    );
}
