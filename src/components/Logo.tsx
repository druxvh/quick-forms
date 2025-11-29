"use client"

import Link from "next/link"

export default function Logo({ isAuthed, isPro }: { isAuthed: boolean, isPro: boolean }) {

    return (
        <Link
            href={isAuthed ? "/dashboard" : "/"}
            className="text-lg sm:text-xl font-sans font-semibold tracking-wider flex items-center gap-2">
            qforms
            {isPro && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-blue-600 text-white font-medium">
                    PRO
                </span>
            )}
        </Link>
    )
}