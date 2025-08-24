import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import DesignerContextProvider from "@/context/DesignerContext";
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
  title: "Quick Forms - Make Forms in Minutes!",
  description: "Quick Forms is an online form making software being an alternative to Google Forms with better UI, Drag-n-Drop customizable form components!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <NextTopLoader color="#EF6461" showSpinner={false} />
          <DesignerContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider >
  );
}
