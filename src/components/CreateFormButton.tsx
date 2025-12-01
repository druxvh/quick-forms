'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { File, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createForm } from '@/actions/form';
import { createFormSchema, createFormSchemaT } from '@/schemas';

export default function CreateFormButton() {
    const router = useRouter();
    const form = useForm<createFormSchemaT>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    async function onSubmit(data: createFormSchemaT) {
        try {
            const formId = await createForm(data);
            toast.success('Form created successfully!', {
                position: 'bottom-center',
            });
            router.push(`/builder/${formId}`);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong, please try again later.', {
                position: 'bottom-center',
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={'outline'}
                    className="group border-primary/20 flex h-52 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed"
                >
                    <File className="text-muted-foreground group-hover:text-primary size-7" />
                    <p className="text-muted-foreground group-hover:text-primary text-base font-semibold">
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
                                        <Input
                                            placeholder="What you wanna name this form?"
                                            {...field}
                                        />
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
                                        <Textarea
                                            placeholder="Describe what the form is about?"
                                            rows={5}
                                            {...field}
                                        />
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
                        className="mt-4 w-full"
                    >
                        {form.formState.isSubmitting ? (
                            <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                            <span>Save</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
