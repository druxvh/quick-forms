"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Check, Mail } from "lucide-react";
import { detectRegion } from "@/lib/region";
import PaymentButton from "@/components/PaymentButton";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

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

export default function PricingPage() {
    const [region, setRegion] = useState<"IN" | "US" | "SG" | "global">("global");
    const { isSignedIn } = useUser()

    // demo bool
    const bool = true

    useEffect(() => {
        setRegion(detectRegion());
    }, []);

    const isSupported = region === "IN" || region === "US" || region === "SG";

    const priceForPlan = (plan: Plan) => {
        if (plan.id === "custom") return "Custom";
        if (region === "IN") return `₹${plan.priceINR ?? 0}`;
        if (region === "US" || region === "SG") return `$${plan.priceUSD ?? 0}`;
        return "—";
    };

    const currencyForRegion = (r: typeof region) => {
        if (r === "IN") return "INR";
        // treat SG as USD for now; change to "SGD" if you enable it later
        if (r === "US" || r === "SG") return "USD";
        return "INR";
    };

    const paymentDisable = !isSignedIn

    // if is pro 
    if (!bool) {
        return (
            <section className="w-full h-full py-12 sm:py-20 bg-gradient-to-b from-background to-muted/20 flex flex-col items-center">
                <div className="max-w-5xl w-full px-4 text-center space-y-6">
                    <h1 className="text-3xl sm:text-4xl font-bold">You&apos;re a Pro User</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        You&apos;re a pro user. Enjoy all the premium features!
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="mt-10 max-w-3xl w-full px-4">

                    <Card
                        className={cn(
                            "relative flex flex-col justify-between border shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40",
                            "rounded-2xl",
                            "border-primary/30 bg-gradient-to-b from-primary/5 to-background"
                        )}
                    >
                        <CardHeader className="space-y-2">
                            <CardTitle className="flex items-center justify-between text-lg font-semibold">
                                <span>Pro</span>

                                <span
                                    className={cn(
                                        "px-2 py-0.5 text-[10px] rounded-full",
                                        "bg-yellow-400/80 text-primary"
                                    )}
                                >
                                    Pro
                                </span>

                            </CardTitle>
                            <p className="text-sm text-muted-foreground">For professionals and small businesses who need more forms and insights.</p>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col gap-2 py-2">
                            <div className="text-3xl font-bold">
                                ₹49
                                <span className="text-sm font-normal text-muted-foreground"> /month</span>
                            </div>

                            <ul className="text-sm mt-4 space-y-2 text-left">
                                {PRICING_PLANS[1].features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="size-4 text-green-600 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={"/dashboard"}>
                                    Go to Dashboard
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        );
    }
    return (
        <section className="w-full h-full py-12 sm:py-20 bg-gradient-to-b from-background to-muted/20 flex flex-col items-center">
            <div className="max-w-5xl w-full px-4 text-center space-y-6">
                <h1 className="text-3xl sm:text-4xl font-bold">Simple, transparent pricing</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Choose the plan that fits your needs. Start free, upgrade anytime.
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full px-4">
                {PRICING_PLANS.map((plan) => {
                    const isPro = plan.id === "pro";
                    const isCustom = plan.id === "custom";

                    // price display and numeric major-unit amount for payment button
                    const displayPrice = priceForPlan(plan);
                    const currency = currencyForRegion(region);

                    // numeric amount (major unit) to send to PaymentButton (server converts to paise/cents)
                    const numericAmount =
                        region === "IN" ? Number(plan.priceINR ?? 0) : Number(plan.priceUSD ?? plan.priceINR ?? 0);

                    return (
                        <Card
                            key={plan.id}
                            className={cn(
                                "relative flex flex-col justify-between border shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40",
                                "rounded-2xl",
                                plan.highlight
                                    ? "border-primary/30 bg-gradient-to-b from-primary/5 to-background"
                                    : "bg-card"
                            )}
                        >
                            <CardHeader className="space-y-2">
                                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                                    <span>{plan.name}</span>
                                    {plan.badge && (
                                        <span
                                            className={cn(
                                                "px-2 py-0.5 text-[10px] rounded-full",
                                                isPro ? "bg-yellow-400/80 text-primary" : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            {plan.badge}
                                        </span>
                                    )}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col gap-2 py-2">
                                <div className="text-3xl font-bold">
                                    {displayPrice}
                                    {!isCustom && <span className="text-sm font-normal text-muted-foreground"> /month</span>}
                                </div>

                                <ul className="text-sm mt-4 space-y-2 text-left">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <Check className="size-4 text-green-600 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                {isSupported ? (
                                    // Free plan: start free -> signup or create first form
                                    plan.id === "free" ? (
                                        <Button asChild className="w-full" onClick={() => console.log("clicked")}>
                                            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                                                {plan.cta}
                                            </Link>
                                        </Button>
                                    ) : isPro ? (
                                        // Paid plan: show payment button with per-plan amount & currency
                                        <PaymentButton planId={plan.id} amount={numericAmount} currency={currency as "INR" | "USD"} isDisabled={paymentDisable} />
                                    ) : (
                                        // Custom plan CTA
                                        <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => {
                                            // mailto or open contact modal
                                            window.location.href = "mailto:heydruavh+qforms@gmail.com?subject=Custom%20Pricing%20Inquiry";
                                        }}>
                                            <Mail className="size-4" />
                                            Contact Us
                                        </Button>
                                    )
                                ) : (
                                    <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => {
                                        // mailto or open contact modal
                                        window.location.href = "mailto:heydruavh+qforms@gmail.com?subject=Request%20Access%20to%20QForms";
                                    }}>
                                        <Mail className="size-4" />
                                        Mail us for access
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            <p className="mt-10 text-xs text-muted-foreground text-center">
                * Prices are dynamically shown in your local currency. Pro users get early access & direct support.
            </p>
        </section>
    );
}
