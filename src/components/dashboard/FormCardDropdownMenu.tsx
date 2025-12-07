'use client';

import { MoreVerticalIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteFormByIdAction } from '@/actions/form';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';

export function FormCardDropdownMenu({ formId }: { formId: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteFormByIdAction(formId);
                router.refresh();
                toast.success('Form deleted', {
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
                console.error(error);
                toast.error('Failed to delete form', {
                    style: {
                        '--normal-bg':
                            'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)',
                    } as React.CSSProperties,
                });
            } finally {
                setIsDialogOpen(false);
            }
        });
    };

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        aria-label="Open menu"
                        size="icon"
                        className="cursor-pointer"
                    >
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel hidden>Form Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        {/* <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={() => console.log('analytics')}
                        >
                            Analytics
                        </DropdownMenuItem> */}

                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                disabled={isPending}
                                onSelect={(e) => {
                                    e.preventDefault();
                                    setIsDialogOpen(true);
                                }}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                                {isPending ? 'Deleting...' : 'Delete'}
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
                <AlertDialogHeader className="items-center">
                    <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
                        <TriangleAlertIcon className="text-destructive size-6" />
                    </div>
                    <AlertDialogTitle>
                        Are you absolutely sure you want to delete?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        This action cannot be undone. This will permanently delete this
                        form along with all its data!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={isPending}
                        className="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white"
                    >
                        {isPending ? 'Deleting...' : 'Yes, Delete Form'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
