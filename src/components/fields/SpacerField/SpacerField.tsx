"use client"

import { SeparatorHorizontal } from "lucide-react"
import { ElementsType, FormElement, getDefaultAttributes } from "@/types/form"
import DesignerComponent from "./DesignerComponent"
import FormComponent from "./FormComponent"
import PropertiesComponent from "./PropertiesComponent"

const type: ElementsType = "SpacerField"

export const SpacerField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: getDefaultAttributes(type),
    }),
    designerBtnElement: {
        icon: SeparatorHorizontal,
        label: "Spacer Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}