'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'TextField'>;
    const { label, helperText, placeholder, required } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-4">
            <Label>
                {label}
                {required && '*'}
            </Label>
            <Input readOnly disabled placeholder={placeholder} />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}
