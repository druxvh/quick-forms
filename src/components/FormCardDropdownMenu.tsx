'use client';

import { MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteFormById } from '@/actions/form';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function FormCardDropdownMenu({ formId }: { formId: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteFormById(formId);
                router.refresh();
                toast.success('Form deleted');
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete form');
            }
        });
    };

    return (
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
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => console.log('analytics')}
                    >
                        Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={isPending}
                        onSelect={handleDelete}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
