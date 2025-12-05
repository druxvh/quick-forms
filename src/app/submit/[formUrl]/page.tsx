import { getFormContentByUrlAction } from '@/actions/form';
import FormSubmitComponent from '@/components/submission/FormSubmitComponent';
import { FormElementInstance } from '@/types/form';

export default async function SubmitPage({
    params,
}: {
    params: {
        formUrl: string;
    };
}) {
    const { formUrl } = await params;
    const form = await getFormContentByUrlAction(formUrl);
    if (!form) throw new Error('Form not found');

    const content = (form.content as FormElementInstance[]) ?? [];

    return <FormSubmitComponent formUrl={formUrl} content={content} />;
}
