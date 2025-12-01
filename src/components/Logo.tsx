'use client';

import Link from 'next/link';
import { Badge } from './ui/badge';

export default function Logo({ isAuthed }: { isAuthed: boolean }) {
    return (
        <Link
            href={isAuthed ? '/dashboard' : '/'}
            className="flex items-center gap-1 font-sans text-lg font-semibold tracking-wider sm:text-xl"
        >
            <Badge className="rounded-md bg-gradient-to-br from-amber-300/60 to-amber-400 font-sans text-base font-semibold text-black shadow-2xl">
                Q
            </Badge>
            forms
        </Link>
    );
}
