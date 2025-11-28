'use client'

export function detectRegion() {
    if (typeof window === "undefined") return "global"

    const region = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (region.includes("Calcutta")) return "IN"
    if (region.includes("America") || region.includes("US")) return "US"
    return "global"
}
