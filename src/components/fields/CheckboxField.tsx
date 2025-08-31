"use client"

import { SquareCheckBig } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { checkboxPropsSchema, checkboxPropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"

const type: ElementsType = "CheckboxField"
const extraAttributes = {
    label: "Checkbox Field",
    helperText: "Helper Text",
    required: false,
}

export const CheckboxField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: SquareCheckBig,
        label: "Checkbox Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as CustomInstance

        const { required } = element.extraAttributes

        if (required) {
            // return value.trim().length > 0
            return value === "true"
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


function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue }:
    {
        elementInstance: FormElementInstance
        submitValue?: SubmitFunction
        isInvalid?: boolean
        defaultValue?: string
    }) {
    const element = elementInstance as CustomInstance
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


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { updateElement } = useDesigner()
    const { label, helperText, required } = element.extraAttributes

    const form = useForm<checkboxPropsSchemaType>({
        resolver: zodResolver(checkboxPropsSchema),
        mode: "onBlur",
        defaultValues: {
            label,
            helperText,
            required,
        }
    })

    // updates the changes
    function applyChanges(values: checkboxPropsSchemaType) {
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
