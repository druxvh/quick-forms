"use client"

import { SidebarBtnElement } from './SidebarBtnElement'
import { FormElements } from './FormElements'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export default function FormElementsSidebar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Elements</p>
        <Button
          // size={"icon"}
          variant={"ghost"}
        >
        </Button>
      </div>
      <Separator className='mb-4'/>
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  )
}
