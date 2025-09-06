'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const extraAttributes = {
    label: "Number Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "0"
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
            <Input
                readOnly
                disabled
                type="number"
                placeholder={placeHolder}
                onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault()
                    }
                }}
            />
            {helperText &&
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            }
        </div>
    )
}
