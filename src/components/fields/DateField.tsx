"use client"

import { Calendar1, CalendarDays } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { dateFieldPropsSchema, dateFieldPropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
// import { Calendar } from "../ui/calendar"

const type: ElementsType = "DateField"
const extraAttributes = {
    label: "Date Field",
    helperText: "Pick a date",
    required: false,
}

export const DateField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: CalendarDays,
        label: "Date Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as CustomInstance

        const { required } = element.extraAttributes

        if (required) {
            return value.trim().length > 0
        }

        return true
    }
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
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


function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue }:
    {
        elementInstance: FormElementInstance
        submitValue?: SubmitFunction
        isInvalid?: boolean
        defaultValue?: string
    }) {
    const element = elementInstance as CustomInstance
    // const [value, setValue] = useState(defaultValue || "")
    // const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined)
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

                    {/* <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(date) => {
                                setDate(date);
                                if (!submitValue) return;
                                const value = date?.toUTCString() || "";
                                submitValue(element.id, value);
                            }}
                            initialFocus
                        /> */}

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


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { updateElement } = useDesigner()
    const { label, helperText, required } = element.extraAttributes

    const form = useForm<dateFieldPropsSchemaType>({
        resolver: zodResolver(dateFieldPropsSchema),
        mode: "onBlur",
        defaultValues: {
            label,
            helperText,
            required,
        }
    })

    // updates the changes
    function applyChanges(values: dateFieldPropsSchemaType) {
        const { label, helperText, required } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required
            }
        })

    }

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
            >

                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur()
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The label of the field. <br /> It will be displayed above the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Helper text</FormLabel>
                            <FormControl>
                                <Input {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur()
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The Helper text of the field. <br /> It will be displayed above the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem
                            className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
                        >
                            <div className="space-y-1">
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                    Marks field as required
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
