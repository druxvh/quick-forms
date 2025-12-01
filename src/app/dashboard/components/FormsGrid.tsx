import { getForms } from '@/actions/form';
import { FormCard } from '@/components/FormCard';

export async function FormsGrid({ userId }: { userId: string }) {
    const forms = await getForms(userId);

    return forms.map((form) => <FormCard key={form.id} form={form} />);
}
