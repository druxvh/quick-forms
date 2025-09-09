'use client'

import { FormElementInstance } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar1 } from "lucide-react"

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as Extract<FormElementInstance, { type: "DateField" }>
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