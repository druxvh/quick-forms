"use client"

import useDesigner from "@/hooks/useDesigner"
import { FormElements } from "@/types/form"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Separator } from "./ui/separator"

export default function FormPropertiesSidebar() {
    const { selectedElement, setSelectedElement } = useDesigner()
    if (!selectedElement) return null

    const FormProperties = FormElements[selectedElement?.type].propertiesComponent
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <p className="text-sm text-foreground/70">Element Properties</p>
                <Button
                    // size={"icon"}
                    variant={"ghost"}
                    onClick={() => setSelectedElement(null)}
                >
                    <X />
                </Button>
            </div>
            <Separator className="mb-4" />
            <FormProperties elementInstance={selectedElement} />
        </div>
    )
}
