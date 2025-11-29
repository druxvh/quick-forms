"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"
import { useTransition } from "react"
import { LoaderCircle } from "lucide-react"
import { updateFormContentById } from "@/actions/form"
import { useDesignerElements } from "@/hooks/use-designer"

export default function SaveFormBtn({ id }: { id: string }) {
    const elements = useDesignerElements()
    const [isPending, startTransition] = useTransition()

    const updateFormContent = async () => {
        try {
            if (!elements || elements.length === 0) {
                toast.error("Cannot save empty form", {
                    description: "Add at least one field before saving.",
                })
                return
            }
            // const jsonElements = JSON.stringify(elements)
            // await updateFormContentById(id, jsonElements)

            await updateFormContentById(id, elements)

            toast.success("Saved", {
                description: "Your form has been saved successfully.",
            })
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong while saving",
            })
            console.error(error)
        }
    }

    return (
        <Button
            disabled={isPending || elements.length === 0}
            onClick={() => {
                startTransition(updateFormContent)
            }}
            className="text-xs sm:text-sm cursor-pointer"
        >
            {isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
            ) : (
                <span>Save</span>
            )}
        </Button>
    )
}
