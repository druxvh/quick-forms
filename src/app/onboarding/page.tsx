import OnboardingForm from "@/components/OnboardingForm";
import { currentUser } from "@clerk/nextjs/server";

export default async function OnboardingPage() {
    const user = await currentUser();

    return (
        <div className="min-h-screen outline flex items-center justify-center px-4">
            <OnboardingForm
                fullName={user?.fullName || ""}
                email={user?.emailAddresses?.[0]?.emailAddress || ""}
                imageUrl={user?.imageUrl || ""}
            />
        </div>
    );
}
