import { Active, DragOverlay, DragStartEvent, useDndMonitor } from '@dnd-kit/core'
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import React, { useState } from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { ElementsType, FormElements } from "@/types/form"
import { useDesignerElements } from '@/hooks/use-designer'

export default function DragOverlayWrapper() {
    const elements = useDesignerElements()
    const [draggedItem, setDraggedItem] = useState<Active | null>(null)

    useDndMonitor({
        onDragStart: (e: DragStartEvent) => {
            const { active } = e
            setDraggedItem(active)
        },
        onDragCancel: () => {
            setDraggedItem(null)
        }
        ,
        onDragEnd: () => {
            setDraggedItem(null)
        }
    })

    if (!draggedItem) return null;

    let node = <div>No Node in the DragOverlayWrapper</div>

    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement

    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement

    if (isDesignerElement) {
        const elementId = draggedItem.data?.current?.elementId
        const element = elements.find((el) => el.id === elementId)
        if (!element) node = <div>Element Not Found</div>
        else {
            const DesignerElementComponent = FormElements[element.type].designerComponent

            node = (
                <div className='flex bg-accent border rounded-md h-[120px] w-full p-4 opacity-50 pointer-events-none'>
                    <DesignerElementComponent elementInstance={element} />
                </div>
            )
        }
    }

    return (
        <DragOverlay modifiers={[restrictToWindowEdges]}>{node}</DragOverlay>
    )
}
