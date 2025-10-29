"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { SquarePen, Trash } from "lucide-react"

export default function ElementToolbar({ onEdit, onDelete }: {
    onEdit: (e: React.MouseEvent) => void,
    onDelete: (e: React.MouseEvent) => void,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 -top-4 flex gap-2 bg-background/95 shadow-sm border rounded-md px-2 py-1 z-20"
        >
            <Button
                size="icon"
                variant="ghost"
                onClick={onEdit}
                className="text-foreground/80 hover:text-primary"
            >
                <SquarePen className="size-4" />
            </Button>

            <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
                className="text-red-500 hover:bg-red-500/10"
            >
                <Trash className="size-4" />
            </Button>
        </motion.div>
    )
}
