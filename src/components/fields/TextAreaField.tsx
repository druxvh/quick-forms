"use client"

import { CaseSensitive } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { textAreaPropsSchema, textAreaPropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { Textarea } from "../ui/textarea"
import { Slider } from "../ui/slider"

const type: ElementsType = "TextAreaField"
const extraAttributes = {
    label: "Text area",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here...",
    rows: 3
}

export const TextAreaField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: CaseSensitive,
        label: "TextArea Field"
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

function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue }:
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

    const { label, helperText, placeHolder, required, rows } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label
                className={cn(isInvalid && "text-red-500")}
            >
                {label}
                {required && "*"}
            </Label>
            <Textarea
                className={cn(isInvalid && "text-red-500")}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(e) => {
                    if (!submitValue) return
                    submitValue(element.id, e.target.value)
                }}
                rows={rows}
            />
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
    const { label, helperText, placeHolder, required, rows } = element.extraAttributes

    const form = useForm<textAreaPropsSchemaType>({
        resolver: zodResolver(textAreaPropsSchema),
        mode: "onBlur",
        defaultValues: {
            label,
            helperText,
            required,
            placeHolder,
            rows
        }
    })

    // updates the changes
    function applyChanges(values: textAreaPropsSchemaType) {
        const { label, helperText, placeHolder, required, rows } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
                rows
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
                    name="placeHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Placeholder</FormLabel>
                            <FormControl>
                                <Input {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur()
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field.
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
                    name="rows"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rows {form.watch("rows")}</FormLabel>
                            <FormControl>
                                <Slider

                                    defaultValue={[field.value]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={value => {

                                        field.onChange(value[0])
                                    }}
                                />
                            </FormControl>
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
