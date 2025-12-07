'use client';

import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { LoaderCircle } from 'lucide-react';
import { updateFormContentByIdAction } from '@/actions/form';
import { useDesignerElements } from '@/hooks/use-designer';

export default function SaveFormBtn({ id }: { id: string }) {
    const elements = useDesignerElements();
    const [isPending, startTransition] = useTransition();

    const updateFormContent = async () => {
        try {
            if (!elements || elements.length === 0) {
                toast.error('Cannot save empty form', {
                    description: 'Add at least one field before saving.',
                    style: {
                        '--normal-bg':
                            'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                        '--normal-text':
                            'light-dark(var(--color-amber-600), var(--color-amber-400))',
                        '--normal-border':
                            'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    } as React.CSSProperties,
                });
                return;
            }
            // const jsonElements = JSON.stringify(elements)
            // await updateFormContentById(id, jsonElements)

            await updateFormContentByIdAction(id, elements);

            toast.success('Saved', {
                description: 'Your form has been saved successfully.',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                } as React.CSSProperties,
            });
        } catch (error) {
            toast.error('Error', {
                description: 'Something went wrong while saving',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)',
                } as React.CSSProperties,
            });
            console.error(error);
        }
    };

    return (
        <Button
            disabled={isPending || elements.length === 0}
            onClick={() => {
                startTransition(updateFormContent);
            }}
            className="cursor-pointer text-xs sm:text-sm"
        >
            {isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
            ) : (
                <span>Save</span>
            )}
        </Button>
    );
}
