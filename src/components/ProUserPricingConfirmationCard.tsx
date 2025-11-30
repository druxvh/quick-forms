"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { PRICING_PLANS } from "@/lib/shared/pricing"

export default function ProUserPricingConfirmationCard() {
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
                        {/* <div className="text-3xl font-bold">
                            ₹{PRICING_PLANS[1].priceINR}
                            <span className="text-sm font-normal text-muted-foreground"> /month</span>
                        </div> */}

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
    )
}
