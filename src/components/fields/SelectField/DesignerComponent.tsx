'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import RequiredAsterisk from '@/components/shared/RequiredAsterisk';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'SelectField'>;
    const { label, helperText, placeholder, required } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-2">
            <Label className="text-muted-foreground">
                {label}
                {required && <RequiredAsterisk />}
            </Label>
            <Button
                disabled
                className="w-full items-center justify-start text-left"
                variant={'outline'}
            >
                <span>{placeholder}</span>
            </Button>
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}
