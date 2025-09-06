'use client'

import { FormElementInstance, SubmitFunction } from "@/components/FormElements"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here..."
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}
export default function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue }:
    {
        elementInstance: FormElementInstance
        submitValue?: SubmitFunction
        isInvalid?: boolean
        defaultValue?: string
    }) {
    const element = elementInstance as CustomInstance
    const [value, setValue] = useState(defaultValue || "")

    useEffect(() => {
        setValue(defaultValue || "")
    }, [defaultValue])

    const { label, helperText, placeHolder, required } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label
                className={cn(isInvalid && "text-red-500")}
            >
                {label}
                {required && "*"}
            </Label>
            <Input
                className={cn(isInvalid && "text-red-500")}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if (!submitValue) return
                    submitValue(element.id, e.target.value)
                }}
            />
            {helperText &&
                <p className={cn("text-muted-foreground text-[0.8rem]",
                    isInvalid && "text-red-500"
                )}>{helperText}</p>
            }
        </div>
    )
}
