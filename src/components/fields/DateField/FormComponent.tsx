'use client'

import { FormElementInstance, SubmitFunction } from "@/components/FormElements"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar1 } from "lucide-react"
import { useState } from "react"

export const extraAttributes = {
    label: "Date Field",
    helperText: "Pick a date",
    required: false,
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
    const [date, setDate] = useState<string>(defaultValue || "")



    const { label, helperText, required } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label
                className={cn(isInvalid && "text-red-500")}
            >
                {label}
                {required && "*"}
            </Label>

            <Popover >
                <PopoverTrigger asChild>

                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            isInvalid && "border-red-500")}
                    >
                        <Calendar1 className="mr-2 size-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">

                    {/* Temporary date picker since shadcn's calendar isn't working well */}
                    <Input
                        type="date"
                        value={date ? new Date(date).toISOString().split('T')[0] : ""}
                        onChange={(e) => {
                            const newDate = e.target.value;
                            setDate(newDate);
                            if (submitValue) {
                                submitValue(element.id, newDate);
                            }
                        }}
                        className={cn(
                            "w-full p-2 border rounded-md",
                            isInvalid && "border-red-500 border-2"
                        )}
                    />
                </PopoverContent>
            </Popover>

            {helperText &&
                <p className={cn("text-muted-foreground text-[0.8rem]",
                    isInvalid && "text-red-500"
                )}>{helperText}</p>
            }
        </div>
    )
}
