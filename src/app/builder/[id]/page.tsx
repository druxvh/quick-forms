import FormBuilder from "@/components/FormBuilder"
import { getFormById } from "../../../../actions/form"

export default async function BuilderPage({ params }: {
    params: {
        id: string
    }
}) {

    const { id } = await params
    const form = await getFormById(Number(id))
    if (!form) throw new Error("Form not found")
    return <FormBuilder form={form} />
}
