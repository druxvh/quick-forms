"use client"

import { CalendarDays } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "DateField"

export const extraAttributes = {
    label: "Date Field",
    helperText: "Pick a date",
    required: false,
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const DateField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: CalendarDays,
        label: "Date Field"
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