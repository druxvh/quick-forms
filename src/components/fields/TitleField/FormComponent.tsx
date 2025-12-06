'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';

export default function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'TitleField'>;
    const { title } = element.extraAttributes;
    return <h1 className="text-2xl font-semibold">{title}</h1>;
}
