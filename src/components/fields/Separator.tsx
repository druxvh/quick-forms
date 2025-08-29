"use client"

import { Minus } from "lucide-react"
import { ElementsType, FormElement } from "../FormElements"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

const type: ElementsType = "SeparatorField"

export const SeparatorField: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: Minus,
        label: "Separator"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true
}

function DesignerComponent() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label className="text-muted-foreground">
                Separator field
            </Label>
            <Separator />
        </div>
    )
}


function FormComponent() {
    return <Separator />
}


function PropertiesComponent() {
    return (
        <p>No properties for this element.</p>
    )
}
