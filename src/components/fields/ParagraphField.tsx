"use client"

import { Type } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { paragraphPropsSchema, paragraphPropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"

const type: ElementsType = "ParagraphField"

const extraAttributes = {
    text: "Paragraph Field",
}

export const ParagraphField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Type,
        label: "Paragraph Field"
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
    const { text } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label className="text-muted-foreground">
                Paragraph field
            </Label>
            <p>{text}</p>
        </div>
    )
}


function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {

    const element = elementInstance as CustomInstance
    const { text } = element.extraAttributes
    return (
        <p>{text}</p>
    )
}


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { updateElement } = useDesigner()

    const form = useForm<paragraphPropsSchemaType>({
        resolver: zodResolver(paragraphPropsSchema),
        mode: "onBlur",
        defaultValues: {
            text: element.extraAttributes?.text
        }
    })

    // updates the changes
    function applyChanges(values: paragraphPropsSchemaType) {
        const { text } = values

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                text
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
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={5}
                                    {...field}
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
