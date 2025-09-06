"use client"

import { Heading2 } from "lucide-react"
import { ElementsType, FormElement, FormElementInstance } from "../../FormElements"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "SubTitleField"

export const extraAttributes = {
    subTitle: "SubTitle Field",
}
export type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

export const SubTitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Heading2,
        label: "SubTitle Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}