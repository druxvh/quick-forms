"use client"

import { LoaderCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useTransition } from "react"
import { AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialog } from "./ui/alert-dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { publishFormById } from "@/actions/form"
import { useDesignerElements } from "@/hooks/use-designer"

export default function PublishFormBtn({ id }: { id: string }) {
    const elements = useDesignerElements()
    const [isPending, startTransition] = useTransition()
    const { refresh } = useRouter()

    const isFormEmpty = !elements || elements.length === 0

    async function publishForm() {
        try {
            if (isFormEmpty) {
                toast.error("Cannot publish empty form", {
                    description: "Add at least one field and save it before publishing.",
                })
                return
            }
            await publishFormById(id)
            toast.success("Published!", {
                description: "Your form is now available to the public.",
            })
            refresh()
        } catch (error) {
            toast.error("Publish failed", {
                description: "Something went wrong while publishing.",
            })
            console.error("Publish form btn Err: ", error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={isPending || isFormEmpty}
                    className="text-xs sm:text-sm cursor-pointer"
                >
                    {isPending ? (
                        <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                        "Publish"
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-pretty">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing you will not be able to edit this form.
                        <br />
                        <br />
                        <span className="font-medium">
                            By publishing this form you will make it available to the public and you will be able to collect submissions.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending || isFormEmpty}
                        onClick={(e) => {
                            e.preventDefault()
                            startTransition(publishForm)
                        }}
                    >
                        {isPending
                            ?
                            <LoaderCircle className="size-4 animate-spin" />
                            :
                            <span>Publish Now</span>
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    )
}
