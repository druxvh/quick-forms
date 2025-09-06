'use client'

import { FormElementInstance } from "@/components/FormElements"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import useDesigner from "@/hooks/useDesigner"
import { spacerPropsSchema, spacerPropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const extraAttributes = {
    height: 20 //px
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export default function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { updateElement } = useDesigner()

    const form = useForm<spacerPropsSchemaType>({
        resolver: zodResolver(spacerPropsSchema),
        mode: "onBlur",
        defaultValues: {
            height: element.extraAttributes?.height
        }
    })

    // updates the changes
    function applyChanges(values: spacerPropsSchemaType) {
        const { height } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                height
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
                    name="height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height (px): {form.watch("height")}</FormLabel>
                            <FormControl className="p-2">
                                <Slider
                                    defaultValue={[field.value]}
                                    min={5}
                                    max={200}
                                    step={5}
                                    onValueChange={(value) => {
                                        field.onChange(value[0])
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
