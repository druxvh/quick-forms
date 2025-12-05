'use client';

import { useDraggable } from '@dnd-kit/core';
import { FormElement } from '@/types/form';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
    const { icon: Icon, label } = formElement.designerBtnElement;
    const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    });
    return (
        <Button
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            variant={'outline'}
            className={cn(
                'flex size-20 cursor-grab flex-col gap-2 md:size-26',
                isDragging && 'ring-primary ring-2',
            )}
        >
            <Icon className="text-primary size-5 cursor-grab md:size-7" />
            <p className="text-[10px] text-wrap md:text-xs">{label}</p>
        </Button>
    );
}

export function SidebarBtnElementDragOverlay({
    formElement,
}: {
    formElement: FormElement;
}) {
    const { icon: Icon, label } = formElement.designerBtnElement;

    return (
        <Button
            variant={'outline'}
            className="flex size-20 cursor-grab flex-col gap-2 md:size-32"
        >
            <Icon className="text-primary size-5 cursor-grab md:size-8" />
            <p className="text-[10px] text-wrap md:text-xs">{label}</p>
        </Button>
    );
}
