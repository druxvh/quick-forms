import Logo from './Logo';
import ThemeModeToggle from './ThemeModeToggle';
import { ProBadge } from './ProBadge';
import ClerkUserButton from './ClerkUserButton';
import { getCurrentUser } from '@/actions/auth';

export default async function Navbar() {
    const user = await getCurrentUser();
    const isAuthed = user ? true : false;
    const isPro = user?.isPro ? true : false;

    return (
        <nav className="flex h-16 items-center justify-between border-b px-4 py-2">
            <Logo isAuthed={isAuthed} />
            <div className="flex gap-2 sm:gap-4">
                {isAuthed && <ProBadge variant={isPro ? 'pro' : 'cta'} />}
                <ThemeModeToggle />
                <ClerkUserButton />
            </div>
        </nav>
    );
}
