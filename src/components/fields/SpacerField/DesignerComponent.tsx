'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Label } from "@/components/ui/label"
import { SeparatorHorizontal } from "lucide-react"

export const extraAttributes = {
    height: 20 //px
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
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