'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import RequiredAsterisk from '@/components/shared/RequiredAsterisk';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'CheckboxField'>;
    const { label, helperText, required } = element.extraAttributes;
    const id = `checkbox-${element.id}`;
    return (
        <div className="flex items-start gap-4">
            <Checkbox id={id} />
            <div className="flex w-full flex-col gap-2 leading-none">
                <Label htmlFor={id} className="text-muted-foreground">
                    {label}
                    {required && <RequiredAsterisk />}
                </Label>

                {helperText && (
                    <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
                )}
            </div>
        </div>
    );
}
