'use client';

import { useMemo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FormLinkShare({ shareUrl }: { shareUrl: string }) {
    const shareLink = useMemo(() => {
        if (typeof window === 'undefined') return '';
        return `${window.location.origin}/submit/${shareUrl}`;
    }, [shareUrl]);

    return (
        <div className="flex grow items-center gap-4">
            <Input value={shareLink} readOnly />
            <Button
                className="w-30 sm:w-[200px]"
                onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    toast.success('Link copied to your clipboard.');
                }}
            >
                <Share2 className="mr-4 size-4" />
                Share link
            </Button>
        </div>
    );
}
