"use client"

import Link from "next/link"
import { Badge } from "./ui/badge"

export default function Logo() {
    return (
        <Link
            href={"/dashboard"}
            className="text-lg sm:text-xl font-semibold font-sans tracking-wider flex items-center gap-1">
            <Badge className="text-base shadow-2xl font-semibold rounded-md bg-gradient-to-br from-amber-300/60 to-amber-400 font-sans text-black">Q</Badge>
            forms
        </Link>
    )
}