"use client"

import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { formSchema, formSchemaType } from "@/schemas/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { File, LoaderCircle } from "lucide-react"
import { createForm } from "../../actions/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateFormButton() {

    const router = useRouter()
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await createForm(values)
            toast.success("Form created successfully!", {
                position: "bottom-center",
            })
            router.push(`/builder/${formId}`)

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong, please try again later.", {
                position: "bottom-center",
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="group h-48 flex flex-col items-center justify-center gap-3 border border-primary/20 border-dashed cursor-pointer">
                    <File className="size-7 text-muted-foreground group-hover:text-primary" />
                    <p className="text-base font-semibold text-muted-foreground group-hover:text-primary">
                        Create new form
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Form</DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="What you wanna name this form?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe what the form is about?" rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={form.formState.isSubmitting}
                        className="w-full mt-4">
                        {form.formState.isSubmitting
                            ?
                            <LoaderCircle className="size-4 animate-spin" />
                            :
                            <span>Save</span>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

