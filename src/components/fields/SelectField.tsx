"use client"

import { List, Plus, X } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { selectFieldPropsSchema, selectFieldPropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { toast } from "sonner"

const type: ElementsType = "SelectField"
const extraAttributes = {
    label: "Select Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here...",
    options: [] as string[]
}

export const SelectField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: List,
        label: "Select Field"
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
    const { label, helperText, placeHolder, required } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeHolder} />
                </SelectTrigger>
            </Select>
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


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { updateElement, setSelectedElement } = useDesigner()
    const { label, helperText, placeHolder, required, options } = element.extraAttributes

    const form = useForm<selectFieldPropsSchemaType>({
        resolver: zodResolver(selectFieldPropsSchema),
        mode: "onSubmit",
        defaultValues: {
            label,
            helperText,
            required,
            placeHolder,
            options
        }
    })

    // updates the changes
    function applyChanges(values: selectFieldPropsSchemaType) {
        const { label, helperText, placeHolder, required, options } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
                options
            }
        })

        toast.success("Success", {
            description: "Properties saved successfully!"
        })

        setSelectedElement(null)

    }

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(applyChanges)}
                className="space-y-6"
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
                <Separator />
                <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Options</FormLabel>
                                <Button
                                    variant={"outline"}
                                    className="gap-2"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        form.setValue("options", field.value.concat("New options"))
                                    }}
                                >
                                    <Plus />
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {form.watch("options").map((option, index) => (
                                    <div key={index} className="flex items-center justify-between gap-1">
                                        <Input
                                            placeholder=""
                                            value={option}
                                            onChange={(e) => {
                                                field.value[index] = e.target.value
                                                field.onChange(field.value)
                                            }}
                                        />
                                        <Button
                                            variant={"ghost"}
                                            size={"icon"}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const newOptions = [...field.value]
                                                newOptions.splice(index, 1)
                                                field.onChange(newOptions)
                                            }}
                                        >
                                            <X />
                                        </Button>

                                    </div>
                                ))}

                            </div>
                            <FormDescription>
                                The Helper text of the field. <br /> It will be displayed above the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
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
                <Separator />
                <Button
                    className="w-full"
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </Form>
    )
}
