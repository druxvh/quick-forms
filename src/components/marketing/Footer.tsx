'use client';

import Link from 'next/link';
import Logo from '../shared/Logo';
import { useUser } from '@clerk/nextjs';

export default function Footer() {
    const { isSignedIn } = useUser();

    return (
        <footer className="border-border/50 bg-background/50 border-t backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* Brand + Description */}
                    <div className="flex items-center gap-2">
                        <Logo isAuthed={!!isSignedIn} />
                    </div>
                    <p className="text-muted-foreground max-w-md text-center text-sm md:text-left">
                        Create and share forms in minutes — a simple, fast, and
                        distraction-free form builder built for everyone.
                    </p>
                </div>

                <div className="border-border/50 text-muted-foreground mt-8 flex flex-col items-center justify-between border-t pt-6 text-sm md:flex-row">
                    <p>© {new Date().getFullYear()} QForms. All rights reserved.</p>
                    <div className="mt-3 flex gap-4 md:mt-0">
                        <Link
                            href="/privacy"
                            className="hover:text-foreground transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-foreground transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
