'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import { Slider } from '@/components/ui/slider';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { spacerFieldSchema, SpacerFieldSchemaT } from '@/schemas';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

export default function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'SpacerField'>;

    const { updateElement } = useDesignerActions();

    const form = useForm({
        resolver: zodResolver(spacerFieldSchema),
        mode: 'onBlur',
        defaultValues: {
            height: element.extraAttributes?.height,
        },
    });

    // updates the changes
    function applyChanges(values: SpacerFieldSchemaT) {
        const { height } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                height,
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
                    name="height"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Height (px): {field.value ?? 20}</FieldLabel>
                            <Slider
                                defaultValue={[field.value ?? 20]}
                                min={5}
                                max={200}
                                step={5}
                                onValueChange={(value) => {
                                    field.onChange(value[0]);
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
