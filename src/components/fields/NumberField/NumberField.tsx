"use client"

import { Hash } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, getDefaultAttributes } from "@/types/form"

import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "NumberField"

export const NumberField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: Hash,
        label: "Number Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as Extract<FormElementInstance, { type: "NumberField" }>
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
