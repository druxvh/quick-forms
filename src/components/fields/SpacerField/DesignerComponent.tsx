'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Label } from '@/components/ui/label';
import { SeparatorHorizontal } from 'lucide-react';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'SpacerField'>;
    const { height } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <Label>Spacer field: {height}px</Label>
            <SeparatorHorizontal className="size-8" />
        </div>
    );
}
