"use client"

import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { formSchema, formSchemaType } from "@/schemas/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { LoaderCircle } from "lucide-react"


export default function CreateFormButton() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: formSchemaType) {
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create new form</Button>
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
                                        <Input {...field} />
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
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button disabled={form.formState.isSubmitting} className="w-full mt-4">
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
