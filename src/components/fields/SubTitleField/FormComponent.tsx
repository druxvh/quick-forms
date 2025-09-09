'use client'

import { FormElementInstance } from "@/types/form"


export default function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {

    const element = elementInstance as Extract<FormElementInstance, { type: "SubTitleField" }>
    const { subTitle } = element.extraAttributes
    return (
        <p className="text-md">{subTitle}</p>
    )
}
