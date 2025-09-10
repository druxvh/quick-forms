'use client'

import { FieldInstance, FormElementInstance } from "@/types/form"
import { Label } from "@/components/ui/label"


export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as Extract<FormElementInstance, { type: "ParagraphField" }>

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