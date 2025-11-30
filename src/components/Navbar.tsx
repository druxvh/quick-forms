import { getCurrentUser } from '@/actions/user'
import Logo from './Logo'
import ThemeModeToggle from './ThemeModeToggle'
import { SignedIn, SignedOut, SignUpButton, UserButton } from '@clerk/nextjs'
import { ProBadge } from './ProBadge'
import { Button } from './ui/button'

export default async function Navbar() {

    const user = await getCurrentUser()
    const isAuthed = user ? true : false;
    const isPro = user?.isPro ? true : false

    return (
        <nav className="h-16 px-4 py-2 border-b flex justify-between items-center">
            <Logo isAuthed={isAuthed}/>
            <div className="flex gap-2 sm:gap-4">
                {isAuthed &&
                    <ProBadge variant={isPro ? "pro" : "cta"} />
                }
                <ThemeModeToggle />
                <SignedOut>
                    <SignUpButton>
                        <Button variant={"default"} className='rounded-sm shadow-sm px-4 cursor-pointer'>Sign Up</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
