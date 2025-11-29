import Navbar from "@/components/Navbar"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <Navbar />
            <main className="flex h-full w-full items-center justify-center grow">{children}</main>
        </div>
    )
}

