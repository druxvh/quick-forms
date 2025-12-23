'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { textAreaFieldSchema, TextAreaFieldSchemaT } from '@/schemas';
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
    const element = elementInstance as FieldInstance<'TextAreaField'>;

    const { updateElement } = useDesignerActions();
    const { label, helperText, placeholder, required, rows } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(textAreaFieldSchema),
        mode: 'onBlur',
        defaultValues: {
            label,
            helperText,
            required,
            placeholder,
            rows,
        },
    });

    // updates the changes
    function applyChanges(values: TextAreaFieldSchemaT) {
        const { label, helperText, placeholder, required, rows } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeholder,
                required,
                rows,
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
                            <FieldLabel htmlFor="taf-label">Label</FieldLabel>
                            <Input
                                {...field}
                                id="taf-label"
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
                            <FieldLabel htmlFor="taf-placeholder">Placeholder</FieldLabel>
                            <Input
                                {...field}
                                id="taf-placeholder"
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
                            <FieldLabel htmlFor="taf-helper-text">Helper Text</FieldLabel>
                            <Input
                                {...field}
                                id="taf-helper-text"
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
                {/* Rows */}
                <Controller
                    control={form.control}
                    name="rows"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Rows {field.value ?? 3}</FieldLabel>
                            <Slider
                                defaultValue={[field.value ?? 3]}
                                min={1}
                                max={20}
                                step={1}
                                onValueChange={(value) => {
                                    field.onChange(value[0]);
                                }}
                            />
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
                                <FieldLabel htmlFor="taf-required">Required</FieldLabel>
                                <FieldDescription>
                                    Marks this field as mandatory
                                </FieldDescription>
                            </div>
                            <Switch
                                id="taf-required"
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
