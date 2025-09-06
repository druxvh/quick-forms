'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const extraAttributes = {
    label: "Checkbox Field",
    helperText: "Helper Text",
    required: false,
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, helperText, required } = element.extraAttributes
    const id = `checkbox-${element.id}`
    return (
        <div className="flex items-start space-x-2">
            <Checkbox id={id} />
            <div className="grid gap-2 leading-none">

                <Label htmlFor={id}>
                    {label}
                    {required && "*"}
                </Label>

                {helperText &&
                    <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
                }
            </div>
        </div>
    )
}


