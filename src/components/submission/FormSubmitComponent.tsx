'use client';

import { useCallback, useState, useTransition } from 'react';
import { FormElementInstance, FormElements } from '@/types/form';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { submitFormAction } from '@/actions/form';
import { cn } from '@/lib/utils';

export default function FormSubmitComponent({
    formUrl,
    content,
}: {
    formUrl: string;
    content: FormElementInstance[];
}) {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isEmptyFormData = Object.keys(formData).length === 0;

    const validateForm = useCallback(
        (data: Record<string, string> = formData) => {
            const newErrors: Record<string, boolean> = {};

            content.forEach((field) => {
                const value = data[field.id] || '';
                const validator = FormElements[field.type].validate;

                if (validator && !validator(field, value)) {
                    newErrors[field.id] = true;
                }
            });

            setFormErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        },
        [content, formData],
    );

    function submitValue(key: string, value: string) {
        setFormData((prev) => {
            const newData = { ...prev, [key]: value };

            // validate this specific field immediately
            const isValid = FormElements[
                content.find((c) => c.id === key)!.type
            ].validate(content.find((c) => c.id === key)!, value);

            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [key]: !isValid,
            }));
            return newData;
        });
    }

    const handleSubmitForm = async () => {
        if (isEmptyFormData) {
            toast.error(
                "Can't submit an empty form. Please fill out at least one field.",
            );
            return;
        }
        try {
            const isValid = validateForm();

            if (!isValid) {
                toast.error('Please fill all required fields correctly.');
                return;
            }

            await submitFormAction(formUrl, formData);

            toast.success('Form submitted successfully!');

            setSubmitted(true);
        } catch (error) {
            toast.error('Something went wrong.');
            console.error('submit form error: ', error);
        }
    };

    if (submitted) {
        return (
            <div className="bg-background flex h-full w-full grow items-center justify-center p-4">
                <div className="flex max-w-2xl grow flex-col gap-5 overflow-y-auto rounded-md p-4">
                    <h1 className="text-2xl font-semibold">Form submitted</h1>
                    <p className="text-muted-foreground">
                        Thank you for submitting the form, you can now close this page
                        now.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full grow items-center justify-center p-4">
            <div className="flex max-w-2xl grow flex-col gap-8 overflow-y-auto p-4">
                {content.map((element) => {
                    const FormComponent = FormElements[element.type].formComponent;
                    const isInvalid = formErrors[element.id];

                    return (
                        <div
                            key={element.id}
                            className={
                                isInvalid ? 'rounded-md border-2 border-red-500 p-2' : ''
                            }
                        >
                            <FormComponent
                                elementInstance={element}
                                submitValue={submitValue}
                                isInvalid={isInvalid}
                                defaultValue={formData[element.id]}
                            />
                            {isInvalid && (
                                <p className="mt-1 text-sm text-red-500">
                                    This field is required.
                                </p>
                            )}
                        </div>
                    );
                })}
                <Button
                    className={cn('mt-6', isEmptyFormData && 'cursor-not-allowed')}
                    onClick={() => {
                        startTransition(handleSubmitForm);
                    }}
                    disabled={isPending || isEmptyFormData}
                >
                    {isPending ? (
                        <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </div>
        </div>
    );
}
