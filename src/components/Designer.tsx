"use client"

import { cn } from "@/lib/utils"
import DesignerSidebar from "./DesignerSidebar"
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import useDesigner from "@/hooks/useDesigner"
import { ElementsType, FormElementInstance, FormElements } from "@/types/form"
import idGenerator from "@/lib/idGenerator"
import { useState } from "react"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"

export default function Designer() {
    const { elements, addElement, removeElement, selectedElement, setSelectedElement } = useDesigner()
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true
        }
    })
    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {

            const { active, over } = event
            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement

            // dropping a sidebar btn element over the designer drop area
            const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea

            if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
                const type = active.data?.current?.type
                const newElement = FormElements[type as ElementsType].construct(idGenerator())

                // add elements in a natural top to bottom flow
                addElement(elements.length, newElement)
                return
            }

            // dropping a sidebar btn element over the designer element
            const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement
            const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement

            const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf

            if (isDroppingOverDesignerElement && isDesignerBtnElement) {
                const type = active.data?.current?.type
                const newElement = FormElements[type as ElementsType].construct(idGenerator())

                const overId = over.data?.current?.elementId

                const overElementIndex = elements.findIndex((el) => el.id === overId)
                if (overElementIndex === -1) {
                    throw new Error("Element Not Found!")
                }

                // assuming the element is on top
                let indexForNewElement = overElementIndex

                // if over element's bottom half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1
                }

                // add element to the designated index
                addElement(indexForNewElement, newElement)
                return
            }


            // dragging designer element over other designer elements
            const isDraggingDesignerElement = active.data?.current?.isDesignerElement

            if (isDroppingOverDesignerElement && isDraggingDesignerElement) {
                const activeId = active.data?.current?.elementId
                const overId = over.data?.current?.elementId

                if (activeId === overId) return;

                const activeElementIndex = elements.findIndex((el) => el.id === activeId)
                const overElementIndex = elements.findIndex((el) => el.id === overId)

                if (activeElementIndex === -1 || overElementIndex === -1) {
                    throw new Error("Element Not Found!")
                }

                // assuming the element is on top
                let indexForNewElement = overElementIndex

                // if over element's bottom half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1
                }

                const activeElement = { ...elements[activeElementIndex] }
                removeElement(activeId)
                // add element to the designated index
                addElement(indexForNewElement, activeElement)

            }
        }
    })

    return (
        <div className="flex w-full h-full">
            <div
                className="p-4 w-full"
                onClick={() => {
                    if (selectedElement) setSelectedElement(null)
                }}
            >
                <div
                    ref={droppable.setNodeRef}
                    className={cn("bg-background outline max-w-3xl h-full m-auto rounded-md flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
                        droppable.isOver && "ring-2 ring-primary"
                    )}>
                    {!droppable.isOver && elements.length === 0 &&
                        <p className="text-2xl text-muted-foreground flex flex-grow items-center font-semibold">Drop here</p>
                    }
                    {droppable.isOver && elements.length === 0 &&
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-md bg-primary/70">
                            </div>
                        </div>
                    }

                    {
                        elements.length > 0 && <div className="flex flex-col w-full gap-2 p-4">
                            {elements.map(el => (
                                <DesignerElementWrapper key={el.id} element={el} />
                            ))}
                        </div>
                    }
                </div>
            </div>
            <DesignerSidebar />
        </div>
    )
}


function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
    const { removeElement, setSelectedElement } = useDesigner()
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true
        }
    })

    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true
        }
    })

    const draggable = useDraggable({
        id: element.id + "-drag-handler",
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true
        }
    })

    if (draggable.isDragging) return null;

    const DesignerElement = FormElements[element.type].designerComponent

    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative h-fit flex flex-col text-foreground  rounded-md ring-1 ring-accent ring-inset hover:cursor-pointer"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={(e) => {
                e.stopPropagation()
                setSelectedElement(element)
            }}
        >
            <div
                ref={topHalf.setNodeRef}
                className="absolute w-full h-1/2 rounded-t-md"></div>
            <div
                ref={bottomHalf.setNodeRef}
                className="absolute bottom-0 w-full h-1/2 rounded-b-md"></div>

            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full">
                        <Button
                            className="flex justify-center h-full border rounded-md rounded-l-none text-primary/90 bg-red-500 hover:bg-red-600 cursor-pointer"
                            // variant={"outline"}
                            onClick={(e) => {
                                e.stopPropagation()
                                removeElement(element.id)
                            }}
                        >
                            <Trash className="size-5" />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
                    </div>
                </>
            )}
            {topHalf.isOver && (
                <div className="absolute top-0 w-full rounded-md bg-primary rounded-b-none h-[3px]" />
            )}
            {bottomHalf.isOver && (
                <div className="absolute bottom-0 w-full rounded-md bg-primary rounded-t-none h-[3px]" />
            )}

            <div className={cn("flex w-full h-fit items-center rounded-md bg-accent/40 p-4 pointer-events-none",
                mouseIsOver && "opacity-30"
            )}>
                <DesignerElement elementInstance={element} />
            </div>
        </div>
    )
}