'use client';

import { FieldInstance, FormElementInstance, SubmitFunction } from '@/types/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import RequiredAsterisk from '@/components/shared/RequiredAsterisk';

export default function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}) {
    const element = elementInstance as FieldInstance<'TextAreaField'>;
    const [value, setValue] = useState(() => defaultValue || '');

    const { label, helperText, placeholder, required, rows } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-4">
            <Label className={cn(isInvalid && 'text-red-500')}>
                {label}
                {required && <RequiredAsterisk />}
            </Label>
            <Textarea
                className={cn(isInvalid && 'text-red-500')}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if (!submitValue) return;
                    submitValue(element.id, e.target.value);
                }}
                rows={rows}
            />
            {helperText && (
                <p
                    className={cn(
                        'text-muted-foreground text-[0.8rem]',
                        isInvalid && 'text-red-500',
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}
