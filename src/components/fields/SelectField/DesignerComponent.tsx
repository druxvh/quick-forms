'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'SelectField'>;
    const { label, helperText, placeholder, required } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-4">
            <Label>
                {label}
                {required && '*'}
            </Label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            </Select>
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}
