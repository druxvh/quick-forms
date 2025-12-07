/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Script from 'next/script';
import { toast } from 'sonner';

declare global {
    interface Window {
        Razorpay?: any;
    }
}

export default function PaymentButton({
    planId,
    isDisabled,
    amount, // major units: 49 or 1.99
    currency = 'INR', // "INR" | "USD"
}: {
    planId: string;
    isDisabled?: boolean;
    amount: number;
    currency?: 'INR' | 'USD' | 'SGD';
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // optional: ensure env key exists
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            console.warn('NEXT_PUBLIC_RAZORPAY_KEY_ID is not set');
        }
    }, []);

    async function handlePayment() {
        if (!scriptLoaded) {
            toast.error('Payment SDK still loading — try again in a moment.', {
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border':
                        'light-dark(var(--color-amber-600), var(--color-amber-400))',
                } as React.CSSProperties,
            });
            return;
        }

        setIsLoading(true);

        try {
            // 1) create order on server (we send major amount; server converts)
            const createRes = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    currency,
                    notes: { planId },
                }),
            });

            if (!createRes.ok) {
                const json = await createRes.json().catch(() => null);
                console.error('create-order failed', json);
                throw new Error(json?.error || 'Order creation failed');
            }

            const { data } = await createRes.json();

            if (!data || !data.id) throw new Error('Invalid order from server');

            // 2) open Razorpay checkout using server-provided order data
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: 'QForms Pro',
                description: `Upgrade to Pro - ${planId}`,
                order_id: data.id,
                handler: async function (response: any) {
                    // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
                    try {
                        const verifyRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                ...response,
                                // planId,
                                // optionally include userId from your auth/session
                            }),
                        });

                        if (!verifyRes.ok) {
                            const body = await verifyRes.json().catch(() => null);
                            console.error('verify failed', body);
                            toast.error('Payment verification failed. Contact support.', {
                                style: {
                                    '--normal-bg':
                                        'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                                    '--normal-text': 'var(--destructive)',
                                    '--normal-border': 'var(--destructive)',
                                } as React.CSSProperties,
                            });
                            return;
                        }

                        toast.success('Payment completed — Pro unlocked! 🎉', {
                            style: {
                                '--normal-bg':
                                    'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                                '--normal-text':
                                    'light-dark(var(--color-green-600), var(--color-green-400))',
                                '--normal-border':
                                    'light-dark(var(--color-green-600), var(--color-green-400))',
                            } as React.CSSProperties,
                        });
                        // Optionally refresh user session / redirect / refetch user data
                    } catch (err) {
                        console.error('verify handler error', err);
                        toast.error('Verification error. Contact support.', {
                            style: {
                                '--normal-bg':
                                    'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                                '--normal-text': 'var(--destructive)',
                                '--normal-border': 'var(--destructive)',
                            } as React.CSSProperties,
                        });
                    }
                },
                prefill: {
                    name: 'DM', // optionally add from user session
                    email: 'Dm@fmail.com',
                    contact: '9419155555',
                },
                notes: { planId },
            };

            if (!window.Razorpay) {
                throw new Error('Razorpay SDK not available on window');
            }

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err: any) {
            console.error('Payment failed:', err);
            toast.error(err?.message || 'Payment failed', {
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)',
                } as React.CSSProperties,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => setScriptLoaded(true)}
                onError={() => {
                    console.error('Razorpay script failed to load');
                    setScriptLoaded(false);
                }}
            />
            <Button
                disabled={isLoading || isDisabled}
                onClick={handlePayment}
                className="w-full cursor-pointer"
            >
                {isLoading ? 'Processing...' : 'Upgrade Now'}
            </Button>
        </>
    );
}
