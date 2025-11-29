export type PlanTier = 'FREE' | 'PRO' | 'CUSTOM'

export const PLAN_CONFIG: Record<
    PlanTier,
    { isPro: boolean, formLimit: number | "unlimited" }
> = {
    FREE: { isPro: false, formLimit: 5 },
    PRO: { isPro: true, formLimit: 20 },
    CUSTOM: { isPro: true, formLimit: "unlimited" }
}