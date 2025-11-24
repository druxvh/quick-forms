import { upsertUserFromClerk } from '@/actions/user'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {

    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET as string
    if (!signingSecret) {
        console.error('CLERK_WEBHOOK_SIGNING_SECRET is not set')
        return new Response('Webhook signing secret not configured', { status: 500 })
    }

    try {
        const evt = await verifyWebhook(req, {
            signingSecret
        })

        const eventType = evt.type

        if (eventType === 'user.created' || eventType === 'user.updated') {
            const clerkUser = evt.data

            await upsertUserFromClerk(clerkUser)
            return new Response('User upserted', { status: 200 })
        }

        return new Response('Webhook received (idc)', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}