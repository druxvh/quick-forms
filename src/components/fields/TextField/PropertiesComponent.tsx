'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { textFieldSchema, TextFieldSchemaT } from '@/schemas';
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
    const { updateElement } = useDesignerActions();

    const element = elementInstance as FieldInstance<'TextField'>;

    const { label, helperText, placeholder, required } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(textFieldSchema),
        mode: 'onBlur',
        defaultValues: { label, helperText, placeholder, required },
    });

    // updates the changes
    function applyChanges(values: TextFieldSchemaT) {
        const { label, helperText, placeholder, required } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: { label, helperText, placeholder, required },
        });
    }

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    return (
        <form
            onBlur={form.handleSubmit(applyChanges)}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
        >
            <FieldGroup>
                {/* Label */}
                <Controller
                    control={form.control}
                    name="label"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="tf-label">Label</FieldLabel>
                            <Input
                                {...field}
                                id="tf-label"
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
                            <FieldLabel htmlFor="tf-placeholder">Placeholder</FieldLabel>
                            <Input
                                {...field}
                                id="tf-placeholder"
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
                            <FieldLabel htmlFor="tf-helper-text">Helper Text</FieldLabel>
                            <Input
                                {...field}
                                id="tf-helper-text"
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
                                <FieldLabel htmlFor="tf-required">Required</FieldLabel>
                                <FieldDescription>
                                    Marks this field as mandatory
                                </FieldDescription>
                            </div>
                            <Switch
                                id="tf-required"
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
