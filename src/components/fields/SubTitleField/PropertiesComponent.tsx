'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useDesigner from "@/hooks/useDesigner"
import { subTitleFieldSchema, SubTitleFieldSchemaT } from "@/schemas"
import { FieldInstance, FormElementInstance } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"


export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as FieldInstance<"SubTitleField">
    const { updateElement } = useDesigner()
    const { subTitle } = element.extraAttributes

    const form = useForm({
        resolver: zodResolver(subTitleFieldSchema),
        mode: "onBlur",
        defaultValues: {
            subTitle
        }
    })

    // updates the changes
    function applyChanges(values: SubTitleFieldSchemaT) {
        const { subTitle } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                subTitle
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
                    name="subTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SubTitle</FormLabel>
                            <FormControl>
                                <Input {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur()
                                    }}
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