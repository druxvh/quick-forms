import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

const generatedSignature = (razorpay_order_id: string, razorpay_payment_id: string) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const signature = crypto
        .createHmac('sha256', keySecret)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    return signature;
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Clerk Unauthorized' }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!dbUser) return new Response('DB Unauthorized', { status: 401 });

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { error: 'Missing required params' },
                { status: 400 },
            );
        }

        const payment = await prisma.payment.findUnique({
            where: { razorpayOrderId: razorpay_order_id },
        });

        if (!payment) {
            console.warn('No payment record found for order', razorpay_order_id);
            return new NextResponse('Order not found', { status: 404 });
        }

        // Optional: verify this payment belongs to the current user
        if (payment.userId !== dbUser.id) {
            return new NextResponse('Unauthorized order', { status: 403 });
        }

        const signature = generatedSignature(razorpay_order_id, razorpay_payment_id);

        if (signature !== razorpay_signature) {
            // Mark payment failed
            await prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: 'FAILED',
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                },
            });

            return new NextResponse('Invalid signature', { status: 400 });
        }

        const now = new Date();
        const endsAt = new Date(now);
        endsAt.setMonth(endsAt.getMonth() + 1); // 1 month pro plan

        await prisma.$transaction([
            prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: 'SUCCESS',
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    verifiedAt: now,
                },
            }),

            prisma.subscription.create({
                data: {
                    userId: dbUser.id,
                    plan: payment.plan,
                    startsAt: now,
                    endsAt,
                    active: true,
                },
            }),

            prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    plan: payment.plan,
                    planStartedAt: now,
                    planEndsAt: endsAt,
                    formLimit: payment.plan === 'PRO' ? 10 : null,
                },
            }),
        ]);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Razorpay verify-payment error:', err);
        return NextResponse.json(
            { success: false, message: 'Payment verification failed' },
            { status: 500 },
        );
    }
}
