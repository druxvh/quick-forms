'use client'

import { FormElementInstance } from "@/components/FormElements"

export const extraAttributes = {
    text: "Paragraph Field",
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {

    const element = elementInstance as CustomInstance
    const { text } = element.extraAttributes
    return (
        <p>{text}</p>
    )
}