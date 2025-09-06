'use client'

import { FormElementInstance } from "@/components/FormElements"
import { FormLabel } from "@/components/ui/form"

export const extraAttributes = {
    subTitle: "SubTitle Field",
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}
export default function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { subTitle } = element.extraAttributes
    return (
        <div className="flex flex-col gap-4 w-full">
            <FormLabel className="text-muted-foreground">
                SubTitle field
            </FormLabel>
            <p className="text-md">{subTitle}</p>
        </div>
    )
}