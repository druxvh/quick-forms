"use client"

import { CalendarDays } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance, getDefaultAttributes } from "@/types/form"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "DateField"

export const DateField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: CalendarDays,
        label: "Date Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: FormElementInstance, value: string): boolean => {
        const element = formElement as FieldInstance<"DateField">
        const { required } = element.extraAttributes
        if (required) {
            return value.trim().length > 0
        }
        return true
    }
}