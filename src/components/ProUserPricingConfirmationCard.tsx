'use client';

import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { PRICING_PLANS } from '@/lib/shared/pricing';

export default function ProUserPricingConfirmationCard() {
    return (
        <section className="from-background to-muted/20 flex h-full w-full flex-col items-center bg-gradient-to-b py-12 sm:py-20">
            <div className="w-full max-w-5xl space-y-6 px-4 text-center">
                <h1 className="text-3xl font-bold sm:text-4xl">You&apos;re a Pro User</h1>
                <p className="text-muted-foreground mx-auto max-w-xl">
                    You&apos;re a pro user. Enjoy all the premium features!
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="mt-10 w-full max-w-3xl px-4">
                <Card
                    className={cn(
                        'hover:border-primary/40 relative flex flex-col justify-between border shadow-sm transition-all duration-200 hover:shadow-md',
                        'rounded-2xl',
                        'border-primary/30 from-primary/5 to-background bg-gradient-to-b',
                    )}
                >
                    <CardHeader className="space-y-2">
                        <CardTitle className="flex items-center justify-between text-lg font-semibold">
                            <span>Pro</span>

                            <span
                                className={cn(
                                    'rounded-full px-2 py-0.5 text-[10px]',
                                    'text-primary bg-yellow-400/80',
                                )}
                            >
                                Pro
                            </span>
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                            For professionals and small businesses who need more forms and
                            insights.
                        </p>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-2 py-2">
                        {/* <div className="text-3xl font-bold">
                            ₹{PRICING_PLANS[1].priceINR}
                            <span className="text-sm font-normal text-muted-foreground"> /month</span>
                        </div> */}

                        <ul className="mt-4 space-y-2 text-left text-sm">
                            {PRICING_PLANS[1].features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <Check className="size-4 shrink-0 text-green-600" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>

                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={'/dashboard'}>Go to Dashboard</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
}
