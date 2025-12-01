'use client';

import { FormElements } from '@/types/form';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Separator } from './ui/separator';
import { useDesignerActions, useDesignerSelectedElement } from '@/hooks/use-designer';

export default function FormPropertiesSidebar() {
    const { setSelectedElement } = useDesignerActions();
    const selectedElement = useDesignerSelectedElement();
    if (!selectedElement) return null;

    const FormProperties = FormElements[selectedElement?.type].propertiesComponent;
    return (
        <div className="flex flex-col gap-2 pb-20 sm:w-48 sm:pb-0 md:w-60 lg:w-72">
            <div className="flex items-center justify-between">
                <p className="text-foreground/70 text-sm">Element Properties</p>
                <Button
                    // size={"icon"}
                    variant={'ghost'}
                    onClick={() => setSelectedElement(null)}
                >
                    <X />
                </Button>
            </div>
            <Separator className="mb-4" />
            <FormProperties elementInstance={selectedElement} />
        </div>
    );
}
