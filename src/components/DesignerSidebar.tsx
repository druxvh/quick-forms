"use client"

import FormElementsSidebar from "./FormElementsSidebar"
import FormPropertiesSidebar from "./FormPropertiesSidebar"
import { useDesignerSelectedElement } from "@/hooks/use-designer"

export default function DesignerSidebar() {
    const selectedElement = useDesignerSelectedElement()
    return (
        <aside className='h-fit sm:h-full sm:min-w-fit flex flex-col flex-grow gap-2 sm:border-l-1 border-border p-2 sm:p-4 bg-background'>
            {selectedElement
                ?
                <FormPropertiesSidebar />
                :
                <FormElementsSidebar />
            }
        </aside>
    )
}
