import OnboardingForm from '@/components/OnboardingForm';
import { loadUser } from '@/data/users';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
    const user = await loadUser();
    if (user.hasOnboarded) redirect('/dashboard');

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <OnboardingForm
                clerkId={user.clerkId}
                fullName={user.name || ''}
                email={user.email || ''}
                imageUrl={user.imageUrl || ''}
            />
        </div>
    );
}
