'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({ error }: { error: Error }) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-4">
            <h2 className="text-center text-3xl font-bold">
                Seems like something went wrong :\{' '}
            </h2>
            <p>{error.message}</p>
            <Button asChild>
                <Link href={'/'}>Go back to home</Link>
            </Button>
        </div>
    );
}
