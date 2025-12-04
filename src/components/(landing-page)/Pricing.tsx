'use client';

import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import { detectRegion } from '@/lib/region';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { Check, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import PaymentButton from '../PaymentButton';
import { Plan, PRICING_PLANS } from '@/lib/pricing';

export default function Pricing() {
    const [region, setRegion] = useState<'IN' | 'US' | 'global'>('global');
    const { isSignedIn } = useUser();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRegion(detectRegion());
    }, []);

    const isSupported = region === 'IN' || region === 'US';

    const priceForPlan = (plan: Plan) => {
        if (plan.id === 'custom') return 'Custom';
        if (region === 'IN') return `₹${plan.priceINR ?? 0}`;
        if (region === 'US') return `$${plan.priceUSD ?? 0}`;
        return '—';
    };

    const currencyForRegion = (r: typeof region) => {
        if (r === 'IN') return 'INR';
        if (r === 'US') return 'USD';
        return 'INR';
    };

    const paymentDisable = !isSignedIn;

    return (
        <section id="pricing" className="bg-secondary/20 border-border/50 border-t py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        At a pricing you can&apos;t resist
                    </h2>
                    <p className="text-muted-foreground mx-auto mb-4 max-w-2xl text-xl">
                        Simple, transparent pricing that scales with you.
                    </p>
                    <Badge variant="outline" className="border-border/50 text-sm">
                        More features coming soon
                    </Badge>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mx-auto mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
                >
                    {PRICING_PLANS.map((plan) => {
                        const isPro = plan.id === 'pro';
                        const isCustom = plan.id === 'custom';

                        // price display and numeric major-unit amount for payment button
                        const displayPrice = priceForPlan(plan);
                        const currency = currencyForRegion(region);

                        // numeric amount (major unit) to send to PaymentButton (server converts to paise/cents)
                        const numericAmount =
                            region === 'IN'
                                ? Number(plan.priceINR ?? 0)
                                : Number(plan.priceUSD ?? plan.priceINR ?? 0);

                        return (
                            <Card
                                key={plan.id}
                                className={cn(
                                    'hover:border-primary/40 relative flex flex-col justify-between border shadow-sm transition-all duration-200 hover:shadow-md',
                                    'rounded-2xl',
                                    plan.highlight
                                        ? 'border-primary/30 from-primary/5 to-background bg-gradient-to-b'
                                        : 'bg-card',
                                )}
                            >
                                <CardHeader className="space-y-2">
                                    <CardTitle className="flex items-center justify-between text-lg font-semibold">
                                        <span>{plan.name}</span>
                                        {plan.badge && (
                                            <span
                                                className={cn(
                                                    'rounded-full px-2 py-0.5 text-[10px]',
                                                    isPro
                                                        ? 'text-primary bg-yellow-400/80'
                                                        : 'bg-muted text-muted-foreground',
                                                )}
                                            >
                                                {plan.badge}
                                            </span>
                                        )}
                                    </CardTitle>
                                    <p className="text-muted-foreground text-sm">
                                        {plan.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="flex flex-1 flex-col gap-2 py-2">
                                    <div className="text-3xl font-bold">
                                        {displayPrice}
                                        {!isCustom && (
                                            <span className="text-muted-foreground text-sm font-normal">
                                                {' '}
                                                /month
                                            </span>
                                        )}
                                    </div>

                                    <ul className="mt-4 space-y-2 text-left text-sm">
                                        {plan.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center gap-2"
                                            >
                                                <Check className="size-4 shrink-0 text-green-600" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    {isSupported ? (
                                        // Free plan: start free -> signup or create first form
                                        plan.id === 'free' ? (
                                            <Button asChild className="w-full">
                                                <Link
                                                    href={
                                                        isSignedIn
                                                            ? '/dashboard'
                                                            : '/sign-up'
                                                    }
                                                >
                                                    {plan.cta}
                                                </Link>
                                            </Button>
                                        ) : isPro ? (
                                            // Paid plan: show payment button with per-plan amount & currency
                                            <PaymentButton
                                                planId={plan.id}
                                                amount={numericAmount}
                                                currency={currency as 'INR' | 'USD'}
                                                isDisabled={paymentDisable}
                                            />
                                        ) : (
                                            // Custom plan CTA
                                            <Button
                                                variant="outline"
                                                className="flex w-full items-center gap-2"
                                                onClick={() => {
                                                    // mailto or open contact modal
                                                    window.location.href =
                                                        'mailto:heydruavh+qforms@gmail.com?subject=Custom%20Pricing%20Inquiry';
                                                }}
                                            >
                                                <Mail className="size-4" />
                                                Contact Us
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            variant="outline"
                                            className="flex w-full items-center gap-2"
                                            onClick={() => {
                                                // mailto or open contact modal
                                                window.location.href =
                                                    'mailto:heydruavh+qforms@gmail.com?subject=Request%20Access%20to%20QForms';
                                            }}
                                        >
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
}
