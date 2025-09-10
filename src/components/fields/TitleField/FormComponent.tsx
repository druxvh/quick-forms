'use client'

import { FieldInstance, FormElementInstance } from "@/types/form"


export default function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {

    const element = elementInstance as FieldInstance<"TitleField">
    const { title } = element.extraAttributes
    return (
        <p className="text-xl">{title}</p>
    )
}
