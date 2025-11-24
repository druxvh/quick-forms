"use client"

import Link from "next/link"
import Logo from "../Logo"

export default function Footer() {
    return (
        <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand + Description */}
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-left max-w-md">
                        Create and share forms in minutes — a simple, fast, and distraction-free form builder built for everyone.
                    </p>
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-border/50 pt-6 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} QForms. All rights reserved.</p>
                    <div className="flex gap-4 mt-3 md:mt-0">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
