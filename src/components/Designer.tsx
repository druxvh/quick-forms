"use client"

import { cn } from "@/lib/utils"
import DesignerSidebar from "./DesignerSidebar"
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';
import useDesigner from "@/hooks/useDesigner"
import { ElementsType, FormElementInstance, FormElements } from "@/types/form"
import idGenerator from "@/lib/idGenerator"
import { useState } from "react"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"

export default function Designer() {
    const { elements, setElements, addElement, selectedElement, setSelectedElement } = useDesigner()

    const { setNodeRef, isOver } = useDroppable({
        id: "designer-drop-area",
        data: { isDesignerDropArea: true }
    })

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {

            const { active, over } = event
            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
            const isDesignerElement = active.data?.current?.isDesignerElement
            const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea
            const isDroppingOverDesignerElement = over.data?.current?.elementId

            // Sidebar Btns -> Drop into empty the designer area

            if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {

                const type = active.data?.current?.type
                const newElement = FormElements[type as ElementsType].construct(idGenerator())

                // add elements in a natural top to bottom flow
                addElement(elements.length, newElement)
                return
            }

            // Sidebar Btns -> Droping over an element

            if (isDesignerBtnElement && isDroppingOverDesignerElement) {
                const type = active.data?.current?.type
                const newElement = FormElements[type as ElementsType].construct(idGenerator())

                const overId = over.data?.current?.elementId

                const overIndex = elements.findIndex((el) => el.id === overId)
                if (overIndex === -1) return

                // add element to the designated index
                addElement(overIndex, newElement)
                return
            }


            // Re-Ordering
            // dragging designer element over other designer elements

            if (isDesignerElement && isDroppingOverDesignerElement) {
                const activeId = active.data?.current?.elementId
                const overId = over.data?.current?.elementId

                if (activeId === overId) return;

                const activeIndex = elements.findIndex((el) => el.id === activeId)
                const overIndex = elements.findIndex((el) => el.id === overId)

                if (activeIndex === -1 || overIndex === -1) {
                    return
                }

                setElements(arrayMove(elements, activeIndex, overIndex))
                return

            }

            // Dragging designer element into empty area -> place at bottom
            if (isDesignerElement && isDroppingOverDesignerDropArea) {
                const activeId = active.data?.current?.elementId

                const activeIndex = elements.findIndex((el) => el.id === activeId)

                if (activeIndex === -1) return

                setElements(arrayMove(elements, activeIndex, elements.length - 1))
                return
            }
        }
    })

    return (
        <div className="flex w-full h-full">
            <div
                className="p-4 w-full "
                onClick={() => {
                    if (selectedElement) setSelectedElement(null)
                }}
            >
                {/* Droppable area */}
                <div
                    ref={setNodeRef}
                    className={cn("bg-background border border-border max-w-3xl h-full m-auto rounded-md flex flex-col grow items-center flex-1 overflow-y-auto transition-colors",
                        isOver && "ring-2 ring-primary/50",
                        elements.length > 6 && "pb-32"
                    )}>
                    <SortableContext
                        items={elements.map((el) => el.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {
                            elements.length > 0 &&
                            <div className="flex flex-col w-full gap-2 p-4">
                                {elements.map(el => (
                                    <SDesignerElement key={el.id} element={el} />
                                ))}
                            </div>
                        }
                        {/* Empty state */}
                        {!isOver && elements.length === 0 &&
                            <p className="text-xl text-muted-foreground flex grow items-center font-medium">Drag fields here to start building your form
                            </p>
                        }

                        {isOver && elements.length === 0 &&
                            <div className="p-4 w-full">
                                <div className="h-32 w-full rounded-md bg-primary/10 border-2 border-dashed border-primary/40" />
                            </div>
                        }

                    </SortableContext>
                </div>
            </div>
            <DesignerSidebar />
        </div>
    )
}

// sortable designer element
function SDesignerElement({ element }: { element: FormElementInstance }) {
    const { removeElement, setSelectedElement } = useDesigner()
    const [mouseIsOver, setMouseIsOver] = useState(false)

    const { attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver,

    } = useSortable({
        id: element.id,
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    if (isDragging) return null
    // if (isDragging) {
    //     return (
    //         <div className="h-20 flex flex-col items-center justify-center gap-2 w-full rounded-md border-2 border-dashed border-primary/40 bg-primary/10 text-base text-muted-foreground">
    //             <p>Current Dragging Field</p>
    //             <span className="text-sm">If you&apos;ll drop it over the designer area, it&apos;ll append at the last field.</span>
    //         </div>
    //     )
    // }

    const DesignerElement = FormElements[element.type].designerComponent

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="relative h-fit flex flex-col text-foreground rounded-md hover:cursor-pointer"
            // className="relative flex flex-col rounded-md  hover:cursor-pointer transition-all"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={(e) => {
                e.stopPropagation()
                setSelectedElement(element)
            }}
        >
            {/* highlight drop indicator */}
            {isOver && (
                <div className="h-3 my-4 w-full bg-primary/40 rounded-md transition-all" />
            )}

            {/* Delete Btn */}
            {mouseIsOver && (
                <Button
                    size="icon"
                    className="absolute top-2 right-2 rounded-full text-primary/90 bg-red-500 hover:bg-red-600 cursor-pointer opacity-90 hover:opacity-100"
                    onClick={(e) => {
                        e.stopPropagation()
                        removeElement(element.id)
                    }}
                >
                    <Trash className="size-4" />
                </Button>
            )}

            {/* Rendered element */}
            <div className={cn("flex w-full h-fit items-center rounded-md bg-accent/40 p-4 pointer-events-none",
                mouseIsOver && "opacity-30"
            )}>
                <DesignerElement elementInstance={element} />
            </div>
        </div>
    )
}