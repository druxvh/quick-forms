"use client"

import { DesignerContext } from "@/context/DesignerContext"
import { useContext } from "react"

export default function useDesigner() {
    const context = useContext(DesignerContext)
    if (!context) {
        throw new Error("useDesigner should be used within a DesignerContext")
    }
    return context
}