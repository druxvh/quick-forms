import useDesigner from "@/hooks/useDesigner"
import { Button } from "./ui/button"
import { updateFormContentById } from "../../actions/form"
import { toast } from "sonner"
import { useTransition } from "react"
import { LoaderCircle } from "lucide-react"

export default function SaveFormBtn({ id }: { id: number }) {
    const { elements } = useDesigner()
    const [isPending, startTransition] = useTransition()

    const updateFormContent = async () => {
        try {
            const jsonElements = JSON.stringify(elements)
            await updateFormContentById(id, jsonElements)
            toast.success("Success", {
                description: "Your form has been saved",
            })
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong",
            })
            console.error(error)
        }
    }

    return (
        <Button
            disabled={isPending}
            onClick={() => {
                startTransition(updateFormContent)
            }}
        >
            {isPending
                ?
                <LoaderCircle className="size-4 animate-spin" />
                :
                <span>Save</span>
            }
        </Button>
    )
}
