'use client';

import { FieldInstance, FormElementInstance, SubmitFunction } from '@/types/form';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
    const element = elementInstance as FieldInstance<'SelectField'>;
    const [value, setValue] = useState(() => defaultValue || '');

    const { label, helperText, placeholder, required, options } = element.extraAttributes;
    return (
        <div className="flex w-full flex-col gap-4">
            <Label className={cn(isInvalid && 'text-red-500')}>
                {label}
                {required && '*'}
            </Label>
            <Select
                defaultValue={value}
                onValueChange={(value) => {
                    setValue(value);
                    if (!submitValue) return;
                    submitValue(element.id, value);
                }}
            >
                <SelectTrigger className={cn('w-full', isInvalid && 'text-red-500')}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, idx) => (
                        <SelectItem key={option + idx} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
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
