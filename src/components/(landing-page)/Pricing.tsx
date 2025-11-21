"use client"

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Plan, PRICING_PLANS } from "@/app/pricing/page";
import { useEffect, useState } from "react";
import { detectRegion } from "@/lib/region";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Check, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import PaymentButton from "../PaymentButton";

export default function Pricing() {
    const [region, setRegion] = useState<"IN" | "US" | "SG" | "global">("global");
    const { isSignedIn } = useUser()

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

    return (
        <section id="pricing" className="py-24 bg-secondary/20 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        At a pricing you can&apos;t resist
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                        Simple, transparent pricing that scales with you.
                    </p>
                    <Badge variant="outline" className="text-sm border-border/50">
                        More features coming soon
                    </Badge>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full"
                >
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
                                            <Button asChild className="w-full">
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
                </motion.div>
            </div>
        </section>
    );
};
