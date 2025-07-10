import { LoaderCircle } from "lucide-react"

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="size-10 animate-spin" />
        </div>
    )
}
