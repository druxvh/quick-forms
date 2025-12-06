'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar1 } from 'lucide-react';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'DateField'>;
    const { label, helperText, required } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-2">
            <Label className="text-muted-foreground">
                {label}
                {required && '*'}
            </Label>
            <Button
                disabled
                className="w-full items-center justify-start text-left"
                variant={'outline'}
            >
                <Calendar1 className="mr-2 size-4" />
                <span>Pick a date</span>
            </Button>
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}
