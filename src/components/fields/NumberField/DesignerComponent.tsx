'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RequiredAsterisk from '@/components/shared/RequiredAsterisk';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'NumberField'>;
    const { label, helperText, placeholder, required } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-2">
            <Label className="text-muted-foreground">
                {label}
                {required && <RequiredAsterisk />}
            </Label>
            <Input
                readOnly
                disabled
                type="number"
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (['e', 'E', '+', '-'].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
            />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}
