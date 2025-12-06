'use client';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function DesignerComponent() {
    return (
        <div className="flex w-full flex-col gap-2">
            <Label className="text-muted-foreground">Separator field</Label>
            <Separator />
        </div>
    );
}
