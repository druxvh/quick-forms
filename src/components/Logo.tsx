'use client'

import Link from "next/link"

export default function Logo() {
    return (
        <Link href={'/'} className="text-lg sm:text-xl font-mono font-semibold tracking-wider">qforms</Link>
    )
}