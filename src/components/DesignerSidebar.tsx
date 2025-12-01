'use client';

import FormElementsSidebar from './FormElementsSidebar';
import FormPropertiesSidebar from './FormPropertiesSidebar';
import { useDesignerSelectedElement } from '@/hooks/use-designer';

export default function DesignerSidebar() {
    const selectedElement = useDesignerSelectedElement();
    return (
        <aside className="border-border bg-background flex h-fit flex-grow flex-col gap-2 p-2 sm:h-full sm:min-w-fit sm:border-l-1 sm:p-4">
            {selectedElement ? <FormPropertiesSidebar /> : <FormElementsSidebar />}
        </aside>
    );
}
