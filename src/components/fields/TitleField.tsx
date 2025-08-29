"use client"

import { Heading1 } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { titlePropsSchema, titlePropsSchemaType } from "@/schemas/element-properties"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "@/hooks/useDesigner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
// import { Switch } from "../ui/switch"
// import { cn } from "@/lib/utils"

const type: ElementsType = "TitleField"

const extraAttributes = {
    title: "Title Field",
}

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Heading1,
        label: "Title Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    formElement: undefined,


    validate: () => true
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { title } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label className="text-muted-foreground">
                Title field
            </Label>
            <p className="text-xl">{title}</p>
        </div>
    )
}


function FormComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {

    const element = elementInstance as CustomInstance
    const { title } = element.extraAttributes
    return (
        <p className="text-xl">{title}</p>
    )
}


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
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
