"use client"

import { FormElementInstance, SubmitFunction } from "@/types/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue }:
    {
        elementInstance: FormElementInstance
        submitValue?: SubmitFunction
        isInvalid?: boolean
        defaultValue?: string
    }) {
    const element = elementInstance as FieldInstance<"CheckboxField">
    const [value, setValue] = useState<boolean>(defaultValue === "true" ? true : false)

    const { label, helperText, required } = element.extraAttributes
    const id = `checkbox-${element.id}`

    return (
        <div className="flex items-start space-x-2">

            <Checkbox
                id={id}
                className={cn(isInvalid && "text-red-500")}
                checked={value}
                onCheckedChange={(checked) => {
                    let value = false
                    if (checked === true) value = true
                    setValue(value)
                    const stringVal = value ? "true" : "false"
                    if (!submitValue) return
                    submitValue(element.id, stringVal)
                }}
            />
            <div className="grid gap-2 leading-none">

                <Label htmlFor={id} className={cn(isInvalid && "text-red-500")}>
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
