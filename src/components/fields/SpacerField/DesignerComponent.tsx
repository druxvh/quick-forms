'use client'

import { FormElementInstance } from "@/types/form"
import { Label } from "@/components/ui/label"
import { SeparatorHorizontal } from "lucide-react"


export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as Extract<FormElementInstance, { type: "SpacerField" }>
    const { height } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <Label>
                Spacer field: {height}px
            </Label>
            <SeparatorHorizontal className="size-8" />
        </div>
    )
}