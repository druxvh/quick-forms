'use client'

import { FormElementInstance } from "@/components/FormElements"

export const extraAttributes = {
    title: "Title Field",
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
    const { title } = element.extraAttributes
    return (
        <p className="text-xl">{title}</p>
    )
}
