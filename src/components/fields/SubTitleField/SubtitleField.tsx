"use client"

import { Heading2 } from "lucide-react"
import { ElementsType, FormElement, getDefaultAttributes } from "@/types/form"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "SubTitleField"

export const SubTitleField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
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
