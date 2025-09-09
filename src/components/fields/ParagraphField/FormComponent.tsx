'use client'

import { FormElementInstance } from "@/types/form"


export default function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {
    const element = elementInstance as Extract<FormElementInstance, { type: "ParagraphField" }>
    const { text } = element.extraAttributes
    return (
        <p>{text}</p>
    )
}