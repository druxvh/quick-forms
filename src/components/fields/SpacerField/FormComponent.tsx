'use client'

import { FieldInstance, FormElementInstance } from "@/types/form"


export default function FormComponent({ elementInstance }:
    {
        elementInstance: FormElementInstance
    }) {
    const element = elementInstance as FieldInstance<"SpacerField">

    const { height } = element.extraAttributes
    return (
        <div
            className="w-full shrink-0"
            style={{
                height: height || "16px", // default 16px if none
                minHeight: height || "16px",
                display: "block",
            }}
        />
    )
}