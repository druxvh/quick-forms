"use client"

import { useCallback, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './FormElements'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { submitForm } from '../../actions/form'

export default function FormSubmitComponent({
    formUrl,
    content
}: {
    formUrl: string
    content: FormElementInstance[]
}) {
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})
    const [submitted, setSubmitted] = useState(false)
    const [isPending, startTransition] = useTransition()


    const validateForm = useCallback((data: Record<string, string> = formData) => {
        const newErrors: Record<string, boolean> = {}

        content.forEach((field) => {
            const value = data[field.id] || ""
            const validator = FormElements[field.type].validate

            if (validator && !validator(field, value)) {
                newErrors[field.id] = true
            }
        })

        setFormErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [content, formData]);

    function submitValue(key: string, value: string) {
        setFormData(prev => {
            const newData = { ...prev, [key]: value }
            // validate this specific field immediately
            const isValid = FormElements[content.find(c => c.id === key)!.type].validate(
                content.find(c => c.id === key)!,
                value
            )
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [key]: !isValid
            }))
            return newData
        })
    }


    const handleSubmitForm = async () => {
        try {
            const isValid = validateForm()

            if (!isValid) {
                toast.error("Please fill all required fields correctly.")
                return
            }

            toast.success("Form submitted successfully!")

            const jsonContent = JSON.stringify(formData)
            await submitForm(formUrl, jsonContent)

            setSubmitted(true)

        } catch (error) {
            toast.error("Something went wrong.")
            console.error("submit form error: ", error)
        }

    }

    if (submitted) {
        return (
            <div className="w-full h-full p-4 bg-background flex grow items-center justify-center">
                <div className="max-w-2xl flex flex-col gap-5 grow p-4 overflow-y-auto border rounded-md">
                    <h1 className='text-2xl font-semibold'>Form submitted</h1>
                    <p className='text-muted-foreground'>Thank you for submitting the form, you can now close this page now.</p>
                </div>


            </div>
        )
    }

    return (
        <div className="w-full h-full p-4 bg-background flex grow items-center justify-center">

            <div className="max-w-2xl flex flex-col gap-8 grow p-4 overflow-y-auto border rounded-md">
                {content.map((element) => {
                    const FormComponent = FormElements[element.type].formComponent
                    const isInvalid = formErrors[element.id]

                    return <div key={element.id} className={isInvalid ? 'border-red-500 border-2 rounded p-2' : ''}>

                        <FormComponent
                            elementInstance={element}
                            submitValue={submitValue}
                            isInvalid={isInvalid}
                            defaultValue={formData[element.id]}
                        />
                        {isInvalid && (
                            <p className="text-red-500 text-sm mt-1">
                                This field is required.
                            </p>
                        )}
                    </div>
                })}
                <Button
                    className='mt-6'
                    onClick={() => {
                        startTransition(handleSubmitForm)
                    }}
                    disabled={isPending}
                >
                    {isPending
                        ?
                        <LoaderCircle className="size-4 animate-spin" />
                        :
                        <span>Submit</span>
                    }
                </Button>
            </div>
        </div>
    )
}
