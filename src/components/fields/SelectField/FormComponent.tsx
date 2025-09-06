'use client'

import { FormElementInstance, SubmitFunction } from "@/components/FormElements"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const extraAttributes = {
    label: "Select Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here...",
    options: [] as string[]
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

    const { label, helperText, placeHolder, required, options } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label
                className={cn(isInvalid && "text-red-500")}
            >
                {label}
                {required && "*"}
            </Label>
            <Select
                defaultValue={value}
                onValueChange={(value) => {
                    setValue(value)
                    if (!submitValue) return
                    submitValue(element.id, value)
                }}
            >
                <SelectTrigger className={cn("w-full",
                    isInvalid && "text-red-500"
                )}>
                    <SelectValue placeholder={placeHolder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {helperText &&
                <p className={cn("text-muted-foreground text-[0.8rem]",
                    isInvalid && "text-red-500"
                )}>{helperText}</p>
            }
        </div>
    )
}
