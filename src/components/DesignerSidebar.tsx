import FormElementsSidebar from "./FormElementsSidebar"
import FormPropertiesSidebar from "./FormPropertiesSidebar"
import { useDesignerSelectedElement } from "@/hooks/use-designer"

export default function DesignerSidebar() {
    const selectedElement = useDesignerSelectedElement()
    return (
        <aside className='w-md max-w-md flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
            {selectedElement
                ?
                <FormPropertiesSidebar />
                :
                <FormElementsSidebar />
            }
        </aside>
    )
}
