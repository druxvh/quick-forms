'use client'

import { getUserPlan } from "@/actions/user"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Logo() {
    const { isSignedIn, user } = useUser()
    const [plan, setPlan] = useState<string | null>(null)

    useEffect(() => {
        if (!user?.id) return
        getUserPlan(user.id).then(setPlan)
    }, [user?.id])

    return (
        <Link
            href={isSignedIn ? "/dashboard" : "/"}
            className="text-lg sm:text-xl font-sans font-semibold tracking-wider flex items-center gap-2">
            qforms
            {plan === "PRO" && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-blue-600 text-white font-medium">
                    PRO
                </span>
            )}
        </Link>
    )
}