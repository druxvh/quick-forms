'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useDesignerActions } from '@/hooks/use-designer';
import { subTitleFieldSchema, SubTitleFieldSchemaT } from '@/schemas';
import { FieldInstance, FormElementInstance } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'SubTitleField'>;
    const { updateElement } = useDesignerActions();
    const { subTitle } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(subTitleFieldSchema),
        mode: 'onBlur',
        defaultValues: {
            subTitle,
        },
    });

    // updates the changes
    function applyChanges(values: SubTitleFieldSchemaT) {
        const { subTitle } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                subTitle,
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
                    name="subTitle"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
                            <Input
                                {...field}
                                id="subtitle"
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
