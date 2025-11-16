import { ensureUserInDb } from "@/lib/ensure-user";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const dbUser = await ensureUserInDb();
        if (!dbUser) return new Response("Unauthorized", { status: 401 });

        const { userId } = await auth()

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { amount, currency = "INR", receipt, notes } = body;

        if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // Convert to smallest currency unit (paise / cents)
        const multiplier = 100; // works for INR, USD, SGD (both use 2 decimal places)
        const amountSmallest = Math.round(amount * multiplier);

        const options = {
            amount: amountSmallest,
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
            notes: notes || {},
        };

        const order = await razorpay.orders.create(options);

        await prisma.payment.create({
            data: {
                userId,
                plan: "PRO",
                amount: amountSmallest,
                currency,
                razorpayOrderId: order.id,
                status: "PENDING"
            }
        })

        return NextResponse.json(
            {
                success: true,
                message: "Order created successfully",
                data: order
            }, { status: 200 });

    } catch (err) {
        console.error("Razorpay create-order error:", err);
        return NextResponse.json(
            {
                success: false,
                message: "Paymnet Failed due to Server Error",
            },
            { status: 500 });
    }
}
