"use client"

import Logo from './Logo'
import ThemeModeToggle from './ThemeModeToggle'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Navbar({
    themeModeToggle = true,
    userButton = true
}: {
    themeModeToggle?: boolean
    userButton?: boolean
}) {
    return (
        <nav className="h-16 px-4 py-2 border-b flex justify-between items-center">
            <Logo />
            <div className="flex gap-4 sm:gap-5">
                {themeModeToggle && <ThemeModeToggle />}
                {userButton &&
                    (
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    )}
            </div>
        </nav>
    )
}
