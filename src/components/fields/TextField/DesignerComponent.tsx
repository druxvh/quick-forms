'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here..."
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, helperText, placeHolder, required } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder} />
            {helperText &&
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            }
        </div>
    )
}