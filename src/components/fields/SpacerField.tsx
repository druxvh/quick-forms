"use client"

import { SeparatorHorizontal } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { spacerPropsSchema, spacerPropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Slider } from "../ui/slider"

const type: ElementsType = "SpacerField"
const extraAttributes = {
    height: 20 //px
}

export const SpacerField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: SeparatorHorizontal,
        label: "Spacer Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { height } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <Label>
                Spacer field: {height}px
            </Label>
            <SeparatorHorizontal className="size-8" />
        </div>
    )
}

function FormComponent({ elementInstance }:
    {
        elementInstance: FormElementInstance
    }) {
    const element = elementInstance as CustomInstance

    const { height } = element.extraAttributes
    return (
        <div style={{ height, width: "100%" }}>

        </div>
    )
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
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
