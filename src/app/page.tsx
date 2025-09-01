import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Home() {
    const user = await currentUser()
    if (user) {
        redirect('/dashboard')
    }
    return (
        <div>
            <h1>Main Page</h1>

            <Link href={'/dashboard'}>
                <Button>
                    visit dashboard page
                </Button>
            </Link>
        </div>
    )
}
