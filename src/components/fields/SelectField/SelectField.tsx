"use client"

import { List } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "SelectField"
const extraAttributes = {
    label: "Select Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value here...",
    options: [] as string[]
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const SelectField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: List,
        label: "Select Field"
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
