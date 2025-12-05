import { getFormByIdAction } from '@/actions/form';
import FormBuilder from '@/components/builder/FormBuilder';
import { loadUser } from '@/data/users';
import { redirect } from 'next/navigation';

export default async function BuilderPage({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const user = await loadUser();
    if (!user.hasOnboarded) redirect('/onboarding');

    const { id } = await params;
    const form = await getFormByIdAction(id);

    if (!form) throw new Error('Form not found');

    return <FormBuilder form={form} />;
}
