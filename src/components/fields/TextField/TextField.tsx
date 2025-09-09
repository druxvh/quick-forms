"use client"

import { Text } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, getDefaultAttributes } from "@/types/form"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "TextField"

export const TextField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: Text,
        label: "Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as Extract<FormElementInstance, { type: "TextField" }>
        const { required } = element.extraAttributes
        if (required) {
            return value.trim().length > 0
        }
        return true
    }
}