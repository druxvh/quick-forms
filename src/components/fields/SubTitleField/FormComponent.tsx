'use client'

import { FormElementInstance } from "@/components/FormElements"

export const extraAttributes = {
    subTitle: "SubTitle Field",
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
    const { subTitle } = element.extraAttributes
    return (
        <p className="text-md">{subTitle}</p>
    )
}
