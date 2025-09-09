'use client'

import { FormElementInstance } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import useDesigner from "@/hooks/useDesigner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { selectFieldSchema, SelectFieldSchemaT } from "@/schemas"

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as Extract<FormElementInstance, { type: "SelectField" }>
    const { updateElement, setSelectedElement } = useDesigner()
    const { label, helperText, placeholder, required, options } = element.extraAttributes

    const form = useForm({
        resolver: zodResolver(selectFieldSchema),
        mode: "onSubmit",
        defaultValues: { label, helperText, placeholder, required, options }
    })

    // updates the changes
    function applyChanges(values: SelectFieldSchemaT) {
        const { label, helperText, placeholder, required, options } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeholder,
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
                    name="placeholder"
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
