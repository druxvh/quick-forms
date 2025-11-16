import { getFormById } from "@/actions/form"
import FormBuilder from "@/components/FormBuilder"

export default async function BuilderPage({ params }: {
    params: {
        id: string
    }
}) {

    const { id } = await params
    const form = await getFormById(id)
    if (!form) throw new Error("Form not found")
    return <FormBuilder form={form} />
}
