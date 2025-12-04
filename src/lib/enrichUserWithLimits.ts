import { CurrentUser } from '@/actions/auth';
import { PLAN_CONFIG, PlanTier } from './planConfig';

export type PrismaUserSubset = {
    id: string;
    clerkId: string | null;
    email: string | null;
    name: string | null;
    plan: PlanTier;
    imageUrl: string | null;
    formLimit: number | null;
    hasOnboarded: boolean;
};

export const enrichUserWithPlanAndFormLimit = (
    user: Required<PrismaUserSubset>,
): CurrentUser => {
    const plan = (user.plan || 'FREE') as PlanTier;
    const cfg = PLAN_CONFIG[plan];
    let effectiveFormLimit: number;

    if (user.formLimit === -1) {
        effectiveFormLimit = -1;
    } else if (typeof user.formLimit === 'number') {
        effectiveFormLimit = user.formLimit;
    } else {
        effectiveFormLimit = cfg.formLimit;
    }

    return {
        id: user.id,
        clerkId: user.clerkId!,
        email: user.email!,
        name: user.name,
        imageUrl: user.imageUrl,
        plan,
        isPro: cfg.isPro,
        formLimit: effectiveFormLimit,
        hasOnboarded: user.hasOnboarded,
    };
};
