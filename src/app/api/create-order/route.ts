import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
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
