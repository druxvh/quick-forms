'use client';

import { FormElementInstance } from '@/types/form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { paragraphFieldSchema, ParagraphFieldSchemaT } from '@/schemas';

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
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={5}
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
