'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { numberFieldSchema, NumberFieldSchemaT } from '@/schemas';
import { useDesignerActions } from '@/hooks/use-designer';
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
    const element = elementInstance as FieldInstance<'NumberField'>;
    const { updateElement } = useDesignerActions();
    const { label, helperText, placeholder, required } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(numberFieldSchema),
        mode: 'onBlur',
        defaultValues: {
            label,
            helperText,
            required,
            placeholder,
        },
    });

    // updates the changes
    function applyChanges(values: NumberFieldSchemaT) {
        const { label, helperText, placeholder, required } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeholder,
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
                            <FieldLabel htmlFor="nf-label">Label</FieldLabel>
                            <Input
                                {...field}
                                id="nf-label"
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
                {/* Placeholder */}
                <Controller
                    control={form.control}
                    name="placeholder"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="nf-placeholder">Placeholder</FieldLabel>
                            <Input
                                {...field}
                                id="nf-placeholder"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                }}
                            />
                            <FieldDescription>
                                The placeholder of the field.
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
                            <FieldLabel htmlFor="nf-helper-text">Helper Text</FieldLabel>
                            <Input
                                {...field}
                                id="nf-helper-text"
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
                                <FieldLabel htmlFor="nf-required">Required</FieldLabel>
                                <FieldDescription>
                                    Marks this field as mandatory
                                </FieldDescription>
                            </div>
                            <Switch
                                id="nf-required"
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
