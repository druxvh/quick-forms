'use client';

import { FormElementInstance } from '@/types/form';
import { Textarea } from '@/components/ui/textarea';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { paragraphFieldSchema, ParagraphFieldSchemaT } from '@/schemas';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

export default function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as Extract<
        FormElementInstance,
        { type: 'ParagraphField' }
    >;
    const { updateElement } = useDesignerActions();

    const { text } = element.extraAttributes;

    const form = useForm({
        resolver: zodResolver(paragraphFieldSchema),
        mode: 'onBlur',
        defaultValues: {
            text,
        },
    });

    // updates the changes
    function applyChanges(values: ParagraphFieldSchemaT) {
        const { text } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                text,
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
                <Controller
                    control={form.control}
                    name="text"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="paragraph">Paragraph</FieldLabel>
                            <Textarea
                                {...field}
                                id="paragraph"
                                rows={3}
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
