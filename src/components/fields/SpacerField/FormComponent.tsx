'use client'

import { FormElementInstance } from "@/components/FormElements"

export const extraAttributes = {
    height: 20 //px
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function FormComponent({ elementInstance }:
    {
        elementInstance: FormElementInstance
    }) {
    const element = elementInstance as CustomInstance

    const { height } = element.extraAttributes
    return (
        <div style={{ height, width: "100%" }}>

        </div>
    )
}