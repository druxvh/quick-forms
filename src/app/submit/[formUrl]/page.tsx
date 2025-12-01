import { getFormContentByUrl } from '@/actions/form';
import { FormElementInstance } from '@/types/form';
import FormSubmitComponent from '@/components/FormSubmitComponent';

export default async function SubmitPage({
    params,
}: {
    params: {
        formUrl: string;
    };
}) {
    const { formUrl } = await params;
    const form = await getFormContentByUrl(formUrl);
    if (!form) throw new Error('Form not found');

    const content = (form.content as FormElementInstance[]) ?? [];

    // const content = (Array.isArray(form.content)
    //     ? form.content
    //     : typeof form.content === "string"
    //         ? JSON.parse(form.content || "[]")
    //         : []) as FormElementInstance[]

    return <FormSubmitComponent formUrl={formUrl} content={content} />;
}
