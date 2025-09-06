'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useDesigner from "@/hooks/useDesigner"
import { titlePropsSchema, titlePropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const extraAttributes = {
    title: "Title Field",
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { updateElement } = useDesigner()
    // const { title } = element.extraAttributes

    const form = useForm<titlePropsSchemaType>({
        resolver: zodResolver(titlePropsSchema),
        mode: "onBlur",
        defaultValues: {
            title: element.extraAttributes?.title
        }
    })

    // updates the changes
    function applyChanges(values: titlePropsSchemaType) {
        const { title } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
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
