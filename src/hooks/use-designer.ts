import { useDesignerStore } from "@/store/designer.store";
import { useShallow } from 'zustand/shallow'

// custom hooks for accessing designer store 
// useShallow to prevent unnecessary re-renders 

export const useDesignerElements = () => useDesignerStore(useShallow((state) => state.elements))

export const useDesignerSelectedElement = () => useDesignerStore(useShallow((state) => state.selectedElement))

export const useDesignerActions = () => useDesignerStore(useShallow((state) => ({
    activeElementId: state.activeElementId,
    addElement: state.addElement,
    removeElement: state.removeElement,
    updateElement: state.updateElement,
    setElements: state.setElements,
    setSelectedElement: state.setSelectedElement,
    setActiveElementId: state.setActiveElementId,
})))
