'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RequiredAsterisk from '@/components/shared/RequiredAsterisk';

export default function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'TextAreaField'>;
    const { label, helperText, placeholder, required, rows } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-2">
            <Label className="text-muted-foreground">
                {label}
                {required && <RequiredAsterisk />}
            </Label>
            <Textarea readOnly disabled placeholder={placeholder} rows={rows} />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}
