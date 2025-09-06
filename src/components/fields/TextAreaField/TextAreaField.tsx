"use client"

import { CaseSensitive } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "TextAreaField"

export const extraAttributes = {
    label: "Text area",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here...",
    rows: 3
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const TextAreaField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: CaseSensitive,
        label: "TextArea Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as CustomInstance

        const { required } = element.extraAttributes

        if (required) {
            return value.trim().length > 0
        }

        return true
    }
}