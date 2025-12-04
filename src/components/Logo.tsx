'use client';

import Link from 'next/link';

export default function Logo({ isAuthed }: { isAuthed: boolean }) {
    return (
        <Link
            href={isAuthed ? '/dashboard' : '/'}
            className="flex items-center gap-1 font-sans text-lg font-semibold tracking-wider sm:text-xl"
        >
            <span className="inline-flex w-fit items-center justify-center rounded-md bg-gradient-to-br from-amber-300/60 to-amber-400 px-2 py-0.5 font-sans text-base font-semibold text-black shadow-2xl">
                Q
            </span>
            forms
        </Link>
    );
}
