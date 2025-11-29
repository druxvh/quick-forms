import { getCurrentUser } from '@/actions/user'
import Logo from './Logo'
import ThemeModeToggle from './ThemeModeToggle'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default async function Navbar() {

    const user = await getCurrentUser()
    const isAuthed = user ? true : false;
    const isPro = user?.isPro ? true : false

    return (
        <nav className="h-16 px-4 py-2 border-b flex justify-between items-center">
            <Logo isAuthed={isAuthed} isPro={isPro} />
            <div className="flex gap-4 sm:gap-5">
                <ThemeModeToggle />
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
