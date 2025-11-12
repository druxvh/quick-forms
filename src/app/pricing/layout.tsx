import Navbar from "@/components/Navbar"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen min-h-screen min-w-full bg-background max-h-screen">
            <Navbar userButton={true} />
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}

