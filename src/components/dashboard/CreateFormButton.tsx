'use client';

import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { File, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createFormAction } from '@/actions/form';
import { createFormSchema, createFormSchemaT } from '@/schemas';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';

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
            const formId = await createFormAction(data);
            toast.success('Form created successfully!', {
                position: 'bottom-center',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border':
                        'light-dark(var(--color-green-600), var(--color-green-400))',
                } as React.CSSProperties,
            });
            router.push(`/builder/${formId}`);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong, please try again later.', {
                position: 'bottom-center',
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)',
                } as React.CSSProperties,
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
                <form id="create-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Name Field */}
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input
                                        {...field}
                                        placeholder="What you wanna name this form?"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* Desc Field */}
                        <Controller
                            control={form.control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Description</FieldLabel>
                                    <Textarea
                                        {...field}
                                        placeholder="Describe what the form is about?"
                                        rows={3}
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="create-form"
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
