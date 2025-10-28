// import Logo from "@/components/Logo"
import Navbar from "@/components/Navbar"
// import ThemeModeToggle from "@/components/ThemeModeToggle"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen min-h-screen min-w-full bg-background max-h-screen">
            <Navbar userButton={false} />
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}

