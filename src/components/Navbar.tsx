import { getCurrentUser } from '@/actions/user'
import Logo from './Logo'
import ThemeModeToggle from './ThemeModeToggle'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { ProBadge } from './ProBadge'

export default async function Navbar() {

    const user = await getCurrentUser()
    const isAuthed = user ? true : false;
    const isPro = user?.isPro ? true : false

    return (
        <nav className="h-16 px-4 py-2 border-b flex justify-between items-center">
            <Logo />
            <div className="flex gap-2 sm:gap-4">
                <ProBadge variant={isAuthed && isPro ? "pro" : "cta"} />
                <ThemeModeToggle />
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
