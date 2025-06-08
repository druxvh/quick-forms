"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false)

    // to avoid rehydration errors
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return (
        <Tabs defaultValue={theme}>
            <TabsList>
                <TabsTrigger value="light" onClick={() => setTheme("light")}>
                    <SunIcon className="size-4" />
                </TabsTrigger>
                <TabsTrigger value="system" onClick={() => setTheme("system")}>
                    <MonitorIcon className="size-4" />
                </TabsTrigger>
                <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
                    <MoonIcon className="size-4" />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
