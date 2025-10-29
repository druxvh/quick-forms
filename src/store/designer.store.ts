import { FormElementInstance } from '@/types/form'
import { create } from 'zustand'

type DesignerState = {
    elements: FormElementInstance[]
    selectedElement: FormElementInstance | null
    activeElementId: string | null
}

type DesignerActions = {
    addElement: (index: number, element: FormElementInstance) => void
    removeElement: (id: string) => void
    updateElement: (id: string, element: FormElementInstance) => void
    setElements: (elements: FormElementInstance[]) => void
    setSelectedElement: (element: FormElementInstance | null) => void
    setActiveElementId: (id: string | null) => void
}

type DesignerStore = DesignerState & DesignerActions

export const useDesignerStore = create<DesignerStore>()(
    (set) => ({
        //  Initial State
        elements: [],
        selectedElement: null,
        activeElementId: null,

        // Actions
        setElements: (elements) => set({ elements }),

        addElement: (index, element) => set((state) => {
            const newElements = [...state.elements]
            newElements.splice(index, 0, element)
            return { elements: newElements }
        }),

        removeElement: (id) => set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            selectedElement: state.selectedElement?.id === id ? null : state.selectedElement
        })),

        updateElement: (id, element) => set((state) => ({
            elements: state.elements.map((el) => el.id === id ? element : el)
        })),

        setSelectedElement: (selectedElement) => set({ selectedElement }),

        setActiveElementId: (id) => set({ activeElementId: id })
    }),)
