"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function ErrorPage({ error }: { error: Error }) {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5">
            <h2 className="text-3xl text-center font-bold">Seems like something went wrong :\ </h2>
            <Button asChild>
                <Link href={'/'}>Go back to home</Link>
            </Button>
        </div>
    )
}
