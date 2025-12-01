'use client';

import React from 'react';
import { Button } from './ui/button';

export default function VisitBtn({ shareUrl }: { shareUrl: string }) {
    const shareLink = `/submit/${shareUrl}`;

    return (
        <Button
            className="w-30 sm:w-[200px]"
            onClick={() => {
                window.open(shareLink, '_blank');
            }}
        >
            Visit
        </Button>
    );
}
