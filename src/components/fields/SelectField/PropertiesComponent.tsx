'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { selectFieldSchema, SelectFieldSchemaT } from '@/schemas';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';

// Helper function to check for duplicate options
function hasDuplicateOptions(options: string[]): boolean {
    if (!options || options.length === 0) return false;

    const cleanedOptions = options
        .map((option) => option.trim().toLowerCase())
        .filter((option) => option !== '');

    const uniqueSet = new Set(cleanedOptions);

    return uniqueSet.size !== cleanedOptions.length;
}

export default function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'SelectField'>;
    const { updateElement, setSelectedElement } = useDesignerActions();
    const { label, helperText, placeholder, required, options } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(selectFieldSchema),
        mode: 'onSubmit',
        defaultValues: { label, helperText, placeholder, required, options },
    });

    // updates the changes
    function applyChanges(values: SelectFieldSchemaT) {
        const { label, helperText, placeholder, required, options } = values;

        if (hasDuplicateOptions(options)) {
            toast.error('Error', {
                description: 'Options must be unique.',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                } as React.CSSProperties,
            });
            return;
        }

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeholder,
                required,
                options,
            },
        });

        toast.success('Success', {
            description: 'Properties saved successfully!',
            style: {
                '--normal-bg':
                    'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text':
                    'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border':
                    'light-dark(var(--color-green-600), var(--color-green-400))',
            } as React.CSSProperties,
        });

        setSelectedElement(null);
    }

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    return (
        <form
            id="sf-form"
            onSubmit={form.handleSubmit(applyChanges)}
            className="space-y-6 pb-10"
        >
            <FieldGroup>
                {/* Label */}
                <Controller
                    control={form.control}
                    name="label"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="sf-label">Label</FieldLabel>
                            <Input
                                {...field}
                                id="sf-label"
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
                            <FieldLabel htmlFor="sf-placeholder">Placeholder</FieldLabel>
                            <Input
                                {...field}
                                id="sf-placeholder"
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
                            <FieldLabel htmlFor="sf-helper-text">Helper Text</FieldLabel>
                            <Input
                                {...field}
                                id="sf-helper-text"
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
                <FieldSeparator />
                {/* Options */}
                <Controller
                    control={form.control}
                    name="options"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="flex items-center justify-between">
                                <FieldLabel>Options</FieldLabel>
                                <Button
                                    variant={'outline'}
                                    className="gap-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        form.setValue('options', [
                                            ...(field.value ?? []),
                                            'New option',
                                        ]);
                                    }}
                                >
                                    <Plus />
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {(field.value ?? []).map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between gap-1"
                                    >
                                        <Input
                                            placeholder=""
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [
                                                    ...(field.value ?? []),
                                                ];
                                                newOptions[index] = e.target.value;
                                                field.onChange(newOptions);
                                            }}
                                        />
                                        <Button
                                            variant={'ghost'}
                                            size={'icon'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newOptions = (
                                                    field.value ?? []
                                                ).filter((_, i) => i != index);
                                                field.onChange(newOptions);
                                            }}
                                        >
                                            <X />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <FieldDescription>
                                The options users can select from.
                            </FieldDescription>
                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <FieldSeparator />

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
                                <FieldLabel htmlFor="sf-required">Required</FieldLabel>
                                <FieldDescription>
                                    Marks this field as mandatory
                                </FieldDescription>
                            </div>
                            <Switch
                                id="sf-required"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </Field>
                    )}
                />
            </FieldGroup>
            <Separator />
            <Button className="w-full" type="submit" form="sf-form">
                Save
            </Button>
        </form>
    );
}
