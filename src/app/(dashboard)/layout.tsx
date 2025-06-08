import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex outline flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav></nav>
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}

