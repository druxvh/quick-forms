import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
    title: 'QForms - Make Forms in Minutes!',
    description:
        'QForms is an online form making software being an alternative to Google Forms with better UI, Drag-n-Drop customizable form components!',
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
