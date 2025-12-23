'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Input } from '@/components/ui/input';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { titleFieldSchema, TitleFieldSchemaT } from '@/schemas';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

export default function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const { updateElement } = useDesignerActions();
    const element = elementInstance as FieldInstance<'TitleField'>;
    const { title } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(titleFieldSchema),
        mode: 'onBlur',
        defaultValues: {
            title,
        },
    });

    // updates the changes
    function applyChanges(values: TitleFieldSchemaT) {
        const { title } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title,
            },
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
                <Controller
                    control={form.control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                {...field}
                                id="title"
                                aria-invalid={fieldState.invalid}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') e.currentTarget.blur();
                                }}
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    );
}
