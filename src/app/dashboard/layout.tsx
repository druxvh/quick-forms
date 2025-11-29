import Navbar from "@/components/Navbar"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <Navbar />
            <main className="flex mx-auto w-full max-w-7xl grow">{children}</main>
        </div>
    )
}

