'use client'

import { FormElementInstance } from "@/types/form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import useDesigner from "@/hooks/useDesigner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { checkboxFieldSchema, CheckboxFieldSchemaT } from "@/schemas"

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const { updateElement } = useDesigner()
    const element = elementInstance as Extract<FormElementInstance, { type: "CheckboxField" }>
    const { label, helperText, required } = element.extraAttributes

    const form = useForm({
        resolver: zodResolver(checkboxFieldSchema),
        mode: "onBlur",
        defaultValues: {
            label,
            helperText,
            required,
        }
    })

    // updates the changes
    function applyChanges(values: CheckboxFieldSchemaT) {
        const { label, required, helperText } = values

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
