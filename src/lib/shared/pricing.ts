export type Plan = {
    id: "free" | "pro" | "custom";
    name: string;
    description: string;
    priceINR?: number;
    priceUSD?: number;
    features: string[];
    formLimit: number | "unlimited";
    support: "none" | "priority" | "email";
    badge?: string;
    cta: string;
    highlight?: boolean;
};

export const PRICING_PLANS: Plan[] = [
    {
        id: "free",
        name: "Free",
        description: "Perfect for individuals trying out the form builder.",
        formLimit: 3,
        priceINR: 0,
        priceUSD: 0,
        features: [
            "Access to all field elements",
            "Up to 3 active forms",
            "Unlimited submissions",
            "Dashboard and analytics access",
        ],
        support: "none",
        cta: "Start for Free",
        badge: "Starter",
    },
    {
        id: "pro",
        name: "Pro",
        description: "For professionals and small businesses who need more forms and insights.",
        formLimit: 10,
        priceINR: 49,
        priceUSD: 1.99,
        features: [
            "All Free Plan features",
            "Up to 10 active forms",
            "Priority analytics dashboard",
            "Pro badge on profile",
            "Email support access",
            "Early access to new features",
        ],
        support: "email",
        cta: "Upgrade to Pro",
        badge: "Pro",
        highlight: true,
    },
    {
        id: "custom",
        name: "Custom",
        description: "Need more than 10 forms or custom enterprise setup?",
        formLimit: "unlimited",
        features: [
            "All Pro Plan features",
            "Unlimited active forms",
            "Dedicated support channel",
            "Custom analytics reports",
            "Personal onboarding assistance",
        ],
        support: "priority",
        cta: "Contact Us",
        badge: "Enterprise",
    },
];