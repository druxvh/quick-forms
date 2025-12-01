'use client';

import { cn } from '@/lib/utils';
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ElementsType, FormElementInstance, FormElements } from '@/types/form';
import idGenerator from '@/lib/idGenerator';
import { useEffect, useRef, useState } from 'react';
import {
    useDesignerActions,
    useDesignerElements,
    useDesignerSelectedElement,
} from '@/hooks/use-designer';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from 'framer-motion';
import ElementToolbar from './ElementToolbar';
import MobileOverlay from './MobileOverlay';
import PreviewCard from './PreviewCard';

let globalAutoHideTimer: NodeJS.Timeout | null = null;

export default function Designer() {
    const {
        setElements,
        addElement,
        activeElementId,
        setSelectedElement,
        setActiveElementId,
    } = useDesignerActions();
    const elements = useDesignerElements();
    const selectedElement = useDesignerSelectedElement();
    const isMobile = useIsMobile();

    const { setNodeRef, isOver } = useDroppable({
        id: 'designer-drop-area',
        data: { isDesignerDropArea: true },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
            const isDesignerElement = active.data?.current?.isDesignerElement;
            const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;
            const isDroppingOverDesignerElement = over.data?.current?.elementId;

            // Sidebar Btns -> Drop into empty the designer area

            if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
                const type = active.data?.current?.type;
                const newElement =
                    FormElements[type as ElementsType].construct(idGenerator());

                // add elements in a natural top to bottom flow
                addElement(elements.length, newElement);
                return;
            }

            // Sidebar Btns -> Droping over an element

            if (isDesignerBtnElement && isDroppingOverDesignerElement) {
                const type = active.data?.current?.type;
                const newElement =
                    FormElements[type as ElementsType].construct(idGenerator());

                const overId = over.data?.current?.elementId;

                const overIndex = elements.findIndex((el) => el.id === overId);
                if (overIndex === -1) return;

                // add element to the designated index
                addElement(overIndex, newElement);
                return;
            }

            // Re-Ordering
            // dragging designer element over other designer elements

            if (isDesignerElement && isDroppingOverDesignerElement) {
                const activeId = active.data?.current?.elementId;
                const overId = over.data?.current?.elementId;

                if (activeId === overId) return;

                const activeIndex = elements.findIndex((el) => el.id === activeId);
                const overIndex = elements.findIndex((el) => el.id === overId);

                if (activeIndex === -1 || overIndex === -1) {
                    return;
                }

                setElements(arrayMove(elements, activeIndex, overIndex));
                return;
            }

            // Dragging designer element into empty area -> place at bottom
            if (isDesignerElement && isDroppingOverDesignerDropArea) {
                const activeId = active.data?.current?.elementId;

                const activeIndex = elements.findIndex((el) => el.id === activeId);

                if (activeIndex === -1) return;

                setElements(arrayMove(elements, activeIndex, elements.length - 1));
                return;
            }
        },
    });

    return (
        <div className="flex h-full w-full flex-col sm:flex-row">
            {/* Left/top(mobile) side - Builder Area */}
            <div
                // className="w-full p-2 sm:p-4 max-h-screen h-full"
                className="flex h-full max-h-[calc(100vh-213px-110px-55px)] w-full gap-4 overflow-hidden p-2 sm:max-h-[calc(100vh-130px)] sm:p-4"
                onClick={() => {
                    if (selectedElement) setSelectedElement(null);
                    if (activeElementId) setActiveElementId(null);
                }}
            >
                <PreviewCard />
                {/* Droppable area */}
                <div
                    ref={setNodeRef}
                    className={cn(
                        'border-border m-auto flex h-full flex-1 flex-col items-center overflow-y-auto scroll-smooth rounded-sm border border-dashed transition-colors',
                        isOver && 'ring-primary/50 ring-2',
                        !isMobile && elements.length > 6 && 'pb-32',
                        isMobile && elements.length > 2 && 'pb-32',
                    )}
                >
                    <SortableContext
                        items={elements.map((el) => el.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {elements.length > 0 && (
                            <motion.div
                                layout
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="flex w-full flex-col gap-2 p-4"
                            >
                                {elements.map((el) => (
                                    <motion.div key={el.id} layout layoutId={el.id}>
                                        <SortableDesignerElement element={el} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </SortableContext>

                    {isOver && elements.length === 0 && (
                        <div className="w-full p-4">
                            <div className="bg-primary/10 border-primary/40 h-32 w-full rounded-md border-2 border-dashed" />
                        </div>
                    )}

                    {/* Empty state */}
                    {!isOver && elements.length === 0 && (
                        <p className="text-muted-foreground/90 flex grow items-center px-2 text-center text-base font-medium text-pretty sm:text-lg">
                            Drag fields here from the elements to start building your form
                        </p>
                    )}
                </div>
            </div>
            {/* Right/bottom(mobile) side */}
            <DesignerSidebar />
        </div>
    );
}

// sortable designer element
function SortableDesignerElement({ element }: { element: FormElementInstance }) {
    const { activeElementId, removeElement, setSelectedElement, setActiveElementId } =
        useDesignerActions();
    const {
        attributes,
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
            isDesignerElement: true,
        },
    });

    const isMobile = useIsMobile();
    const [isLongPressing, setIsLongPressing] = useState(false);

    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const longPressTriggered = useRef(false);

    const isSelected = activeElementId === element.id;
    const DesignerElement = FormElements[element.type].designerComponent;

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            if (longPressTimer.current) clearTimeout(longPressTimer.current);
            if (globalAutoHideTimer) clearTimeout(globalAutoHideTimer);
        };
    }, []);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) return null;

    // activate element with auto-hide timer
    const activateWithAutoHide = (id: string) => {
        setActiveElementId(id);

        if (!isMobile) {
            if (globalAutoHideTimer) clearTimeout(globalAutoHideTimer);
            globalAutoHideTimer = setTimeout(() => {
                setActiveElementId(null);
            }, 6000);
        }
    };

    // remove element
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleOverlayClose();
        removeElement(element.id);
    };

    // edit element
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleOverlayClose();
        setSelectedElement(element);
    };

    // Long press logic for mobile
    const handleTouchStart = () => {
        if (!isMobile) return;
        longPressTriggered.current = false;

        longPressTimer.current = setTimeout(() => {
            longPressTriggered.current = true;
            setIsLongPressing(true);
            activateWithAutoHide(element.id);
        }, 450); // ms long press
    };

    // cancel long press if touch moves
    const handleTouchMove = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };

    // handle touch end
    const handleTouchEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }

        // if longPress triggered, prevent the following click from toggling unintentionally
        // we keep the overlay/toolbar until the user taps outside or the auto-hide timer clears it
        if (longPressTriggered.current) {
            // prevent click handler effect (we set flag and stop)
            // NOTE: the next onClick will still fire; we use the flag in onClick to ignore it.
            setTimeout(() => {
                // small timeout to reset the flag if needed later
                longPressTriggered.current = false; // keep it true for this interaction; optional reset logic
            }, 300);
        }
    };

    // handle click (desktop) or tap (mobile)
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isMobile) return;

        if (longPressTriggered.current) {
            longPressTriggered.current = false;
            return;
        }

        activateWithAutoHide(element.id);
    };

    // close overlay and toolbar
    const handleOverlayClose = () => {
        setIsLongPressing(false);
        setActiveElementId(null);
        longPressTriggered.current = false;
    };

    return (
        <>
            {/* Overlay (when long press active) */}
            <MobileOverlay
                visible={isMobile && isLongPressing}
                onClick={handleOverlayClose}
            />

            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className={cn(
                    'text-foreground relative flex h-fit flex-col rounded-md transition-all select-none hover:cursor-pointer',
                    isSelected
                        ? 'ring-primary/50 ring-2'
                        : 'hover:ring-border hover:ring-1',
                )}
                onClick={handleClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* highlight drop indicator */}
                {isOver && (
                    <div className="bg-primary/40 my-4 h-3 w-full rounded-md transition-all" />
                )}

                {/* Toolbar */}
                <AnimatePresence>
                    {isSelected && (
                        <ElementToolbar
                            elementId={activeElementId}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </AnimatePresence>

                {/* Rendered element */}
                <div
                    className={cn(
                        'bg-accent/40 pointer-events-none flex h-fit w-full items-center rounded-md p-4',
                        isSelected && 'opacity-30',
                    )}
                >
                    <DesignerElement elementInstance={element} />
                </div>
            </div>
        </>
    );
}
