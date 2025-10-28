// import Logo from "@/components/Logo"
import Navbar from "@/components/Navbar"
// import ThemeModeToggle from "@/components/ThemeModeToggle"
// import { UserButton } from "@clerk/nextjs"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <Navbar />
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}

