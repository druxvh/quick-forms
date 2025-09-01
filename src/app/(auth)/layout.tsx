import Logo from "@/components/Logo"
import ThemeModeToggle from "@/components/ThemeModeToggle"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="h-16 px-4 py-2 outline flex justify-between items-center">
                <Logo />
                <div className="flex gap-5">
                    <ThemeModeToggle />
                </div>
            </nav>
            <main className="flex h-full w-full items-center justify-center grow">{children}</main>
        </div>
    )
}

