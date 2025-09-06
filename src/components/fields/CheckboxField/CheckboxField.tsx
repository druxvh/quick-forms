"use client"

import { SquareCheckBig } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "CheckboxField"

export const extraAttributes = {
    label: "Checkbox Field",
    helperText: "Helper Text",
    required: false,
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const CheckboxField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: SquareCheckBig,
        label: "Checkbox Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as CustomInstance

        const { required } = element.extraAttributes

        if (required) {
            // return value.trim().length > 0
            return value === "true"
        }

        return true
    }
}