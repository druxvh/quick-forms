'use client'

import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function Logo() {
    const { isSignedIn } = useUser()

    return (
        <Link href={isSignedIn ? "/dashboard" : "/"} className="text-lg sm:text-xl font-mono font-semibold tracking-wider">qforms</Link>
    )
}