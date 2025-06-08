import Logo from "@/components/Logo"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import { UserButton } from "@clerk/nextjs"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="h-16 px-4 py-2 outline flex justify-between items-center">
                <Logo />
                <div className="flex gap-5">
                    <ThemeSwitcher />
                    <UserButton />
                </div>
            </nav>
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}

