'use client';

import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useDesignerActions } from '@/hooks/use-designer';
import { FormElementInstance } from '@/types/form';
import { Form } from '@/generated/prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveFormBtn from './SaveFormBtn';
import PublishFormBtn from './PublishFormBtn';
import Designer from './Designer';
import DragOverlayWrapper from './DragOverlayWrapper';

export default function FormBuilder({ form }: { form: Form }) {
    const { setElements, setSelectedElement } = useDesignerActions();

    // during drag, btn click does'nt work so to prevent it, add activation constraint to the elements
    // activates element drag after 10px
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    // for touch screens
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 20,
            tolerance: 5,
        },
    });

    const keyboardSensor = useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    });

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    // hydrate elements when form changes
    useEffect(() => {
        const elements = (form.content as FormElementInstance[]) ?? [];

        setElements(elements);
        setSelectedElement(null);
    }, [form, setElements, setSelectedElement]);

    if (form.published) {
        const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

        return (
            <>
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={300}
                />
                <div className="flex h-full w-full flex-col items-center justify-center px-4">
                    <div className="max-w-md">
                        <h1 className="text-primary mb-5 border-b pb-2 text-center text-2xl font-bold sm:mb-10 sm:text-3xl">
                            Form Published
                        </h1>
                        <h2 className="text-lg sm:text-2xl">Share this form</h2>
                        <h3 className="text-muted-foreground border-b pb-5 text-base sm:pb-10 sm:text-xl">
                            Anyone with the link can view and submit the form
                        </h3>
                        <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
                            <Input className="w-full" readOnly value={shareUrl} />
                            <Button
                                className="mt-2 w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    toast.success('Copied', {
                                        description: 'Link copied to clipboard',
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
                                Copy Link
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <Button variant={'link'} asChild>
                                <Link href={'/dashboard'} className="gap-2">
                                    <ArrowLeft />
                                    Go back home
                                </Link>
                            </Button>

                            <Button variant={'link'} asChild>
                                <Link href={`/forms/${form.id}`} className="gap-2">
                                    Form details
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <main className="flex w-full flex-col">
            <nav className="flex flex-col items-center justify-between gap-4 border-b p-4 sm:flex-row">
                <h2 className="truncate font-medium">
                    <span className="text-muted-foreground mr-2">Form:</span>
                    {form.name}
                </h2>
                <div className="flex items-center gap-2">
                    {!form.published && (
                        <>
                            <div className="lg:hidden">
                                <PreviewDialogBtn />
                            </div>
                            <SaveFormBtn id={form.id} />
                            <PublishFormBtn id={form.id} />
                        </>
                    )}
                </div>
            </nav>
            <DndContext sensors={sensors} autoScroll>
                <Designer />
                <DragOverlayWrapper />
            </DndContext>
        </main>
    );
}
