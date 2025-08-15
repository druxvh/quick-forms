"use client"

import { FormElements } from "./FormElements"
import { SidebarBtnElement } from "./SidebarBtnElement"

export default function DesignerSidebar() {
    return (
        <aside className='w-md max-w-md flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
            Elements
            <SidebarBtnElement formElement={FormElements.TextField} />
        </aside>
    )
}
