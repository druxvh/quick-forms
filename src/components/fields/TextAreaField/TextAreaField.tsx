"use client"

import { CaseSensitive } from "lucide-react"
import { ElementsType, FieldInstance, FormElement, FormElementInstance, getDefaultAttributes } from "@/types/form"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "TextAreaField"

export const TextAreaField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: CaseSensitive,
        label: "TextArea Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as FieldInstance<"TextAreaField">
        const { required } = element.extraAttributes
        if (required) {
            return value.trim().length > 0
        }
        return true
    }
}