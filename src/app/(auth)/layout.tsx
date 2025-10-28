// import Logo from "@/components/Logo"
import Navbar from "@/components/Navbar"
// import ThemeModeToggle from "@/components/ThemeModeToggle"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <Navbar userButton={false} />
            <main className="flex h-full w-full items-center justify-center grow">{children}</main>
        </div>
    )
}

