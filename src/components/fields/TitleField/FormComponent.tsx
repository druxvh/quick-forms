'use client'

import { FormElementInstance } from "@/types/form"


export default function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {

    const element = elementInstance as Extract<FormElementInstance, { type: "TitleField" }>
    const { title } = element.extraAttributes
    return (
        <p className="text-xl">{title}</p>
    )
}
