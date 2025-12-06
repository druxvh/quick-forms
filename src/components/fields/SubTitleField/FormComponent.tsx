'use client';

import { FieldInstance, FormElementInstance } from '@/types/form';

export default function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as FieldInstance<'SubTitleField'>;
    const { subTitle } = element.extraAttributes;
    return <h2 className="text-lg">{subTitle}</h2>;
}
