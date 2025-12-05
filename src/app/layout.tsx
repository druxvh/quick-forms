import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
    title: {
        default: 'QForms | Drag & Drop Form Builder',
        template: '%s | QForms',
    },
    description:
        'Build beautiful, powerful forms in seconds. QForms is a fully drag-and-drop form builder with support for 10+ field types, designed for easy form building, and seamless data collection.',

    keywords: [
        'form builder',
        'drag and drop forms',
        'online form creator',
        'data collection tool',
        'Next.js form app',
        'QForms',
    ],

    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
    },

    openGraph: {
        title: 'QForms: The Intuitive Drag & Drop Form Builder',
        description:
            'Create advanced, 10+ field forms with zero code. Simply drag, drop, and deploy.',
        url: 'https://www.tryqforms.vercel.app',
        siteName: 'QForms',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'QForms Drag and Drop Form Builder Interface',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'QForms | Fast, Powerful D&D Form Builder',
        description:
            '10+ fields, no code, just drag and drop. Start building better forms today.',
        creator: '@druxvh',
        images: ['/og-image.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className="antialiased">
                    <NextTopLoader color="#EF6461" showSpinner={false} />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster />
                    </ThemeProvider>
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}
