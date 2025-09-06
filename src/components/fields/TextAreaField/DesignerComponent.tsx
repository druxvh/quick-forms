'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const extraAttributes = {
    label: "Text area",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here...",
    rows: 3
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}
export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, helperText, placeHolder, required, rows } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Textarea readOnly disabled placeholder={placeHolder} rows={rows} />
            {helperText &&
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            }
        </div>
    )
}