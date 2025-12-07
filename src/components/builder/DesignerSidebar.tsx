'use client';

import FormElementsSidebar from './FormElementsSidebar';
import FormPropertiesSidebar from './FormPropertiesSidebar';
import { useDesignerSelectedElement } from '@/hooks/use-designer';

export default function DesignerSidebar() {
    const selectedElement = useDesignerSelectedElement();
    return (
        <aside className="bg-background border-border flex h-fit grow flex-col gap-2 sm:h-full sm:max-h-[calc(100vh-140px)] sm:min-h-0 sm:min-w-fit sm:border-l">
            <div className="flex h-full flex-col overflow-x-hidden overflow-y-auto scroll-smooth p-2 sm:p-4">
                {selectedElement ? <FormPropertiesSidebar /> : <FormElementsSidebar />}
            </div>
        </aside>
    );
}
