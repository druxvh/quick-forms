"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

export default function FormLinkShare({ shareUrl }: {
    shareUrl: string
}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return null

    const shareLink = `${window.location.origin}/submit/${shareUrl}`

    return (
        <div className="flex grow gap-4 items-center">
            <Input value={shareLink} readOnly />
            <Button
                className='w-30 sm:w-[200px]'
                onClick={() => {
                    navigator.clipboard.writeText(shareLink)
                    toast.success("Link copied to your clipboard.")
                }}
            >
                <Share2 className='mr-4 size-4' />
                Share link
            </Button>
        </div>
    )
}
