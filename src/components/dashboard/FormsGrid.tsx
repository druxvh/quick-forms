import { getFormsAction } from '@/actions/form';
import { FormCard } from '@/components/dashboard/FormCard';

export async function FormsGrid() {
    const forms = await getFormsAction();

    return forms.map((form) => <FormCard key={form.id} form={form} />);
}
