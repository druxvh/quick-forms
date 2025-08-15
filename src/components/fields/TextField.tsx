"use client"

import { Text } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const type: ElementsType = "TextField"
const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here..."
}

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Text,
        label: "Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div className="text-white">form Component</div>,
    propertiesComponent: () => <div className="text-white">properties Component</div>,
    formElement: undefined
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance
    const { label, helperText, placeHolder, required } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder} />
            {helperText &&
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            }
        </div>
    )
}