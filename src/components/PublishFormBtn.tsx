"use client"

import { LoaderCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useTransition } from "react"
import { AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialog } from "./ui/alert-dialog"
import { toast } from "sonner"
import { publishFormById } from "../../actions/form"
import { useRouter } from "next/navigation"

export default function PublishFormBtn({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition()
    const { refresh } = useRouter()

    async function publishForm() {
        try {
            await publishFormById(id)
            toast.success("Success", {
                description: "Your form is now available to the public"
            })
            refresh()
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong"
            })
            console.error("Publish form btn Err: ", error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
                        disabled={isPending}
                        onClick={(e) => {
                            e.preventDefault()
                            startTransition(publishForm)
                        }}
                    >
                        {isPending
                            ?
                            <LoaderCircle className="size-4 animate-spin" />
                            :
                            <span>Proceed</span>
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    )
}
