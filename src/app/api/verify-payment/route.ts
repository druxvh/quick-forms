import { NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (razorpay_order_id: string, razorpay_payment_id: string) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const signature = crypto
        .createHmac("sha256", keySecret)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest("hex");

    return signature
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            //   planId,
            //   userId,
        } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: "Missing required params" }, { status: 400 });
        }

        const signature = generatedSignature(razorpay_order_id, razorpay_payment_id);

        if (signature !== razorpay_signature) {
            console.warn("Invalid razorpay signature", { signature, received: razorpay_signature });
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // TODO: update DB to set user plan -> pro, save payment id, etc.
        // e.g. await prisma.user.update({ where: { id: userId }, data: { plan: "pro", paymentId: razorpay_payment_id } });

        return NextResponse.json(
            {
                success: true,
                message: "Payment verified successfully",
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Razorpay verify-payment error:", err);
        return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 500 });
    }
}
