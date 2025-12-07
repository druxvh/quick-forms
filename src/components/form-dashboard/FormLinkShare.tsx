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
                    toast.success('Link copied to your clipboard.', {
                        style: {
                            '--normal-bg':
                                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                            '--normal-text':
                                'light-dark(var(--color-green-600), var(--color-green-400))',
                            '--normal-border':
                                'light-dark(var(--color-green-600), var(--color-green-400))',
                        } as React.CSSProperties,
                    });
                }}
            >
                <Share2 className="mr-4 size-4" />
                Share link
            </Button>
        </div>
    );
}
