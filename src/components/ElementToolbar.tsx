'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp, SquarePen, Trash } from 'lucide-react';
import { useDesignerMoveActions } from '@/hooks/use-designer';

export default function ElementToolbar({
    elementId,
    onEdit,
    onDelete,
}: {
    elementId: string;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
}) {
    const { moveElementUp, moveElementDown } = useDesignerMoveActions();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -5 }}
            transition={{ duration: 0.15 }}
            className="bg-background/95 absolute -top-4 right-0 z-20 flex gap-2 rounded-md border px-2 py-1 shadow-sm"
        >
            {/* Up */}
            <Button
                size="icon"
                variant="ghost"
                onClick={() => moveElementUp(elementId)}
                aria-label="Move up"
            >
                <ArrowUp className="size-4" />
            </Button>

            {/* Down */}
            <Button
                size="icon"
                variant="ghost"
                onClick={() => moveElementDown(elementId)}
                aria-label="Move down"
            >
                <ArrowDown className="size-4" />
            </Button>
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
    );
}
