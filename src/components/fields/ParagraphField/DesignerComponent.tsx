'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Label } from "@/components/ui/label"

export const extraAttributes = {
    text: "Paragraph Field",
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { text } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label className="text-muted-foreground">
                Paragraph field
            </Label>
            <p>{text}</p>
        </div>
    )
}