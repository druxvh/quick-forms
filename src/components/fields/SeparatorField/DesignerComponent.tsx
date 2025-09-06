'use client'

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function DesignerComponent() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label className="text-muted-foreground">
                Separator field
            </Label>
            <Separator />
        </div>
    )
}


