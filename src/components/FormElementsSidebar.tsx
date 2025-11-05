"use client"

import { SidebarBtnElement } from './SidebarBtnElement'
import { FormElements } from "@/types/form"
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export default function FormElementsSidebar() {
  return (
    <div className="flex flex-col gap-2 w-full sm:w-48 md:w-60 lg:w-72 ">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Elements</p>
        <Button
          // size={"icon"}
          variant={"ghost"}
        >
        </Button>
      </div>
      <Separator className='sm:mb-4' />
      <div className="h-full flex sm:grid grid-cols-2 gap-3 place-items-center overflow-x-auto sm:overflow-visible scroll-smooth py-8 sm:py-0">
        {Object.values(FormElements).map((el, idx) => (
          <SidebarBtnElement key={idx} formElement={el} />
        ))}
      </div>
    </div>
  )
}
