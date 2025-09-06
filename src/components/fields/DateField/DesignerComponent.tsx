'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar1 } from "lucide-react"

export const extraAttributes = {
    label: "Date Field",
    helperText: "Pick a date",
    required: false,
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}
export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, helperText, required } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Button
                className="w-full justify-start text-left font-normal"
                variant={"outline"}>
                <Calendar1 className="mr-2 size-4" />
                <span>Pick a date</span>
            </Button>
            {helperText &&
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            }
        </div>
    )
}