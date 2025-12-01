'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDesignerActions } from '@/hooks/use-designer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { titleFieldSchema, TitleFieldSchemaT } from '@/schemas';

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
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
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
