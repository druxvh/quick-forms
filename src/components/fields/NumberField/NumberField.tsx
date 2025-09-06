"use client"

import { Hash } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements"

import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "NumberField"

export const extraAttributes = {
    label: "Number Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "0"
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const NumberField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Hash,
        label: "Number Field"
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

        if (value.trim().length > 0 && isNaN(Number(value))) {
            return false
        }

        return true
    }
}
