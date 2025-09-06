'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useDesigner from "@/hooks/useDesigner"
import { subTitlePropsSchema, subTitlePropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const extraAttributes = {
    subTitle: "SubTitle Field",
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}
export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { updateElement } = useDesigner()

    const form = useForm<subTitlePropsSchemaType>({
        resolver: zodResolver(subTitlePropsSchema),
        mode: "onBlur",
        defaultValues: {
            subTitle: element.extraAttributes?.subTitle
        }
    })

    // updates the changes
    function applyChanges(values: subTitlePropsSchemaType) {
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
