"use client"

import { Heading2 } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { subTitlePropsSchema, subTitlePropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

const type: ElementsType = "SubTitleField"

const extraAttributes = {
    subTitle: "SubTitle Field",
}

export const SubTitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Heading2,
        label: "SubTitle Field"
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
    const { subTitle } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label className="text-muted-foreground">
                SubTitle field
            </Label>
            <p className="text-md">{subTitle}</p>
        </div>
    )
}


function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {

    const element = elementInstance as CustomInstance
    const { subTitle } = element.extraAttributes
    return (
        <p className="text-md">{subTitle}</p>
    )
}


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
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
