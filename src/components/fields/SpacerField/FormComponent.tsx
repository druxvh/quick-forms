'use client'

import { FieldInstance, FormElementInstance } from "@/types/form"


export default function FormComponent({ elementInstance }:
    {
        elementInstance: FormElementInstance
    }) {
    const element = elementInstance as FieldInstance<"SpacerField">

    const { height } = element.extraAttributes
    return (
        <div style={{ height, width: "100%" }}>

        </div>
    )
}