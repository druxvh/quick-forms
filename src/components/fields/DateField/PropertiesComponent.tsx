'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { dateFieldSchema, DateFieldSchemaT } from '@/schemas';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';

export default function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'DateField'>;
    const { updateElement } = useDesignerActions();
    const { label, helperText, required } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(dateFieldSchema),
        mode: 'onBlur',
        defaultValues: {
            label,
            helperText,
            required,
        },
    });

    // updates the changes
    function applyChanges(values: DateFieldSchemaT) {
        const { label, helperText, required } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
            },
        });
    }

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    return (
        <form
            onBlur={form.handleSubmit(applyChanges)}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
        >
            <FieldGroup>
                {/* Label */}
                <Controller
                    control={form.control}
                    name="label"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="df-label">Label</FieldLabel>
                            <Input
                                {...field}
                                id="df-label"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                }}
                            />
                            <FieldDescription>
                                The label of the field. <br /> Displayed above the input.
                            </FieldDescription>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* Helper Text */}
                <Controller
                    control={form.control}
                    name="helperText"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="df-helper-text">Helper Text</FieldLabel>
                            <Input
                                {...field}
                                id="df-helper-text"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                }}
                            />
                            <FieldDescription>
                                The Helper text of the field. <br /> It will be displayed
                                below the field
                            </FieldDescription>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* Required */}
                <Controller
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <Field
                            orientation="horizontal"
                            className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
                        >
                            <div className="space-y-1">
                                <FieldLabel htmlFor="df-required">Required</FieldLabel>
                                <FieldDescription>
                                    Marks this field as mandatory
                                </FieldDescription>
                            </div>
                            <Switch
                                id="df-required"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    );
}
